import { NextResponse } from 'next/server'
import { User, hashPassword, generateToken, setAuthCookie, validateSignupForm } from '@/lib'

// Force Node.js runtime for this route
export const runtime = 'nodejs'

/**
 * Handle POST requests for user signup
 * @param {Request} request - The incoming request
 * @returns {Promise<NextResponse>} The response with signup status
 */
export async function POST(request) {
    try {
        const requestBody = await request.json()
        
        const validation = validateSignupForm(requestBody)
        if (!validation.isValid) {
            return NextResponse.json(
                { success: false, error: validation.error },
                { status: 400 }
            )
        }
        
        const { email, password, name } = requestBody
        
        const existingUserResult = await User.findByEmail(email)
        if (!existingUserResult.success) {
            return NextResponse.json(
                { success: false, error: 'Database error checking existing user' },
                { status: 500 }
            )
        }
        
        if (existingUserResult.data) {
            return NextResponse.json(
                { success: false, error: 'User with this email already exists' },
                { status: 409 }
            )
        }
        
        const hashedPassword = await hashPassword(password)
        
        const newUserResult = await User.create({
            email,
            password: hashedPassword,
            name: name || null,
            role: 'user'
        })
        
        if (!newUserResult.success) {
            return NextResponse.json(
                { success: false, error: 'Failed to create user account' },
                { status: 500 }
            )
        }
        
        const token = generateToken(newUserResult.data)
        
        await setAuthCookie(token)
        
        return NextResponse.json({
            success: true,
            message: 'Account created successfully',
            user: {
                id: newUserResult.data.id,
                email: newUserResult.data.email,
                name: newUserResult.data.name,
                role: newUserResult.data.role,
                createdAt: newUserResult.data.created_at
            }
        })
        
    } catch (error) {
        console.error('Signup error:', error)
        return NextResponse.json(
            { success: false, error: 'Internal server error' },
            { status: 500 }
        )
    }
}
