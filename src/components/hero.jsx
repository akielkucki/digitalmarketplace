"use client"

import { useState } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import {
    AlertCircle,
    ArrowRight,
    CheckCircle,
    Clock,
    Code,
    DollarSign,
    Eye,
    EyeOff,
    Mail,
    TrendingDown,
    Zap
} from "lucide-react"
import Image from "next/image"
import { SOCIAL_PROVIDERS, ROUTES } from "@/constants/index.mjs"

/**
 * @typedef {Object} PainPoint
 * @property {import('lucide-react').LucideIcon} icon - The icon component
 * @property {string} text - The pain point text
 * @property {string} color - The color class for the icon
 */

/**
 * @typedef {Object} SocialProvider
 * @property {string} name - The provider name
 * @property {string} bg - Background color class
 * @property {string} icon - Icon path
 * @property {string} [textColor] - Text color class
 */

/**
 * Hero component for the landing page
 * @returns {React.ReactElement} The hero section
 */
const Hero = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [showPassword, setShowPassword] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const { scrollY } = useScroll()
    const y1 = useTransform(scrollY, [0, 300], [0, -30])
    const y2 = useTransform(scrollY, [0, 300], [0, -60])

    /**
     * Handle form submission for signup
     * @param {React.FormEvent<HTMLFormElement>} e - The form event
     */
    const handleSignup = async (e) => {
        e.preventDefault()
        setIsLoading(true)

        try {
            const response = await fetch('/api/auth/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            })

            const result = await response.json()

            if (result.success) {
                window.location.href = ROUTES.protected.dashboard
            } else {
                alert(`Error: ${result.error}`)
            }
        } catch (error) {
            console.error('Signup error:', error)
            alert('An unexpected error occurred')
        } finally {
            setIsLoading(false)
        }
    }

    /**
     * Handle social login
     * @param {string} provider - The social provider name
     */
    const handleSocialLogin = (provider) => {
        alert(`Signing up with ${provider}...`)
    }

    return (
        <section className="relative min-h-screen overflow-hidden bg-black text-white">
            {/* Animated background */}
            <div className="absolute inset-0 z-0">
                <motion.div
                    style={{ y: y1 }}
                    className="absolute top-1/4 left-1/6 w-96 h-96 rounded-full blur-3xl bg-purple-600/20"
                />
                <motion.div
                    style={{ y: y2 }}
                    className="absolute bottom-1/4 right-1/6 w-80 h-80 rounded-full blur-3xl bg-purple-500/15"
                />

                {/* Grid pattern overlay */}
                <div className="absolute inset-0 opacity-5">
                    <div className="absolute inset-0" style={{
                        backgroundImage: `
              linear-gradient(rgba(124, 58, 237, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(124, 58, 237, 0.1) 1px, transparent 1px)
            `,
                        backgroundSize: '50px 50px'
                    }} />
                </div>
            </div>

            {/* Main content */}
            <main className="relative z-10 flex min-h-screen items-center px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
                <div className="mx-auto w-full max-w-7xl">
                    <div className="grid items-center gap-8 sm:gap-12 lg:gap-16 lg:grid-cols-2">

                        {/* Left side - Pain Point */}
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                        >
                            <header className="space-y-6 sm:space-y-8">
                                {/* Problem badge */}
                                <motion.div
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.2 }}
                                    className="inline-flex items-center rounded-full border border-red-500/30 px-4 py-2 text-sm font-medium bg-red-900/30 text-red-400"
                                >
                                    <AlertCircle className="w-4 h-4 mr-2" />
                                    The Developer Income Problem
                                </motion.div>

                                <motion.h1
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ duration: 0.8, delay: 0.3 }}
                                    className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight"
                                >
                                    {'Your Code Skills'.split(' ').map((word, index) => (
                                        <motion.span
                                            key={word}
                                            animate={{color: ["#707070", "#FFFFFF"]}}
                                            transition={{duration: 0.8, delay: 0.5*index}}
                                        >{word}{' '}</motion.span>
                                    ))}
                                    <br/>
                                    <motion.span
                                        animate={{color: ["#707070", "#FFFFFF"]}}
                                        transition={{duration: 0.8, delay: 1.3}}
                                    >Aren&apos;t Paying the <motion.span
                                        animate={{color: ["#707070","#FFFFFF"]}}
                                        transition={{ duration: 0.8, delay: 1.8 }}
                                    >Bills</motion.span></motion.span>
                                </motion.h1>

                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ duration: 0.8, delay: 0.4 }}
                                    className="space-y-4 sm:space-y-6"
                                >
                                    <p className="text-lg sm:text-xl text-gray-300 leading-relaxed">
                                        You&apos;re building amazing things, but your bank account doesn&apos;t reflect your talent.
                                        Sound familiar?
                                    </p>

                                    {/* Pain points list */}
                                    <div className="space-y-3 sm:space-y-4">
                                        {/** @type {PainPoint[]} */}
                                        {[
                                            { icon: TrendingDown, text: "Working for pennies on freelance platforms", color: "text-red-400" },
                                            { icon: Clock, text: "Trading time for money with no passive income", color: "text-orange-400" },
                                            { icon: DollarSign, text: "Watching others monetize while you struggle", color: "text-yellow-400" }
                                        ].map((pain, index) => (
                                            <motion.div
                                                key={index}
                                                initial={{ opacity: 0, x: -20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: 0.5 + index * 0.1 }}
                                                className="flex items-center space-x-3 group"
                                            >
                                                <pain.icon className={`w-5 h-5 ${pain.color} group-hover:scale-110 transition-transform`} />
                                                <span className="text-gray-300 group-hover:text-white transition-colors">
                                                    {pain.text}
                                                </span>
                                            </motion.div>
                                        ))}
                                    </div>
                                </motion.div>

                                {/* Solution teaser */}
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.8 }}
                                    className="bg-gradient-to-r from-purple-900/50 to-purple-800/30 rounded-xl p-6 border border-purple-500/30"
                                >
                                    <div className="flex items-start space-x-3">
                                        <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                                            <Zap className="w-4 h-4 text-white" />
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-white mb-2">
                                                What if you could turn every project into passive income?
                                            </h3>
                                            <p className="text-purple-200 text-sm">
                                                Join 50,000+ developers earning $500-$15k/month by selling their code once and earning forever.
                                            </p>
                                        </div>
                                    </div>
                                </motion.div>
                            </header>
                        </motion.div>

                        {/* Right side - Signup Form */}
                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="w-full max-w-md lg:justify-self-end"
                        >
                            {/* This div will be hidden on large screens since we have the floating form */}
                            <div className="rounded-2xl border border-purple-500/20 bg-gradient-to-br from-gray-900/80 to-gray-800/60 p-6 sm:p-8 shadow-2xl shadow-purple-500/10 backdrop-blur-xl lg:hidden">

                                {/* Form header */}
                                <div className="mb-6 sm:mb-8 text-center">
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ delay: 0.4 }}
                                        className="w-12 h-12 bg-purple-600 rounded-xl flex items-center justify-center mx-auto mb-4"
                                    >
                                        <Code className="w-6 h-6 text-white" />
                                    </motion.div>

                                    <h2 id="signup-form-title" className="mb-2 text-xl sm:text-2xl font-bold text-white">Start Earning Today</h2>
                                    <p className="text-sm sm:text-base text-gray-400">
                                        Create an account and discover how to monetize your code
                                    </p>
                                </div>

                                {/* Signup form */}
                                <form onSubmit={handleSignup} className="space-y-6" role="form" aria-labelledby="signup-form-title">
                                    <div>
                                        <label htmlFor="email-input" className="block text-sm font-medium text-gray-300 mb-2">
                                            Email
                                        </label>
                                        <div className="relative">
                                            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                                            <input
                                                id="email-input"
                                                type="email"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                className="w-full pl-10 pr-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-colors"
                                                placeholder="your@email.com"
                                                required
                                                aria-describedby="email-help"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label htmlFor="password-input" className="block text-sm font-medium text-gray-300 mb-2">
                                            Password
                                        </label>
                                        <div className="relative">
                                            <input
                                                id="password-input"
                                                type={showPassword ? "text" : "password"}
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                                className="w-full pl-4 pr-12 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-colors"
                                                placeholder="Create a password"
                                                required
                                                aria-describedby="password-help"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => setShowPassword(!showPassword)}
                                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-300"
                                                aria-label={showPassword ? "Hide password" : "Show password"}
                                            >
                                                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                            </button>
                                        </div>
                                    </div>

                                    <motion.button
                                        type="submit"
                                        disabled={isLoading}
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        className="w-full bg-gradient-to-r from-purple-600 to-purple-700 text-white py-3 rounded-lg font-semibold hover:from-purple-700 hover:to-purple-800 transition-all duration-300 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                                    >
                                        {isLoading ? (
                                            <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                                        ) : (
                                            <>
                                                Get Started Free
                                                <ArrowRight className="w-5 h-5 ml-2" />
                                            </>
                                        )}
                                    </motion.button>

                                    <div className="relative">
                                        <div className="absolute inset-0 flex items-center">
                                            <div className="w-full border-t border-gray-700"></div>
                                        </div>
                                        <div className="relative flex justify-center text-sm">
                                            <span className="px-2 bg-gray-900 text-gray-400">OR</span>
                                        </div>
                                    </div>                        {/* Social login buttons */}
                        <div className="grid grid-cols-3 gap-3">
                            {SOCIAL_PROVIDERS.map((provider) => (
                                            <motion.button
                                                key={provider.name}
                                                type="button"
                                                onClick={() => handleSocialLogin(provider.name)}
                                                whileHover={{ scale: 1.05 }}
                                                whileTap={{ scale: 0.95 }}
                                                className={`${provider.bg} ${provider.textColor || 'text-white'} py-2 px-4 rounded-lg font-medium transition-all duration-300 flex items-center justify-center cursor-pointer`}
                                            >
                                                <Image src={provider.icon} alt={provider.name + " Icon"} width={24} height={24} />
                                            </motion.button>
                                        ))}
                                    </div>

                                    <div className="text-center text-sm text-gray-400">
                                        By signing up you agree to our{" "}
                                        <a href="#" className="text-purple-400 hover:text-purple-300 transition-colors">
                                            terms of service
                                        </a>{" "}
                                        and{" "}
                                        <a href="#" className="text-purple-400 hover:text-purple-300 transition-colors">
                                            privacy policy
                                        </a>
                                    </div>
                                </form>

                                {/* Trust indicators */}
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.8 }}
                                    className="mt-8 pt-6 border-t border-gray-700"
                                >
                                    <div className="flex items-center justify-center space-x-6 text-xs text-gray-400">
                                        <div className="flex items-center space-x-1">
                                            <CheckCircle className="w-3 h-3 text-green-400" />
                                            <span>Free to start</span>
                                        </div>
                                        <div className="flex items-center space-x-1">
                                            <CheckCircle className="w-3 h-3 text-green-400" />
                                            <span>No monthly fees</span>
                                        </div>
                                        <div className="flex items-center space-x-1">
                                            <CheckCircle className="w-3 h-3 text-green-400" />
                                            <span>Instant payouts</span>
                                        </div>
                                    </div>
                                </motion.div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </main>

            {/* Floating Signup Form - Only visible on large screens */}
            <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="fixed top-1/2 right-4 xl:right-8 z-20 hidden w-full max-w-md -translate-y-1/2 transform lg:block"
            >
                <div className="rounded-2xl border border-purple-500/20 bg-gradient-to-br from-gray-900/90 to-gray-800/70 p-6 xl:p-8 shadow-2xl shadow-purple-500/10 backdrop-blur-xl">

                    {/* Form header */}
                    <div className="text-center mb-8">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.4 }}
                            className="w-12 h-12 bg-purple-600 rounded-xl flex items-center justify-center mx-auto mb-4"
                        >
                            <Code className="w-6 h-6 text-white" />
                        </motion.div>

                        <h2 className="mb-2 text-xl xl:text-2xl font-bold text-white">Start Earning Today</h2>
                        <p className="text-sm xl:text-base text-gray-400">
                            Create an account and discover how to monetize your code
                        </p>
                    </div>

                    {/* Signup form */}
                    <form onSubmit={handleSignup} className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                                Email
                            </label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
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
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full pl-4 pr-12 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-colors"
                                    placeholder="Create a password"
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
                            disabled={isLoading}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="w-full bg-gradient-to-r from-purple-600 to-purple-700 text-white py-3 rounded-lg font-semibold hover:from-purple-700 hover:to-purple-800 transition-all duration-300 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                        >
                            {isLoading ? (
                                <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                            ) : (
                                <>
                                    Get Started Free
                                    <ArrowRight className="w-5 h-5 ml-2" />
                                </>
                            )}
                        </motion.button>

                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-gray-700"></div>
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="px-2 bg-gray-900 text-gray-400">OR</span>
                            </div>
                        </div>

                        {/* Social login buttons */}
                        <div className="grid grid-cols-3 gap-3">
                            {SOCIAL_PROVIDERS.map((provider) => (
                                <motion.button
                                    key={provider.name}
                                    type="button"
                                    onClick={() => handleSocialLogin(provider.name)}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className={`${provider.bg} ${provider.textColor || 'text-white'} py-2 px-4 rounded-lg font-medium transition-all duration-300 flex items-center justify-center cursor-pointer`}
                                >
                                    <Image src={provider.icon} alt={provider.name + " Icon"} width={24} height={24} />
                                </motion.button>
                            ))}
                        </div>

                        <div className="text-center text-sm text-gray-400">
                            By signing up you agree to our{" "}
                            <a href="#" className="text-purple-400 hover:text-purple-300 transition-colors">
                                terms of service
                            </a>{" "}
                            and{" "}
                            <a href="#" className="text-purple-400 hover:text-purple-300 transition-colors">
                                privacy policy
                            </a>
                        </div>
                    </form>

                    {/* Trust indicators */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.8 }}
                        className="mt-8 pt-6 border-t border-gray-700"
                    >
                        <div className="flex items-center justify-center space-x-6 text-xs text-gray-400">
                            <div className="flex items-center space-x-1">
                                <CheckCircle className="w-3 h-3 text-green-400" />
                                <span>Free to start</span>
                            </div>
                            <div className="flex items-center space-x-1">
                                <CheckCircle className="w-3 h-3 text-green-400" />
                                <span>No monthly fees</span>
                            </div>
                            <div className="flex items-center space-x-1">
                                <CheckCircle className="w-3 h-3 text-green-400" />
                                <span>Instant payouts</span>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </motion.div>
        </section>
    )
}

export default Hero
