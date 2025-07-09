import { cookies } from 'next/headers'
import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET || 'your-dev-secret' // Use strong env secret in prod

/**
 * @typedef {Object} UserPayload
 * @property {string} sub - Subject identifier
 * @property {string} [email] - User email
 * @property {string} [role] - User role
 * @property {JsonWebKey | string | undefined} [key] - Additional properties
 */

/**
 * Get the current authenticated user from JWT token
 * @returns {Promise<UserPayload | null>} The user payload or null if not authenticated
 */
export async function getUser() {
    const cookieStore = await cookies()
    const token = cookieStore.get('sb-access-token')?.value

    if (!token) return null

    try {
        const decoded = jwt.verify(token, JWT_SECRET)
        // Ensure decoded is an object (not a string) before returning
        if (typeof decoded === 'object' && decoded !== null) {
            return /** @type {UserPayload} */ (decoded)
        }
        return null
    } catch (err) {
        console.error('Invalid JWT:', err)
        return null
    }
}
