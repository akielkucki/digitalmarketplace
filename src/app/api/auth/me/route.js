import { NextResponse } from 'next/server'
import { getUser, User } from '@/lib'

// Force Node.js runtime for this route
export const runtime = 'nodejs'

/**
 * Handle GET requests to get current authenticated user
 * @returns {Promise<NextResponse>} The response with user data
 */
export async function GET() {
    try {
        const authUser = await getUser()
        
        if (!authUser) {
            return NextResponse.json(
                { success: false, error: 'Not authenticated' },
                { status: 401 }
            )
        }
        
        const userResult = await User.findById(authUser.sub)
        if (!userResult.success) {
            return NextResponse.json(
                { success: false, error: 'Database error retrieving user' },
                { status: 500 }
            )
        }
        
        if (!userResult.data) {
            return NextResponse.json(
                { success: false, error: 'User not found' },
                { status: 404 }
            )
        }
        
        return NextResponse.json({
            success: true,
            user: {
                id: userResult.data.id,
                email: userResult.data.email,
                name: userResult.data.name,
                role: userResult.data.role,
                createdAt: userResult.data.created_at,
                updatedAt: userResult.data.updated_at
            }
        })
        
    } catch (error) {
        console.error('Get user error:', error)
        return NextResponse.json(
            { success: false, error: 'Internal server error' },
            { status: 500 }
        )
    }
}
