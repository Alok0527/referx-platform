'use client'

import Link from "next/link";
import { ArrowRight, Gift, Users, TrendingUp, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50">
      {/* Navigation */}
      <nav className="flex justify-between items-center px-6 py-4 max-w-7xl mx-auto">
        <div className="text-2xl font-bold text-blue-600">ReferX</div>
        <div className="space-x-4">
          <Link href="/login" className="text-gray-700 hover:text-blue-600">
            Login
          </Link>
          <Link href="/signup">
            <Button className="bg-blue-600 hover:bg-blue-700">Sign Up</Button>
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-5xl font-bold text-gray-900 mb-6">
              Earn Money by Sharing
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Refer your friends to ReferX and earn rewards for every successful referral. 
              Start building your passive income today!
            </p>
            <div className="space-x-4">
              <Link href="/signup">
                <Button className="bg-blue-600 hover:bg-blue-700 px-8 py-6 text-lg">
                  Get Started <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Link href="/login">
                <Button variant="outline" className="px-8 py-6 text-lg">
                  Login to Dashboard
                </Button>
              </Link>
            </div>
          </div>
          <div className="bg-gradient-to-br from-blue-400 to-blue-600 rounded-3xl h-96 flex items-center justify-center text-white text-4xl font-bold">
            Earn While You Share
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-16">Why Choose ReferX?</h2>
          
          <div className="grid md:grid-cols-4 gap-8">
            {/* Feature 1 */}
            <div className="p-8 border border-gray-200 rounded-xl hover:shadow-lg transition">
              <Gift className="w-12 h-12 text-blue-600 mb-4" />
              <h3 className="text-xl font-bold mb-3">Instant Rewards</h3>
              <p className="text-gray-600">
                Get ₹100 for every friend who signs up using your referral link
              </p>
            </div>

            {/* Feature 2 */}
            <div className="p-8 border border-gray-200 rounded-xl hover:shadow-lg transition">
              <Users className="w-12 h-12 text-blue-600 mb-4" />
              <h3 className="text-xl font-bold mb-3">Unlimited Referrals</h3>
              <p className="text-gray-600">
                There's no limit to how many people you can refer and earn from
              </p>
            </div>

            {/* Feature 3 */}
            <div className="p-8 border border-gray-200 rounded-xl hover:shadow-lg transition">
              <TrendingUp className="w-12 h-12 text-blue-600 mb-4" />
              <h3 className="text-xl font-bold mb-3">Real-time Tracking</h3>
              <p className="text-gray-600">
                Monitor your referrals and earnings in real-time on your dashboard
              </p>
            </div>

            {/* Feature 4 */}
            <div className="p-8 border border-gray-200 rounded-xl hover:shadow-lg transition">
              <Shield className="w-12 h-12 text-blue-600 mb-4" />
              <h3 className="text-xl font-bold mb-3">Secure Payouts</h3>
              <p className="text-gray-600">
                Fast and secure withdrawal options with minimum threshold of ₹500
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-16">How It Works</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                1
              </div>
              <h3 className="text-xl font-bold mb-3">Create Account</h3>
              <p className="text-gray-600">
                Sign up and get your unique referral code
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                2
              </div>
              <h3 className="text-xl font-bold mb-3">Share Your Link</h3>
              <p className="text-gray-600">
                Copy and share your referral link with friends
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                3
              </div>
              <h3 className="text-xl font-bold mb-3">Earn Rewards</h3>
              <p className="text-gray-600">
                Get ₹100 for each successful referral
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 py-20 text-white">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Start Earning?</h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of people already making money with ReferX
          </p>
          <Link href="/signup">
            <Button className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-6 text-lg font-bold">
              Sign Up Now <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-8">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p>&copy; 2024 ReferX. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
