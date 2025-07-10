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
     * @returns {Promise<Object>} Created user
     */
    static async create({ email, password, name = null, role = 'user' }) {
        const result = await query(`
            INSERT INTO users (email, password, name, role, created_at, updated_at)
            VALUES ($1, $2, $3, $4, NOW(), NOW())
            RETURNING id, email, name, role, created_at, updated_at
        `, [email, password, name, role])
        
        return result.rows[0]
    }
    
    /**
     * Find user by email
     * @param {string} email - User email
     * @returns {Promise<Object|null>} User or null
     */
    static async findByEmail(email) {
        const result = await query(`
            SELECT id, email, password, name, role, created_at, updated_at
            FROM users 
            WHERE email = $1
        `, [email])
        
        return result.rows[0] || null
    }
    
    /**
     * Find user by ID
     * @param {string} id - User ID
     * @returns {Promise<Object|null>} User or null
     */
    static async findById(id) {
        const result = await query(`
            SELECT id, email, name, role, created_at, updated_at
            FROM users 
            WHERE id = $1
        `, [id])
        
        return result.rows[0] || null
    }
    
    /**
     * Update user
     * @param {string} id - User ID
     * @param {Object} updates - Fields to update
     * @returns {Promise<Object>} Updated user
     */
    static async update(id, updates) {
        const fields = Object.keys(updates)
        const values = Object.values(updates)
        const setClause = fields.map((field, index) => `${field} = $${index + 2}`).join(', ')
        
        const result = await query(`
            UPDATE users 
            SET ${setClause}, updated_at = NOW()
            WHERE id = $1
            RETURNING id, email, name, role, created_at, updated_at
        `, [id, ...values])
        
        return result.rows[0]
    }
    
    /**
     * Delete user
     * @param {string} id - User ID
     * @returns {Promise<boolean>} Success status
     */
    static async delete(id) {
        const result = await query(`
            DELETE FROM users WHERE id = $1
        `, [id])
        
        return result.rowCount > 0
    }
    
    /**
     * Get all users with pagination
     * @param {number} [page=1] - Page number
     * @param {number} [limit=10] - Items per page
     * @returns {Promise<Object>} Users and pagination info
     */
    static async getAll(page = 1, limit = 10) {
        const offset = (page - 1) * limit
        
        const [users, count] = await Promise.all([
            query(`
                SELECT id, email, name, role, created_at, updated_at
                FROM users 
                ORDER BY created_at DESC
                LIMIT $1 OFFSET $2
            `, [limit, offset]),
            query('SELECT COUNT(*) FROM users')
        ])
        
        return {
            users: users.rows,
            total: parseInt(count.rows[0].count),
            page,
            limit,
            totalPages: Math.ceil(count.rows[0].count / limit)
        }
    }
}
