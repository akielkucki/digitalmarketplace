<script>
    import { onMount } from 'svelte'
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
        Zap,
        Github,
        Chrome,
        Apple
    } from 'lucide-svelte'


    // Reactive state
    let email = $state('')
    let password = $state('')
    let showPassword = $state(false)
    let isLoading = $state(false)
    let loadingProvider = $state(null)
    let scrollY = $state(0)

    // Computed values for parallax effect
    let y1 = $derived(scrollY * -0.1)
    let y2 = $derived(scrollY * -0.2)

    // Social providers with Lucide icons
    const SOCIAL_PROVIDERS = [
        {
            name: 'Google',
            bg: 'bg-white hover:bg-gray-100',
            icon: Chrome,
            textColor: 'text-gray-900'
        },
        {
            name: 'GitHub',
            bg: 'bg-gray-800 hover:bg-gray-700',
            icon: Github,
            textColor: 'text-white'
        },
        {
            name: 'Apple',
            bg: 'bg-black hover:bg-gray-900',
            icon: Apple,
            textColor: 'text-white'
        }
    ]

    // Pain points data
    const painPoints = [
        { icon: TrendingDown, text: "Working for pennies on freelance platforms", color: "text-red-400" },
        { icon: Clock, text: "Trading time for money with no passive income", color: "text-orange-400" },
        { icon: DollarSign, text: "Watching others monetize while you struggle", color: "text-yellow-400" }
    ]

    // Trust indicators with CheckCircle icons
    const trustIndicators = [
        { icon: CheckCircle, text: "Free to start", color: "text-green-400" },
        { icon: CheckCircle, text: "No monthly fees", color: "text-green-400" },
        { icon: CheckCircle, text: "Instant payouts", color: "text-green-400" }
    ]

    // Handle scroll for parallax effect
    onMount(() => {
        const handleScroll = () => {
            scrollY = window.scrollY
        }

        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    })

    /**
     * Handle form submission for signup
     * @param {Event} e - The form event
     */
    async function handleSignup(e) {

    }

    /**
     * Handle social login/signup with OAuth providers
     * @param {string} provider - The social provider name
     */
    async function handleSocialLogin(provider) {

    }

    function togglePassword() {
        showPassword = !showPassword
    }
</script>

<svelte:window bind:scrollY />

