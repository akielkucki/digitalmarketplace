import { NextResponse } from 'next/server'
import { User, verifyPassword, generateToken, setAuthCookie, validateLoginForm } from '@/lib'

// Force Node.js runtime for this route
export const runtime = 'nodejs'

/**
 * Handle POST requests for user login
 * @param {Request} request - The incoming request
 * @returns {Promise<NextResponse>} The response with login status
 */
export async function POST(request) {
    try {
        const requestBody = await request.json()
        
        const validation = validateLoginForm(requestBody)
        if (!validation.isValid) {
            return NextResponse.json(
                { success: false, error: validation.error },
                { status: 400 }
            )
        }
        
        const { email, password } = requestBody
        
        const userResult = await User.findByEmail(email)
        if (!userResult.success) {
            return NextResponse.json(
                { success: false, error: 'Database error checking user' },
                { status: 500 }
            )
        }
        
        if (!userResult.data) {
            return NextResponse.json(
                { success: false, error: 'Invalid email or password' },
                { status: 401 }
            )
        }
        
        const isPasswordValid = await verifyPassword(password, userResult.data.password)
        if (!isPasswordValid) {
            return NextResponse.json(
                { success: false, error: 'Invalid email or password' },
                { status: 401 }
            )
        }
        
        const token = generateToken(userResult.data)
        
        await setAuthCookie(token)
        
        return NextResponse.json({
            success: true,
            message: 'Login successful',
            user: {
                id: userResult.data.id,
                email: userResult.data.email,
                name: userResult.data.name,
                role: userResult.data.role,
                createdAt: userResult.data.created_at
            }
        })
        
    } catch (error) {
        console.error('Login error:', error)
        return NextResponse.json(
            { success: false, error: 'Internal server error' },
            { status: 500 }
        )
    }
}
