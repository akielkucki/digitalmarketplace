/**
 * Application constants
 */

/**
 * Validate required environment variables (server-side only)
 */
function validateEnvVars() {
  // Only validate on server side
  if (typeof window !== 'undefined') {
    return // Skip validation on client side
  }
  
  const required = [
    'JWT_SECRET',
    'DB_PASSWORD'
  ]
  
  const missing = required.filter(key => !process.env[key])
  
  if (missing.length > 0) {
    throw new Error(
      `Missing required environment variables: ${missing.join(', ')}\n` +
      'Please check your .env.local file and ensure all required variables are set.'
    )
  }
}

// Validate environment variables on module load
validateEnvVars()

export const APP_CONFIG = {
  name: "DevMarket",
  description: "Monetize your code and earn passive income", 
  url: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
  api: {
    baseUrl: process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080"
  }
}

export const AUTH_CONFIG = {
  jwtSecret: typeof window === 'undefined' ? process.env.JWT_SECRET : null,
  cookieName: 'auth-token',
  cookieMaxAge: 7 * 24 * 60 * 60 * 1000,
  cookieSecure: process.env.NODE_ENV === 'production',
  cookieSameSite: 'lax',
  jwtExpiresIn: '7d'
}

export const DB_CONFIG = {
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432'),
  database: process.env.DB_NAME || 'authdb',
  user: process.env.DB_USER || 'postgres',
  password: typeof window === 'undefined' ? process.env.DB_PASSWORD : null,
  ssl: process.env.NODE_ENV === 'production'
}

export const ROUTES = {
  public: {
    home: '/',
    login: '/login',
    signup: '/signup',
    about: '/about'
  },
  protected: {
    dashboard: '/dashboard',
    profile: '/profile',
    settings: '/settings'
  },
  api: {
    auth: '/api/auth',
    guilds: '/api/guilds',
    user: '/api/user'
  }
}

export const SOCIAL_PROVIDERS = [
  { name: "Discord", bg: "bg-white", icon: '/discord-icon.svg' },
  { name: "Google", bg: "bg-white", icon: '/google-icon-logo.svg', textColor: "text-gray-900" },
  { name: "GitHub", bg: "bg-white", icon: "/github-icon.svg", textColor: "text-white" }
]
