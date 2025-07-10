/**
 * Library utilities index
 */

export { getDbPool, query, getClient, testConnection, closePool } from './db.js'
export { User } from './models/User.js'
export { runMigrations } from './migrations/index.js'
export { 
    hashPassword, 
    verifyPassword, 
    generateToken, 
    verifyToken, 
    setAuthCookie, 
    removeAuthCookie, 
    getUser, 
    hasRole 
} from './auth.js'
export { 
    validateEmail, 
    validatePassword, 
    validateName, 
    validateSignupForm, 
    validateLoginForm 
} from './utils/validation.js'
