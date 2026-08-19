import { prisma } from '@/lib/db'
import { hashPassword, createToken, generateReferralCode } from '@/lib/auth'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { email, password, name, username, referralCode } = await request.json()

    // Validation
    if (!email || !password || !name || !username) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Check if user exists
    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [
          { email },
          { username }
        ]
      }
    })

    if (existingUser) {
      return NextResponse.json(
        { error: 'Email or username already exists' },
        { status: 400 }
      )
    }

    // Hash password
    const hashedPassword = await hashPassword(password)

    // Create user
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
        username,
        referralCode: generateReferralCode()
      }
    })

    // Handle referral
    if (referralCode) {
      const referrer = await prisma.user.findUnique({
        where: { referralCode }
      })

      if (referrer) {
        // Create referral record
        await prisma.referral.create({
          data: {
            referrerId: referrer.id,
            referredId: user.id,
            status: 'completed',
            rewardAmount: 100,
            rewardStatus: 'approved'
          }
        })

        // Update referrer's reward
        await prisma.user.update({
          where: { id: referrer.id },
          data: {
            totalRewards: { increment: 100 },
            totalReferrals: { increment: 1 }
          }
        })

        // Create transaction for referrer
        await prisma.transaction.create({
          data: {
            userId: referrer.id,
            type: 'earning',
            amount: 100,
            description: `Referral bonus from ${user.email}`,
            status: 'completed'
          }
        })

        // Add signup bonus to referred user
        await prisma.user.update({
          where: { id: user.id },
          data: {
            totalRewards: { increment: 50 }
          }
        })

        await prisma.transaction.create({
          data: {
            userId: user.id,
            type: 'bonus',
            amount: 50,
            description: 'Welcome bonus for signing up via referral',
            status: 'completed'
          }
        })
      }
    }

    // Create token
    const token = createToken(user.id, user.email)

    // Set cookie
    const response = NextResponse.json({
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        username: user.username,
        referralCode: user.referralCode,
        totalRewards: user.totalRewards
      }
    }, { status: 201 })

    response.cookies.set('auth-token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 30 * 24 * 60 * 60 // 30 days
    })

    return response
  } catch (error) {
    console.error('Signup error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
