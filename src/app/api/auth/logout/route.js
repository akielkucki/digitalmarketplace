import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { AUTH_CONFIG } from '@/constants/index.mjs'

// Force Node.js runtime for this route
export const runtime = 'nodejs'

/**
 * Handle POST requests for user logout
 * @returns {Promise<NextResponse>} The response with logout status
 */
export async function POST() {
    try {
        const cookieStore = await cookies()
        cookieStore.delete(AUTH_CONFIG.cookieName)
        
        return NextResponse.json({
            success: true,
            message: 'Logout successful'
        })
        
    } catch (error) {
        console.error('Logout error:', error)
        return NextResponse.json(
            { success: false, error: 'Internal server error' },
            { status: 500 }
        )
    }
}
