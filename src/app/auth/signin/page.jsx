'use client'

import { useEffect, useState } from 'react'
import { getProviders, useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { handleOAuthSignIn } from '@/lib/auth-oauth'

/**
 * OAuth provider configuration for display
 * @typedef {Object} ProviderConfig
 * @property {string} name - Display name
 * @property {string} icon - Icon path
 * @property {string} bgColor - Background color classes
 * @property {string} hoverColor - Hover color classes
 * @property {string} textColor - Text color classes
 */

/** @type {Record<string, ProviderConfig>} */
const providerConfig = {
  google: {
    name: 'Google',
    icon: '/google-icon.svg',
    bgColor: 'bg-white',
    hoverColor: 'hover:bg-gray-50',
    textColor: 'text-gray-700'
  },
  discord: {
    name: 'Discord',
    icon: '/discord-icon.svg',
    bgColor: 'bg-indigo-600',
    hoverColor: 'hover:bg-indigo-700',
    textColor: 'text-white'
  },
  github: {
    name: 'GitHub',
    icon: '/github-icon.svg',
    bgColor: 'bg-gray-900',
    hoverColor: 'hover:bg-gray-800',
    textColor: 'text-white'
  }
}

/**
 * Custom OAuth sign in page
 * @returns {React.ReactElement} Sign in page
 */
export default function SignIn() {
  const [providers, setProviders] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [loadingProvider, setLoadingProvider] = useState(null)
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    // Redirect if already signed in
    if (session) {
      router.push('/dashboard')
      return
    }

    /**
     * Fetch available auth providers
     * @returns {Promise<void>}
     */
    async function fetchProviders() {
      try {
        const res = await getProviders()
        setProviders(res)
      } catch (error) {
        console.error('Failed to fetch providers:', error)
      }
    }
    
    fetchProviders()
  }, [session, router])

  /**
   * Handle OAuth provider sign in
   * @param {string} providerId - Provider ID
   * @returns {Promise<void>}
   */
  const handleProviderSignIn = async (providerId) => {
    setIsLoading(true)
    setLoadingProvider(providerId)
    
    try {
      const result = await handleOAuthSignIn(providerId, '/dashboard')
      
      if (!result.success) {
        console.error('Sign in failed:', result.error)
        // You could add a toast notification here
        return
      }
      
      // Success - NextAuth will handle the redirect
    } catch (error) {
      console.error('Unexpected sign in error:', error)
    } finally {
      setIsLoading(false)
      setLoadingProvider(null)
    }
  }

  if (status === 'loading') {
    return (
      <main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-300">Loading...</p>
        </div>
      </main>
    )
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">
            Welcome Back
          </h1>
          <p className="text-gray-300">
            Sign in to access your developer dashboard
          </p>
        </div>
        
        <div className="bg-white/10 backdrop-blur-lg rounded-xl p-8 border border-white/20 shadow-2xl">
          <div className="space-y-4">
            {providers && Object.values(providers).map((provider) => {
              const config = providerConfig[provider.id] || {
                name: provider.name,
                icon: null,
                bgColor: 'bg-gray-600',
                hoverColor: 'hover:bg-gray-700',
                textColor: 'text-white'
              }
              
              const isProviderLoading = loadingProvider === provider.id
              
              return (
                <button
                  key={provider.name}
                  onClick={() => handleProviderSignIn(provider.id)}
                  disabled={isLoading}
                  className={`w-full flex items-center justify-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-all duration-200 ${config.bgColor} ${config.hoverColor} ${config.textColor} border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed`}
                >
                  {isProviderLoading ? (
                    <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
                  ) : (
                    config.icon && (
                      <Image
                        src={config.icon}
                        alt={`${config.name} icon`}
                        width={20}
                        height={20}
                        className="flex-shrink-0"
                      />
                    )
                  )}
                  {isProviderLoading ? 'Signing in...' : `Continue with ${config.name}`}
                </button>
              )
            })}
          </div>
          
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-300">
              By signing in, you agree to our{' '}
              <a href="/terms" className="text-purple-400 hover:text-purple-300 underline">
                Terms of Service
              </a>{' '}
              and{' '}
              <a href="/privacy" className="text-purple-400 hover:text-purple-300 underline">
                Privacy Policy
              </a>
            </p>
          </div>
        </div>
      </div>
    </main>
  )
}
