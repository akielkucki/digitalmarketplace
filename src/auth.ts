import {cookies} from 'next/headers'
import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET || 'your-dev-secret' // Use strong env secret in prod

interface UserPayload {
    sub: string
    email?: string
    role?: string
    [key: string]: JsonWebKey | string | undefined
}

export function getUser(): UserPayload | null {
    const cookieStore = cookies()
    const token = cookieStore.get('sb-access-token')?.value

    if (!token) return null

    try {
        const decoded = jwt.verify(token, JWT_SECRET) as UserPayload
        return decoded
    } catch (err) {
        console.error('Invalid JWT:', err)
        return null
    }
}
