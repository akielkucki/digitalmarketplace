"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { User, LogOut, DollarSign, TrendingUp, Package, Settings } from "lucide-react"
import { useRouter } from "next/navigation"
import { ROUTES } from "@/constants/index.mjs"

/**
 * Dashboard page component for authenticated users
 * @returns {React.ReactElement} The dashboard page
 */
export default function DashboardPage() {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState("")
    const router = useRouter()

    /**
     * Fetch current user data
     */
    const fetchUser = async () => {
        try {
            const response = await fetch('/api/auth/me')
            const result = await response.json()

            if (result.success) {
                setUser(result.user)
            } else {
                setError(result.error)
                if (response.status === 401) {
                    router.push(ROUTES.public.login)
                }
            }
        } catch (error) {
            console.error('Failed to fetch user:', error)
            setError('Failed to load user data')
        } finally {
            setLoading(false)
        }
    }

    /**
     * Handle user logout
     */
    const handleLogout = async () => {
        try {
            const response = await fetch('/api/auth/logout', {
                method: 'POST'
            })

            if (response.ok) {
                router.push('/')
            }
        } catch (error) {
            console.error('Logout error:', error)
        }
    }

    useEffect(() => {
        fetchUser()
    }, [])

    if (loading) {
        return (
            <div className="min-h-screen bg-black text-white flex items-center justify-center">
                <div className="w-8 h-8 border-2 border-purple-500/20 border-t-purple-500 rounded-full animate-spin" />
            </div>
        )
    }

    if (error && !user) {
        return (
            <div className="min-h-screen bg-black text-white flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-2xl font-bold mb-4">Error</h1>
                    <p className="text-gray-400">{error}</p>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-black text-white">
            {/* Header */}
            <header className="border-b border-gray-800 bg-gray-900/50 backdrop-blur-xl">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center py-4">
                        <div className="flex items-center space-x-4">
                            <div className="w-10 h-10 bg-purple-600 rounded-lg flex items-center justify-center">
                                <Package className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <h1 className="text-xl font-bold">DevMarket</h1>
                                <p className="text-sm text-gray-400">Dashboard</p>
                            </div>
                        </div>

                        <div className="flex items-center space-x-4">
                            <div className="flex items-center space-x-3">
                                <div className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center">
                                    <User className="w-4 h-4" />
                                </div>
                                <div className="hidden sm:block">
                                    <p className="text-sm font-medium">{user?.name || user?.email}</p>
                                    <p className="text-xs text-gray-400 capitalize">{user?.role}</p>
                                </div>
                            </div>
                            
                            <button
                                onClick={handleLogout}
                                className="p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-colors"
                                title="Logout"
                            >
                                <LogOut className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Welcome Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="mb-8"
                >
                    <h2 className="text-3xl font-bold mb-2">
                        Welcome back, {user?.name?.split(' ')[0] || 'Developer'}! 👋
                    </h2>
                    <p className="text-gray-400">
                        Ready to monetize your code and build passive income streams?
                    </p>
                </motion.div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.1 }}
                        className="bg-gradient-to-br from-gray-900/80 to-gray-800/60 backdrop-blur-xl rounded-xl p-6 border border-purple-500/20"
                    >
                        <div className="flex items-center justify-between mb-4">
                            <div className="w-12 h-12 bg-green-600/20 rounded-lg flex items-center justify-center">
                                <DollarSign className="w-6 h-6 text-green-400" />
                            </div>
                            <span className="text-sm text-gray-400">This Month</span>
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-1">$0.00</h3>
                        <p className="text-gray-400 text-sm">Total Earnings</p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="bg-gradient-to-br from-gray-900/80 to-gray-800/60 backdrop-blur-xl rounded-xl p-6 border border-purple-500/20"
                    >
                        <div className="flex items-center justify-between mb-4">
                            <div className="w-12 h-12 bg-blue-600/20 rounded-lg flex items-center justify-center">
                                <Package className="w-6 h-6 text-blue-400" />
                            </div>
                            <span className="text-sm text-gray-400">Active</span>
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-1">0</h3>
                        <p className="text-gray-400 text-sm">Projects Listed</p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                        className="bg-gradient-to-br from-gray-900/80 to-gray-800/60 backdrop-blur-xl rounded-xl p-6 border border-purple-500/20"
                    >
                        <div className="flex items-center justify-between mb-4">
                            <div className="w-12 h-12 bg-purple-600/20 rounded-lg flex items-center justify-center">
                                <TrendingUp className="w-6 h-6 text-purple-400" />
                            </div>
                            <span className="text-sm text-gray-400">Total</span>
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-1">0</h3>
                        <p className="text-gray-400 text-sm">Downloads</p>
                    </motion.div>
                </div>

                {/* Quick Actions */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="bg-gradient-to-br from-gray-900/80 to-gray-800/60 backdrop-blur-xl rounded-xl p-6 border border-purple-500/20"
                >
                    <h3 className="text-xl font-bold mb-6">Quick Actions</h3>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        <button className="p-4 bg-purple-600/10 hover:bg-purple-600/20 border border-purple-500/20 rounded-lg transition-colors group">
                            <Package className="w-8 h-8 text-purple-400 mb-3 group-hover:scale-110 transition-transform" />
                            <h4 className="font-semibold text-white mb-1">List Project</h4>
                            <p className="text-xs text-gray-400">Upload and sell your code</p>
                        </button>

                        <button className="p-4 bg-green-600/10 hover:bg-green-600/20 border border-green-500/20 rounded-lg transition-colors group">
                            <DollarSign className="w-8 h-8 text-green-400 mb-3 group-hover:scale-110 transition-transform" />
                            <h4 className="font-semibold text-white mb-1">View Earnings</h4>
                            <p className="text-xs text-gray-400">Track your income</p>
                        </button>

                        <button className="p-4 bg-blue-600/10 hover:bg-blue-600/20 border border-blue-500/20 rounded-lg transition-colors group">
                            <TrendingUp className="w-8 h-8 text-blue-400 mb-3 group-hover:scale-110 transition-transform" />
                            <h4 className="font-semibold text-white mb-1">Analytics</h4>
                            <p className="text-xs text-gray-400">See performance data</p>
                        </button>

                        <button className="p-4 bg-gray-600/10 hover:bg-gray-600/20 border border-gray-500/20 rounded-lg transition-colors group">
                            <Settings className="w-8 h-8 text-gray-400 mb-3 group-hover:scale-110 transition-transform" />
                            <h4 className="font-semibold text-white mb-1">Settings</h4>
                            <p className="text-xs text-gray-400">Manage your account</p>
                        </button>
                    </div>
                </motion.div>

                {/* Getting Started */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                    className="mt-8 bg-gradient-to-r from-purple-900/50 to-purple-800/30 rounded-xl p-6 border border-purple-500/30"
                >
                    <h3 className="text-xl font-bold mb-4">🚀 Getting Started</h3>
                    <p className="text-purple-200 mb-4">
                        Ready to start earning? Here&apos;s how to get your first project listed:
                    </p>
                    <div className="space-y-2">
                        <div className="flex items-center space-x-3">
                            <div className="w-6 h-6 bg-purple-600 rounded-full flex items-center justify-center text-xs font-bold">1</div>
                            <span className="text-purple-200">Prepare your code project with documentation</span>
                        </div>
                        <div className="flex items-center space-x-3">
                            <div className="w-6 h-6 bg-purple-600 rounded-full flex items-center justify-center text-xs font-bold">2</div>
                            <span className="text-purple-200">Set a competitive price for your work</span>
                        </div>
                        <div className="flex items-center space-x-3">
                            <div className="w-6 h-6 bg-purple-600 rounded-full flex items-center justify-center text-xs font-bold">3</div>
                            <span className="text-purple-200">Upload and start earning passive income!</span>
                        </div>
                    </div>
                </motion.div>
            </main>
        </div>
    )
}
