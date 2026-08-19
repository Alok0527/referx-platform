import { prisma } from '@/lib/db'
import { getCurrentUser } from '@/lib/auth'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const user = await getCurrentUser()

    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    // Get user details
    const userData = await prisma.user.findUnique({
      where: { id: user.userId },
      select: {
        id: true,
        email: true,
        name: true,
        username: true,
        profileImage: true,
        referralCode: true,
        totalRewards: true,
        totalReferrals: true,
        createdAt: true
      }
    })

    if (!userData) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      )
    }

    // Get referrals
    const referrals = await prisma.referral.findMany({
      where: { referrerId: user.userId },
      include: {
        referred: {
          select: {
            id: true,
            email: true,
            name: true,
            createdAt: true
          }
        }
      },
      orderBy: { createdAt: 'desc' }
    })

    // Get recent transactions
    const transactions = await prisma.transaction.findMany({
      where: { userId: user.userId },
      orderBy: { createdAt: 'desc' },
      take: 10
    })

    // Calculate stats
    const totalEarnings = transactions
      .filter(t => t.type === 'earning' || t.type === 'bonus')
      .reduce((sum, t) => sum + t.amount, 0)

    const pendingWithdrawals = transactions
      .filter(t => t.type === 'withdrawal' && t.status === 'pending')
      .reduce((sum, t) => sum + t.amount, 0)

    const rewardConfig = await prisma.rewardConfig.findFirst()

    return NextResponse.json({
      user: userData,
      stats: {
        totalReferrals: userData.totalReferrals,
        totalEarnings: totalEarnings,
        availableBalance: userData.totalRewards,
        pendingWithdrawals: pendingWithdrawals,
        minimumWithdrawal: rewardConfig?.minimumWithdrawal || 500
      },
      referrals: referrals,
      transactions: transactions
    })
  } catch (error) {
    console.error('Dashboard error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
