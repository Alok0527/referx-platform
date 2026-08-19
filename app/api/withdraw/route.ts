import { prisma } from '@/lib/db'
import { getCurrentUser } from '@/lib/auth'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const user = await getCurrentUser()

    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const { amount, accountNumber, accountHolder, bankName } = await request.json()

    // Validation
    if (!amount || amount < 100) {
      return NextResponse.json(
        { error: 'Invalid amount' },
        { status: 400 }
      )
    }

    // Get user and reward config
    const userData = await prisma.user.findUnique({
      where: { id: user.userId }
    })

    const rewardConfig = await prisma.rewardConfig.findFirst()
    const minimumWithdrawal = rewardConfig?.minimumWithdrawal || 500

    if (!userData || userData.totalRewards < minimumWithdrawal) {
      return NextResponse.json(
        { error: `Minimum withdrawal amount is ₹${minimumWithdrawal}` },
        { status: 400 }
      )
    }

    if (userData.totalRewards < amount) {
      return NextResponse.json(
        { error: 'Insufficient balance' },
        { status: 400 }
      )
    }

    // Create withdrawal transaction
    const transaction = await prisma.transaction.create({
      data: {
        userId: user.userId,
        type: 'withdrawal',
        amount: amount,
        description: `Withdrawal to ${accountHolder} - ${bankName} (${accountNumber})`,
        status: 'pending'
      }
    })

    // Update user balance (deduct from available)
    await prisma.user.update({
      where: { id: user.userId },
      data: {
        totalRewards: { decrement: amount }
      }
    })

    return NextResponse.json({
      success: true,
      message: 'Withdrawal request submitted',
      transaction: {
        id: transaction.id,
        amount: transaction.amount,
        status: transaction.status,
        createdAt: transaction.createdAt
      }
    })
  } catch (error) {
    console.error('Withdrawal error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
