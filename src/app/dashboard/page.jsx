'use client'

import { useSession, signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import Image from 'next/image'
import { LogOut, User, Code, DollarSign, TrendingUp, Settings } from 'lucide-react'
import { handleOAuthSignIn } from '@/lib/auth-oauth'
import { toast } from 'react-toastify'

/**
 * Dashboard page component with OAuth integration
 * @returns {React.ReactElement} Dashboard page
 */
export default function DashboardPage() {
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status === 'loading') return // Still loading

    if (!session) {
      router.push('/auth/signin')
      return
    }
  }, [session, status, router])

  /**
   * Handle user sign out
   * @returns {Promise<void>}
   */
  const handleSignOut = async () => {
    try {
      await signOut({ callbackUrl: '/' })
    } catch (error) {
      console.error('Sign out error:', error)
    }
  }

  /**
   * Get provider-specific styling
   * @param {string} provider - OAuth provider
   * @returns {Object} Provider styling
   */
  const getProviderStyling = (provider) => {
    switch (provider) {
      case 'google':
        return { bg: 'bg-red-100', text: 'text-red-800', border: 'border-red-200' }
      case 'discord':
        return { bg: 'bg-indigo-100', text: 'text-indigo-800', border: 'border-indigo-200' }
      case 'github':
        return { bg: 'bg-gray-100', text: 'text-gray-800', border: 'border-gray-200' }
      default:
        return { bg: 'bg-purple-100', text: 'text-purple-800', border: 'border-purple-200' }
    }
  }

  const handleSocialLogin = async (provider) => {
    const result = await handleOAuthSignIn(provider)
    if (!result.success) {
      toast.error(result.error)
    }
  }

  if (status === 'loading') {
    return (
      <main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-300">Loading your dashboard...</p>
        </div>
      </main>
    )
  }

  if (!session) {
    return null // Will redirect in useEffect
  }

  const providerStyling = getProviderStyling('oauth')

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <header className="rounded-lg bg-white shadow-sm px-6 py-8 mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center space-x-4">
              {session.user.image && (
                <div className="relative">
                  <Image
                    src={session.user.image}
                    alt={session.user.name || 'User avatar'}
                    width={64}
                    height={64}
                    className="rounded-full border-2 border-gray-200"
                  />
                  <div className={`absolute -bottom-1 -right-1 px-2 py-1 rounded-full text-xs font-medium ${providerStyling.bg} ${providerStyling.text} ${providerStyling.border} border`}>
                    OAuth
                  </div>
                </div>
              )}
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
                  Welcome back, {session.user.name || 'Developer'}!
                </h1>
                <p className="text-gray-600 mt-1">{session.user.email}</p>
                <p className="text-sm text-gray-500 mt-1">
                  Signed in via OAuth provider
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <button
                onClick={() => router.push('/settings')}
                className="inline-flex items-center gap-2 rounded-lg bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-colors"
              >
                <Settings className="w-4 h-4" />
                Settings
              </button>
              <button
                onClick={handleSignOut}
                className="inline-flex items-center gap-2 rounded-lg bg-purple-600 px-4 py-2 text-sm font-medium text-white hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-colors"
              >
                <LogOut className="w-4 h-4" />
                Sign Out
              </button>
            </div>
          </div>
        </header>
        
        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {[
            { icon: Code, label: 'Projects', value: '12', change: '+3 this month', color: 'text-blue-600' },
            { icon: DollarSign, label: 'Revenue', value: '$2,450', change: '+12% this month', color: 'text-green-600' },
            { icon: TrendingUp, label: 'Downloads', value: '1,247', change: '+8% this month', color: 'text-purple-600' },
            { icon: User, label: 'Customers', value: '89', change: '+5 this week', color: 'text-orange-600' }
          ].map((stat, index) => (
            <div key={index} className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  <p className="text-xs text-gray-500 mt-1">{stat.change}</p>
                </div>
                <stat.icon className={`w-8 h-8 ${stat.color}`} />
              </div>
            </div>
          ))}
        </div>
        
        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Activity */}
          <div className="lg:col-span-2 bg-white rounded-lg shadow-sm p-6 border border-gray-100">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Your Developer Journey
            </h2>
            <div className="space-y-4">
              <div className="bg-gradient-to-r from-purple-50 to-purple-100 rounded-lg p-4 border border-purple-200">
                <h3 className="font-medium text-purple-900 mb-2">🚀 Start Building Your Income</h3>
                <p className="text-purple-700 text-sm mb-3">
                  Turn your coding skills into passive income streams. Upload your first project and start earning!
                </p>
                <button className="inline-flex items-center gap-2 bg-purple-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-purple-700 transition-colors">
                  <Code className="w-4 h-4" />
                  Upload Project
                </button>
              </div>
              
              <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg p-4 border border-blue-200">
                <h3 className="font-medium text-blue-900 mb-2">📊 Analytics Dashboard</h3>
                <p className="text-blue-700 text-sm mb-3">
                  Track your project performance, revenue, and customer engagement.
                </p>
                <button className="inline-flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
                  <TrendingUp className="w-4 h-4" />
                  View Analytics
                </button>
              </div>
            </div>
          </div>
          
          {/* Quick Actions */}
          <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Quick Actions
            </h2>
            <div className="space-y-3">
              {[
                { title: 'Upload New Project', desc: 'Share your latest code', action: 'upload' },
                { title: 'View Earnings', desc: 'Check your revenue', action: 'earnings' },
                { title: 'Customer Support', desc: 'Help your buyers', action: 'support' },
                { title: 'Profile Settings', desc: 'Update your info', action: 'profile' }
              ].map((item, index) => (
                <button
                  key={index}
                  className="w-full text-left p-3 rounded-lg border border-gray-200 hover:border-purple-300 hover:bg-purple-50 transition-all group"
                >
                  <h4 className="font-medium text-gray-900 group-hover:text-purple-900">
                    {item.title}
                  </h4>
                  <p className="text-sm text-gray-600 group-hover:text-purple-700">
                    {item.desc}
                  </p>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
