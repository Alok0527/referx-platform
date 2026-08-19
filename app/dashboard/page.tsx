'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Copy, LogOut, TrendingUp, Users, Gift, Wallet } from 'lucide-react'
import axios from 'axios'


export default function Dashboard() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState<any>(null)
  const [stats, setStats] = useState<any>(null)
  const [referrals, setReferrals] = useState<any[]>([])
  const [transactions, setTransactions] = useState<any[]>([])
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    fetchDashboardData()
  }, [])

  const fetchDashboardData = async () => {
    try {
      const response = await axios.get('/api/user/dashboard')
      setUser(response.data.user)
      setStats(response.data.stats)
      setReferrals(response.data.referrals)
      setTransactions(response.data.transactions)
    } catch (error) {
      router.push('/login')
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = () => {
    // Clear auth cookie and redirect to home
    document.cookie = 'auth-token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;'
    router.push('/')
  }

  const handleCopyReferralLink = () => {
    if (user?.referralCode) {
      const link = `${process.env.NEXT_PUBLIC_API_URL}/signup?ref=${user.referralCode}`
      navigator.clipboard.writeText(link)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center">
        <div className="text-2xl font-bold text-blue-600">Loading...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-6 py-6 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900">ReferX Dashboard</h1>
          <Button
            onClick={handleLogout}
            variant="outline"
            className="flex items-center gap-2"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </Button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-12">
        {/* Welcome Section */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Welcome back, {user?.name}!
              </h2>
              <p className="text-gray-600">
                Your unique referral code: <span className="font-mono font-bold text-blue-600">{user?.referralCode}</span>
              </p>
            </div>
            <Button
              onClick={handleCopyReferralLink}
              className="bg-blue-600 hover:bg-blue-700 flex items-center gap-2"
            >
              <Copy className="w-4 h-4" />
              {copied ? 'Copied!' : 'Copy Link'}
            </Button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          {/* Total Referrals */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm mb-1">Total Referrals</p>
                <p className="text-4xl font-bold text-gray-900">{stats?.totalReferrals || 0}</p>
              </div>
              <Users className="w-12 h-12 text-blue-600 opacity-20" />
            </div>
          </div>

          {/* Available Balance */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm mb-1">Available Balance</p>
                <p className="text-4xl font-bold text-gray-900">₹{stats?.availableBalance?.toLocaleString('en-IN') || 0}</p>
              </div>
              <Wallet className="w-12 h-12 text-green-600 opacity-20" />
            </div>
          </div>

          {/* Total Earnings */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm mb-1">Total Earnings</p>
                <p className="text-4xl font-bold text-gray-900">₹{stats?.totalEarnings?.toLocaleString('en-IN') || 0}</p>
              </div>
              <TrendingUp className="w-12 h-12 text-purple-600 opacity-20" />
            </div>
          </div>

          {/* Pending Withdrawals */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm mb-1">Pending Withdrawal</p>
                <p className="text-4xl font-bold text-gray-900">₹{stats?.pendingWithdrawals?.toLocaleString('en-IN') || 0}</p>
              </div>
              <Gift className="w-12 h-12 text-orange-600 opacity-20" />
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Recent Referrals */}
          <div className="md:col-span-2 bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Recent Referrals</h3>
            
            {referrals.length > 0 ? (
              <div className="space-y-4">
                {referrals.slice(0, 5).map((ref: any) => (
                  <div key={ref.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-semibold text-gray-900">{ref.referred.name}</p>
                        <p className="text-sm text-gray-600">{ref.referred.email}</p>
                        <p className="text-xs text-gray-500 mt-1">
                          Joined {new Date(ref.referred.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-bold text-green-600">
                          +₹{ref.rewardAmount}
                        </p>
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          ref.status === 'completed'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {ref.status}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <Users className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                <p className="text-gray-600">No referrals yet. Share your code to get started!</p>
              </div>
            )}
          </div>

          {/* Transaction History */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-6">Recent Transactions</h3>
            
            {transactions.length > 0 ? (
              <div className="space-y-3">
                {transactions.slice(0, 5).map((tx: any) => (
                  <div key={tx.id} className="border-b border-gray-100 pb-3 last:border-b-0">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-sm font-semibold text-gray-900 capitalize">{tx.type}</p>
                        <p className="text-xs text-gray-500">{tx.description}</p>
                      </div>
                      <p className={`font-bold ${
                        tx.type === 'earning' || tx.type === 'bonus'
                          ? 'text-green-600'
                          : 'text-red-600'
                      }`}>
                        {tx.type === 'earning' || tx.type === 'bonus' ? '+' : '-'}₹{tx.amount}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-600 text-center py-8">No transactions yet</p>
            )}
          </div>
        </div>

        {/* Withdrawal Section */}
        <div className="mt-8 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl shadow-lg p-8">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-2xl font-bold mb-2">Ready to Withdraw?</h3>
              <p className="opacity-90">
                Minimum withdrawal amount: ₹{stats?.minimumWithdrawal || 500}
              </p>
            </div>
            <Button
              disabled={stats?.availableBalance < stats?.minimumWithdrawal}
              className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-2"
            >
              Withdraw Now
            </Button>
          </div>
        </div>
      </main>
    </div>
  )
}
