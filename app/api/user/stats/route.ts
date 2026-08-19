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

    // Get user data
    const userData = await prisma.user.findUnique({
      where: { id: user.userId },
      select: {
        id: true,
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

    // Get successful referrals
    const successfulReferrals = await prisma.referral.count({
      where: {
        referrerId: user.userId,
        status: 'completed'
      }
    })

    // Get pending referrals
    const pendingReferrals = await prisma.referral.count({
      where: {
        referrerId: user.userId,
        status: 'pending'
      }
    })

    // Get earnings
    const earnings = await prisma.transaction.aggregate({
      where: {
        userId: user.userId,
        type: { in: ['earning', 'bonus'] },
        status: 'completed'
      },
      _sum: {
        amount: true
      }
    })

    // Get total withdrawals
    const withdrawals = await prisma.transaction.aggregate({
      where: {
        userId: user.userId,
        type: 'withdrawal',
        status: 'completed'
      },
      _sum: {
        amount: true
      }
    })

    return NextResponse.json({
      stats: {
        totalReferrals: userData.totalReferrals,
        successfulReferrals: successfulReferrals,
        pendingReferrals: pendingReferrals,
        totalEarnings: earnings._sum.amount || 0,
        totalWithdrawals: withdrawals._sum.amount || 0,
        availableBalance: userData.totalRewards,
        memberSince: userData.createdAt
      }
    })
  } catch (error) {
    console.error('Stats error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
