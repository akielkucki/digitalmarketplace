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
        
        const user = await User.findByEmail(email)
        if (!user) {
            return NextResponse.json(
                { success: false, error: 'Invalid email or password' },
                { status: 401 }
            )
        }
        
        const isPasswordValid = await verifyPassword(password, user.password)
        if (!isPasswordValid) {
            return NextResponse.json(
                { success: false, error: 'Invalid email or password' },
                { status: 401 }
            )
        }
        
        const token = generateToken(user)
        
        await setAuthCookie(token)
        
        return NextResponse.json({
            success: true,
            message: 'Login successful',
            user: {
                id: user.id,
                email: user.email,
                name: user.name,
                role: user.role,
                createdAt: user.created_at
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
