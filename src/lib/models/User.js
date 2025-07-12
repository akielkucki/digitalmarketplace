import { query } from '@/lib/db'

/**
 * User model for database operations
 */
export class User {
    /**
     * Create a new user
     * @param {Object} userData - User data
     * @param {string} userData.email - User email
     * @param {string} userData.password - Hashed password
     * @param {string} [userData.name] - User name
     * @param {string} [userData.role] - User role
     * @returns {Promise<{success: boolean, error: string|null, data?: Object}>} Result with created user
     */
    static async create({ email, password, name = null, role = 'user' }) {
        try {
            const result = await query(`
                INSERT INTO users (email, password, name, role, created_at, updated_at)
                VALUES ($1, $2, $3, $4, NOW(), NOW())
                RETURNING id, email, name, role, created_at, updated_at
            `, [email, password, name, role])
            
            if (!result.success) {
                return {
                    success: false,
                    error: result.error,
                    data: null
                }
            }
            
            return {
                success: true,
                error: null,
                data: result.data.rows[0]
            }
        } catch (error) {
            return {
                success: false,
                error: error.message || 'Failed to create user',
                data: null
            }
        }
    }
    
    /**
     * Find user by email
     * @param {string} email - User email
     * @returns {Promise<{success: boolean, error: string|null, data?: Object|null}>} Result with user or null
     */
    static async findByEmail(email) {
        try {
            const result = await query(`
                SELECT id, email, password, name, role, created_at, updated_at
                FROM users 
                WHERE email = $1
            `, [email])
            
            if (!result.success) {
                return {
                    success: false,
                    error: result.error,
                    data: null
                }
            }
            
            return {
                success: true,
                error: null,
                data: result.data.rows[0] || null
            }
        } catch (error) {
            return {
                success: false,
                error: error.message || 'Failed to find user by email',
                data: null
            }
        }
    }
    
    /**
     * Find user by ID
     * @param {string} id - User ID
     * @returns {Promise<{success: boolean, error: string|null, data?: Object|null}>} Result with user or null
     */
    static async findById(id) {
        try {
            const result = await query(`
                SELECT id, email, name, role, created_at, updated_at
                FROM users 
                WHERE id = $1
            `, [id])
            
            if (!result.success) {
                return {
                    success: false,
                    error: result.error,
                    data: null
                }
            }
            
            return {
                success: true,
                error: null,
                data: result.data.rows[0] || null
            }
        } catch (error) {
            return {
                success: false,
                error: error.message || 'Failed to find user by ID',
                data: null
            }
        }
    }
    
    /**
     * Update user
     * @param {string} id - User ID
     * @param {Object} updates - Fields to update
     * @returns {Promise<{success: boolean, error: string|null, data?: Object}>} Result with updated user
     */
    static async update(id, updates) {
        try {
            const fields = Object.keys(updates)
            const values = Object.values(updates)
            const setClause = fields.map((field, index) => `${field} = $${index + 2}`).join(', ')
            
            const result = await query(`
                UPDATE users 
                SET ${setClause}, updated_at = NOW()
                WHERE id = $1
                RETURNING id, email, name, role, created_at, updated_at
            `, [id, ...values])
            
            if (!result.success) {
                return {
                    success: false,
                    error: result.error,
                    data: null
                }
            }
            
            return {
                success: true,
                error: null,
                data: result.data.rows[0]
            }
        } catch (error) {
            return {
                success: false,
                error: error.message || 'Failed to update user',
                data: null
            }
        }
    }
    
    /**
     * Delete user
     * @param {string} id - User ID
     * @returns {Promise<{success: boolean, error: string|null, data?: boolean}>} Result with success status
     */
    static async delete(id) {
        try {
            const result = await query(`
                DELETE FROM users WHERE id = $1
            `, [id])
            
            if (!result.success) {
                return {
                    success: false,
                    error: result.error,
                    data: false
                }
            }
            
            return {
                success: true,
                error: null,
                data: result.data.rowCount > 0
            }
        } catch (error) {
            return {
                success: false,
                error: error.message || 'Failed to delete user',
                data: false
            }
        }
    }
    
    /**
     * Get all users with pagination
     * @param {number} [page=1] - Page number
     * @param {number} [limit=10] - Items per page
     * @returns {Promise<{success: boolean, error: string|null, data?: Object}>} Result with users and pagination info
     */
    static async getAll(page = 1, limit = 10) {
        try {
            const offset = (page - 1) * limit
            
            const [usersResult, countResult] = await Promise.all([
                query(`
                    SELECT id, email, name, role, created_at, updated_at
                    FROM users 
                    ORDER BY created_at DESC
                    LIMIT $1 OFFSET $2
                `, [limit, offset]),
                query('SELECT COUNT(*) FROM users')
            ])
            
            if (!usersResult.success) {
                return {
                    success: false,
                    error: usersResult.error,
                    data: null
                }
            }
            
            if (!countResult.success) {
                return {
                    success: false,
                    error: countResult.error,
                    data: null
                }
            }
            
            const totalCount = parseInt(countResult.data.rows[0].count)
            
            return {
                success: true,
                error: null,
                data: {
                    users: usersResult.data.rows,
                    total: totalCount,
                    page,
                    limit,
                    totalPages: Math.ceil(totalCount / limit)
                }
            }
        } catch (error) {
            return {
                success: false,
                error: error.message || 'Failed to get users',
                data: null
            }
        }
    }
}
