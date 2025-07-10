import { NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'
import { AUTH_CONFIG, ROUTES } from '@/constants/index.mjs'

/**
 * @typedef {import('next/server').NextRequest} NextRequest
 */

/**
 * List of protected routes that require authentication
 */
const protectedRoutes = [
    ROUTES.protected.dashboard,
    ROUTES.protected.profile,
    ROUTES.protected.settings,
    '/api/auth/me'
]

/**
 * List of auth routes that should redirect if user is already logged in
 */
const authRoutes = [
    ROUTES.public.login,
    ROUTES.public.signup
]

/**
 * List of public API routes that don't need authentication
 */
const publicApiRoutes = [
    '/api/auth/login',
    '/api/auth/signup',
    '/api/auth/logout',
    '/api/db-test',
    '/api/migrate',
    '/api/guilds'
]

/**
 * Verify JWT token in middleware without database access
 * @param {string} token - JWT token
 * @returns {Object|null} Decoded user payload or null if invalid
 */
function verifyTokenInMiddleware(token) {
    try {
        const decoded = jwt.verify(token, AUTH_CONFIG.jwtSecret)
        if (typeof decoded === 'object' && decoded !== null) {
            return decoded
        }
        return null
    } catch {
        return null
    }
}

/**
 * Middleware function to handle authentication and routing
 * @param {NextRequest} request - The incoming request
 * @returns {Promise<NextResponse>} The response or redirect
 */
export async function middleware(request) {
    const { pathname } = request.nextUrl
    
    // Skip middleware for static files and certain paths
    if (
        pathname.startsWith('/_next') ||
        pathname.startsWith('/favicon') ||
        pathname.includes('.') ||
        publicApiRoutes.some(route => pathname.startsWith(route))
    ) {
        return NextResponse.next()
    }

    try {
        // Get authentication status from cookie
        const token = request.cookies.get(AUTH_CONFIG.cookieName)?.value
        const isAuthenticated = token ? !!verifyTokenInMiddleware(token) : false
        
        // Handle protected routes
        if (protectedRoutes.some(route => pathname.startsWith(route))) {
            if (!isAuthenticated) {
                const loginUrl = new URL(ROUTES.public.login, request.url)
                loginUrl.searchParams.set('redirect', pathname)
                return NextResponse.redirect(loginUrl)
            }
        }
        
        // Handle auth routes (redirect if already logged in)
        if (authRoutes.some(route => pathname.startsWith(route))) {
            if (isAuthenticated) {
                return NextResponse.redirect(new URL(ROUTES.protected.dashboard, request.url))
            }
        }
        
        return NextResponse.next()
    } catch (error) {
        console.error('Middleware error:', error)
        return NextResponse.next()
    }
}

/**
 * Configuration for which routes this middleware should run on
 */
export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         * - public folder files
         */
        '/((?!_next/static|_next/image|favicon.ico|.*\\..*|public).*)',
    ],
}
