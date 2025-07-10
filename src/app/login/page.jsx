"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Mail, Eye, EyeOff, ArrowRight, AlertCircle } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useForm } from "@/hooks"
import { ROUTES } from "@/constants/index.mjs"

/**
 * Login page  component
 * @returns {React.ReactElement} The login page
 */
export default function LoginPage() {
    const [showPassword, setShowPassword] = useState(false)
    const [error, setError] = useState("")
    const router = useRouter()

    /**
     * Handle login form submission
     * @param {Object} formData - Form data
     * @param {string} formData.email - User email
     * @param {string} formData.password - User password
     */
    const handleLogin = async (formData) => {
        try {
            setError("")
            
            const response = await fetch('/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            })

            const result = await response.json()

            if (result.success) {
                router.push(ROUTES.protected.dashboard)
            } else {
                setError(result.error || 'Login failed')
            }
        } catch (error) {
            console.error('Login error:', error)
            setError('An unexpected error occurred')
        }
    }

    const { values, handleChange, handleSubmit, isSubmitting } = useForm(
        { email: '', password: '' },
        handleLogin
    )

    return (
        <div className="min-h-screen bg-black text-white flex items-center justify-center px-4 py-16">
            {/* Animated background */}
            <div className="absolute inset-0 z-0">
                <motion.div
                    animate={{ 
                        scale: [1, 1.1, 1],
                        opacity: [0.3, 0.5, 0.3]
                    }}
                    transition={{ 
                        duration: 8,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                    className="absolute top-1/4 left-1/6 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl"
                />
                <motion.div
                    animate={{ 
                        scale: [1.1, 1, 1.1],
                        opacity: [0.2, 0.4, 0.2]
                    }}
                    transition={{ 
                        duration: 10,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                    className="absolute bottom-1/4 right-1/6 w-80 h-80 bg-purple-500/15 rounded-full blur-3xl"
                />
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="relative z-10 w-full max-w-md"
            >
                <div className="bg-gradient-to-br from-gray-900/80 to-gray-800/60 backdrop-blur-xl rounded-2xl p-8 border border-purple-500/20 shadow-2xl shadow-purple-500/10">
                    
                    {/* Header */}
                    <div className="text-center mb-8">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.2 }}
                            className="w-12 h-12 bg-purple-600 rounded-xl flex items-center justify-center mx-auto mb-4"
                        >
                            <Mail className="w-6 h-6 text-white" />
                        </motion.div>

                        <h1 className="text-2xl font-bold text-white mb-2">Welcome Back</h1>
                        <p className="text-gray-400">
                            Sign in to your account to continue earning
                        </p>
                    </div>

                    {/* Error Message */}
                    {error && (
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="mb-6 p-4 bg-red-900/30 border border-red-500/30 rounded-lg flex items-center space-x-3"
                        >
                            <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
                            <span className="text-red-300 text-sm">{error}</span>
                        </motion.div>
                    )}

                    {/* Login Form */}
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                                Email
                            </label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                                <input
                                    type="email"
                                    name="email"
                                    value={values.email}
                                    onChange={handleChange}
                                    className="w-full pl-10 pr-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-colors"
                                    placeholder="your@email.com"
                                    required
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                                Password
                            </label>
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    value={values.password}
                                    onChange={handleChange}
                                    className="w-full pl-4 pr-12 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-colors"
                                    placeholder="Enter your password"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-300"
                                >
                                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                </button>
                            </div>
                        </div>

                        <motion.button
                            type="submit"
                            disabled={isSubmitting}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="w-full bg-gradient-to-r from-purple-600 to-purple-700 text-white py-3 rounded-lg font-semibold hover:from-purple-700 hover:to-purple-800 transition-all duration-300 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isSubmitting ? (
                                <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                            ) : (
                                <>
                                    Sign In
                                    <ArrowRight className="w-5 h-5 ml-2" />
                                </>
                            )}
                        </motion.button>
                    </form>

                    {/* Footer */}
                    <div className="mt-8 text-center">
                        <p className="text-gray-400 text-sm">
                            Don&apos;t have an account?{" "}
                            <Link href="/signup" className="text-purple-400 hover:text-purple-300 transition-colors font-medium">
                                Sign up
                            </Link>
                        </p>
                    </div>
                </div>
            </motion.div>
        </div>
    )
}