<section class="relative min-h-screen overflow-hidden bg-black text-white">
    <!-- Animated background -->
    <div class="absolute inset-0 z-0">
        <div
                class="absolute top-1/4 left-1/6 w-96 h-96 rounded-full blur-3xl bg-purple-600/20"
                style="transform: translateY({y1}px)"
        ></div>
        <div
                class="absolute bottom-1/4 right-1/6 w-80 h-80 rounded-full blur-3xl bg-purple-500/15"
                style="transform: translateY({y2}px)"
        ></div>

        <!-- Grid pattern overlay -->
        <div class="absolute inset-0 opacity-5">
            <div
                    class="absolute inset-0"
                    style="background-image: linear-gradient(rgba(124, 58, 237, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(124, 58, 237, 0.1) 1px, transparent 1px); background-size: 50px 50px"
            ></div>
        </div>
    </div>

    <!-- Main content -->
    <main class="relative z-10 flex min-h-screen items-center px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        <div class="mx-auto w-full max-w-7xl">
            <div class="grid items-center gap-8 sm:gap-12 lg:gap-16 lg:grid-cols-2">

                <!-- Left side - Pain Point -->
                <div class="space-y-6 sm:space-y-8">
                    <header class="space-y-6 sm:space-y-8">
                        <!-- Problem badge -->
                        <div class="inline-flex items-center rounded-full border border-red-500/30 px-4 py-2 text-sm font-medium bg-red-900/30 text-red-400">
                            <AlertCircle class="w-4 h-4 mr-2" />
                            The Developer Income Problem
                        </div>

                        <h1 class="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                            Your Code Skills<br/>
                            Aren't Paying the Bills
                        </h1>

                        <div class="space-y-4 sm:space-y-6">
                            <p class="text-lg sm:text-xl text-gray-300 leading-relaxed">
                                You're building amazing things, but your bank account doesn't reflect your talent.
                                Sound familiar?
                            </p>

                            <!-- Pain points list -->
                            <div class="space-y-3 sm:space-y-4">
                                {#each painPoints as pain (pain.text)}
                                    {@const Component = pain.icon}
                                    <div class="flex items-center space-x-3 group" >

                                        <Component class="w-5 h-5 {pain.color} group-hover:scale-110 transition-transform" />
                                        <span class="text-gray-300 group-hover:text-white transition-colors">
											{pain.text}
										</span>
                                    </div>
                                {/each}
                            </div>
                        </div>

                        <!-- Solution teaser -->
                        <div class="bg-gradient-to-r from-purple-900/50 to-purple-800/30 rounded-xl p-6 border border-purple-500/30">
                            <div class="flex items-start space-x-3">
                                <div class="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                                    <Zap class="w-4 h-4 text-white" />
                                </div>
                                <div>
                                    <h3 class="font-semibold text-white mb-2">
                                        What if you could turn every project into passive income?
                                    </h3>
                                    <p class="text-purple-200 text-sm">
                                        Join 50,000+ developers earning $500-$15k/month by selling their code once and earning forever.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </header>
                </div>

                <!-- Right side - Signup Form -->
                <div class="w-full max-w-md lg:justify-self-end">
                    <!-- This div will be hidden on large screens since we have the floating form -->
                    <div class="rounded-2xl border border-purple-500/20 bg-gradient-to-br from-gray-900/80 to-gray-800/60 p-6 sm:p-8 shadow-2xl shadow-purple-500/10 backdrop-blur-xl lg:hidden">

                        <!-- Form header -->
                        <div class="mb-6 sm:mb-8 text-center">
                            <div class="w-12 h-12 bg-purple-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                                <Code class="w-6 h-6 text-white" />
                            </div>

                            <h2 id="signup-form-title" class="mb-2 text-xl sm:text-2xl font-bold text-white">Start Earning Today</h2>
                            <p class="text-sm sm:text-base text-gray-400">
                                Create an account and discover how to monetize your code
                            </p>
                        </div>

                        <!-- Signup form -->
                        <form onsubmit={handleSignup} class="space-y-6" aria-labelledby="signup-form-title">
                            <div>
                                <label for="email-input" class="block text-sm font-medium text-gray-300 mb-2">
                                    Email
                                </label>
                                <div class="relative">
                                    <Mail class="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                                    <input
                                            id="email-input"
                                            type="email"
                                            bind:value={email}
                                            class="w-full pl-10 pr-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-colors"
                                            placeholder="your@email.com"
                                            required
                                            aria-describedby="email-help"
                                    />
                                </div>
                            </div>

                            <div>
                                <label for="password-input" class="block text-sm font-medium text-gray-300 mb-2">
                                    Password
                                </label>
                                <div class="relative">
                                    <input
                                            id="password-input"
                                            type={showPassword ? "text" : "password"}
                                            bind:value={password}
                                            class="w-full pl-4 pr-12 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-colors"
                                            placeholder="Create a password"
                                            required
                                            aria-describedby="password-help"
                                    />
                                    <button
                                            type="button"
                                            onclick={togglePassword}
                                            class="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-300"
                                            aria-label={showPassword ? "Hide password" : "Show password"}
                                    >
                                        {#if showPassword}
                                            <EyeOff class="w-5 h-5" />
                                        {:else}
                                            <Eye class="w-5 h-5" />
                                        {/if}
                                    </button>
                                </div>
                            </div>

                            <button
                                    type="submit"
                                    disabled={isLoading}
                                    class="w-full bg-gradient-to-r from-purple-600 to-purple-700 text-white py-3 rounded-lg font-semibold hover:from-purple-700 hover:to-purple-800 transition-all duration-300 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                            >
                                {#if isLoading}
                                    <div class="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                                {:else}
                                    Get Started Free
                                    <ArrowRight class="w-5 h-5 ml-2" />
                                {/if}
                            </button>

                            <div class="relative">
                                <div class="absolute inset-0 flex items-center">
                                    <div class="w-full border-t border-gray-700"></div>
                                </div>
                                <div class="relative flex justify-center text-sm">
                                    <span class="px-2 bg-gray-900 text-gray-400">OR</span>
                                </div>
                            </div>

                            <!-- Social login buttons -->
                            <div class="grid grid-cols-3 gap-3">
                                {#each SOCIAL_PROVIDERS as provider (provider.name)}
                                    {@const isProviderLoading = loadingProvider === provider.name}
                                    <button
                                            type="button"
                                            onclick={() => handleSocialLogin(provider.name)}
                                            disabled={isLoading}
                                            class="{provider.bg} {provider.textColor || 'text-white'} py-2 px-4 rounded-lg font-medium transition-all duration-300 flex items-center justify-center cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        {#if isProviderLoading}
                                            <div class="w-6 h-6 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
                                        {:else}
                                            {@const Component = provider.icon}
                                            <Component class="w-6 h-6" />
                                        {/if}
                                    </button>
                                {/each}
                            </div>

                            <div class="text-center text-sm text-gray-400">
                                By signing up you agree to our&nbsp;
                                <a href="/#" class="text-purple-400 hover:text-purple-300 transition-colors">
                                    terms of service
                                </a>&nbsp;
                                and&nbsp;
                                <a href="/#" class="text-purple-400 hover:text-purple-300 transition-colors">
                                    privacy policy
                                </a>
                            </div>
                        </form>

                        <!-- Trust indicators -->
                        <div class="mt-8 pt-6 border-t border-gray-700">
                            <div class="flex items-center justify-center space-x-6 text-xs text-gray-400">
                                {#each trustIndicators as indicator (indicator.text)}
                                    {@const Component = indicator.icon}
                                    <div class="flex items-center space-x-1">
                                        <Component class="w-3 h-3 {indicator.color}"/>
                                        <span>{indicator.text}</span>
                                    </div>
                                {/each}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </main>

    <!-- Floating Signup Form - Only visible on large screens -->
    <div class="fixed top-1/2 right-4 xl:right-8 z-20 hidden w-full max-w-md -translate-y-1/2 transform lg:block">
        <div class="rounded-2xl border border-purple-500/20 bg-gradient-to-br from-gray-900/90 to-gray-800/70 p-6 xl:p-8 shadow-2xl shadow-purple-500/10 backdrop-blur-xl">

            <!-- Form header -->
            <div class="text-center mb-8">
                <div class="w-12 h-12 bg-purple-600 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <Code class="w-6 h-6 text-white" />
                </div>

                <h2 class="mb-2 text-xl xl:text-2xl font-bold text-white">Start Earning Today</h2>
                <p class="text-sm xl:text-base text-gray-400">
                    Create an account and discover how to monetize your code
                </p>
            </div>

            <!-- Signup form -->
            <form onsubmit={handleSignup} class="space-y-6">
                <div>
                    <label class="block text-sm font-medium text-gray-300 mb-2" for="email-input">
                        Email
                    </label>
                    <div class="relative">
                        <Mail class="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                                type="email"
                                bind:value={email}
                                class="w-full pl-10 pr-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-colors"
                                placeholder="your@email.com"
                                required
                        />
                    </div>
                </div>

                <div>
                    <label class="block text-sm font-medium text-gray-300 mb-2" for="password-input">
                        Password
                    </label>
                    <div class="relative">
                        <input
                                type={showPassword ? "text" : "password"}
                                bind:value={password}
                                class="w-full pl-4 pr-12 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-colors"
                                placeholder="Create a password"
                                required
                        />
                        <button
                                type="button"
                                onclick={togglePassword}
                                class="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-300"
                        >
                            {#if showPassword}
                                <EyeOff class="w-5 h-5" />
                            {:else}
                                <Eye class="w-5 h-5" />
                            {/if}
                        </button>
                    </div>
                </div>

                <button
                        type="submit"
                        disabled={isLoading}
                        class="w-full bg-gradient-to-r from-purple-600 to-purple-700 text-white py-3 rounded-lg font-semibold hover:from-purple-700 hover:to-purple-800 transition-all duration-300 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                >
                    {#if isLoading}
                        <div class="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                    {:else}
                        Get Started Free
                        <ArrowRight class="w-5 h-5 ml-2" />
                    {/if}
                </button>

                <div class="relative">
                    <div class="absolute inset-0 flex items-center">
                        <div class="w-full border-t border-gray-700"></div>
                    </div>
                    <div class="relative flex justify-center text-sm">
                        <span class="px-2 bg-gray-900 text-gray-400">OR</span>
                    </div>
                </div>

                <!-- Social login buttons -->
                <div class="grid grid-cols-3 gap-3">
                    {#each SOCIAL_PROVIDERS as provider (provider.name)}
                        {@const Component = provider.icon}
                        <button
                                type="button"
                                onclick={() => handleSocialLogin(provider.name)}
                                class="{provider.bg} {provider.textColor || 'text-white'} py-2 px-4 rounded-lg font-medium transition-all duration-300 flex items-center justify-center cursor-pointer"
                        >
                            <Component class="w-6 h-6" />
                        </button>
                    {/each}
                </div>

                <div class="text-center text-sm text-gray-400">
                    By signing up you agree to our&nbsp;
                    <a href="/#" class="text-purple-400 hover:text-purple-300 transition-colors">
                        terms of service
                    </a>&nbsp;
                    and&nbsp;
                    <a href="/#" class="text-purple-400 hover:text-purple-300 transition-colors">
                        privacy policy
                    </a>
                </div>
            </form>

            <!-- Trust indicators -->
            <div class="mt-8 pt-6 border-t border-gray-700">
                <div class="flex items-center justify-center space-x-6 text-xs text-gray-400">
                    {#each trustIndicators as indicator (indicator.text)}
                        {@const Component = indicator.icon}
                        <div class="flex items-center space-x-1">
                            <Component class="w-3 h-3 {indicator.color}"/>
                            <span>{indicator.text}</span>
                        </div>
                    {/each}
                </div>
            </div>
        </div>
    </div>
</section>

<footer>
    <a href="https://github.com/akielkucki/digitalmarketplace">Hatch Community Homepage</a> © 2025 by <a href="https://github.com/akielkucki/digitalmarketplace">Hatch Developers</a> is licensed under <a href="https://creativecommons.org/licenses/by-nc-nd/4.0/">CC BY-NC-ND 4.0</a><img src="https://mirrors.creativecommons.org/presskit/icons/cc.svg" alt="" style="max-width: 1em;max-height:1em;margin-left: .2em;"><img src="https://mirrors.creativecommons.org/presskit/icons/by.svg" alt="" style="max-width: 1em;max-height:1em;margin-left: .2em;"><img src="https://mirrors.creativecommons.org/presskit/icons/nc.svg" alt="" style="max-width: 1em;max-height:1em;margin-left: .2em;"><img src="https://mirrors.creativecommons.org/presskit/icons/nd.svg" alt="" style="max-width: 1em;max-height:1em;margin-left: .2em;">
</footer>