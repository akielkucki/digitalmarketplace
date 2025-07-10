import { cookies } from 'next/headers'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import { AUTH_CONFIG } from '@/constants/index.mjs'

/**
 * @typedef {import('../types').AuthUser} AuthUser
 * @typedef {import('../types').User} User
 */

/**
 * Hash a password using bcrypt
 * @param {string} password - Plain text password
 * @returns {Promise<string>} Hashed password
 */
export async function hashPassword(password) {
    const saltRounds = 12
    return await bcrypt.hash(password, saltRounds)
}

/**
 * Verify a password against its hash
 * @param {string} password - Plain text password
 * @param {string} hashedPassword - Hashed password from database
 * @returns {Promise<boolean>} Whether password matches
 */
export async function verifyPassword(password, hashedPassword) {
    return await bcrypt.compare(password, hashedPassword)
}

/**
 * Generate a JWT token for a user
 * @param {User} user - User object
 * @returns {string} JWT token
 */
export function generateToken(user) {
    const payload = {
        sub: user.id,
        email: user.email,
        role: user.role,
        iat: Math.floor(Date.now() / 1000),
        exp: Math.floor(Date.now() / 1000) + (AUTH_CONFIG.cookieMaxAge / 1000)
    }
    
    return jwt.sign(payload, AUTH_CONFIG.jwtSecret)
}

/**
 * Verify and decode a JWT token
 * @param {string} token - JWT token
 * @returns {AuthUser|null} Decoded user payload or null if invalid
 */
export function verifyToken(token) {
    try {
        const decoded = jwt.verify(token, AUTH_CONFIG.jwtSecret)
        if (typeof decoded === 'object' && decoded !== null) {
            return /** @type {AuthUser} */ (decoded)
        }
        return null
    } catch (error) {
        console.error('Token verification failed:', error.message)
        return null
    }
}

/**
 * Set authentication cookie
 * @param {string} token - JWT token
 * @returns {Promise<void>}
 */
export async function setAuthCookie(token) {
    const cookieStore = await cookies()
    
    cookieStore.set(AUTH_CONFIG.cookieName, token, {
        httpOnly: true,
        secure: AUTH_CONFIG.cookieSecure,
        sameSite: /** @type {'lax'} */ (AUTH_CONFIG.cookieSameSite),
        maxAge: AUTH_CONFIG.cookieMaxAge / 1000,
        path: '/'
    })
}

/**
 * Remove authentication cookie
 * @returns {Promise<void>}
 */
export async function removeAuthCookie() {
    const cookieStore = await cookies()
    
    cookieStore.delete(AUTH_CONFIG.cookieName)
}

/**
 * Get the current authenticated user from JWT token
 * @returns {Promise<AuthUser | null>} The user payload or null if not authenticated
 */
export async function getUser() {
    try {
        const cookieStore = await cookies()
        const token = cookieStore.get(AUTH_CONFIG.cookieName)?.value

        if (!token) return null

        return verifyToken(token)
    } catch (error) {
        console.error('Failed to get user:', error)
        return null
    }
}

/**
 * Check if user has required role
 * @param {AuthUser} user - Authenticated user
 * @param {string} requiredRole - Required role
 * @returns {boolean} Whether user has required role
 */
export function hasRole(user, requiredRole) {
    if (!user || !user.role) return false
    
    const roleHierarchy = {
        'user': 1,
        'moderator': 2,
        'admin': 3
    }
    
    const userRoleLevel = roleHierarchy[user.role] || 0
    const requiredRoleLevel = roleHierarchy[requiredRole] || 0
    
    return userRoleLevel >= requiredRoleLevel
}
