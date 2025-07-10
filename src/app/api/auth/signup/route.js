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
        
        const existingUser = await User.findByEmail(email)
        if (existingUser) {
            return NextResponse.json(
                { success: false, error: 'User with this email already exists' },
                { status: 409 }
            )
        }
        
        const hashedPassword = await hashPassword(password)
        
        const newUser = await User.create({
            email,
            password: hashedPassword,
            name: name || null,
            role: 'user'
        })
        
        const token = generateToken(newUser)
        
        await setAuthCookie(token)
        
        return NextResponse.json({
            success: true,
            message: 'Account created successfully',
            user: {
                id: newUser.id,
                email: newUser.email,
                name: newUser.name,
                role: newUser.role,
                createdAt: newUser.created_at
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
