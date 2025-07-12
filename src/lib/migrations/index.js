import { query } from '@/lib/db'

/**
 * Initial database migration - Create users table
 * @returns {Promise<{success: boolean, error: string|null, data?: boolean}>} Migration result
 */
export const createUsersTable = async () => {
    try {
        const tableResult = await query(`
            CREATE TABLE IF NOT EXISTS users (
                id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
                email VARCHAR(255) UNIQUE NOT NULL,
                password VARCHAR(255) NOT NULL,
                name VARCHAR(255),
                role VARCHAR(50) DEFAULT 'user',
                email_verified BOOLEAN DEFAULT FALSE,
                created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
                updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
            );
        `)
        
        if (!tableResult.success) {
            return {
                success: false,
                error: `Failed to create users table: ${tableResult.error}`,
                data: null
            }
        }
        
        // Create index on email for faster lookups
        const indexResult = await query(`
            CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
        `)
        
        if (!indexResult.success) {
            return {
                success: false,
                error: `Failed to create users email index: ${indexResult.error}`,
                data: null
            }
        }
        
        console.log('✅ Users table created successfully')
        return {
            success: true,
            error: null,
            data: true
        }
    } catch (error) {
        console.error('❌ Error creating users table:', error)
        return {
            success: false,
            error: error.message || 'Failed to create users table',
            data: null
        }
    }
}

/**
 * Create sessions table for authentication
 * @returns {Promise<{success: boolean, error: string|null, data?: boolean}>} Migration result
 */
export const createSessionsTable = async () => {
    try {
        const tableResult = await query(`
            CREATE TABLE IF NOT EXISTS sessions (
                id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
                user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
                token VARCHAR(255) UNIQUE NOT NULL,
                expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
                created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
            );
        `)
        
        if (!tableResult.success) {
            return {
                success: false,
                error: `Failed to create sessions table: ${tableResult.error}`,
                data: null
            }
        }
        
        // Create index on user_id and token
        const userIdIndexResult = await query(`
            CREATE INDEX IF NOT EXISTS idx_sessions_user_id ON sessions(user_id);
        `)
        
        if (!userIdIndexResult.success) {
            return {
                success: false,
                error: `Failed to create sessions user_id index: ${userIdIndexResult.error}`,
                data: null
            }
        }
        
        const tokenIndexResult = await query(`
            CREATE INDEX IF NOT EXISTS idx_sessions_token ON sessions(token);
        `)
        
        if (!tokenIndexResult.success) {
            return {
                success: false,
                error: `Failed to create sessions token index: ${tokenIndexResult.error}`,
                data: null
            }
        }
        
        console.log('✅ Sessions table created successfully')
        return {
            success: true,
            error: null,
            data: true
        }
    } catch (error) {
        console.error('❌ Error creating sessions table:', error)
        return {
            success: false,
            error: error.message || 'Failed to create sessions table',
            data: null
        }
    }
}

/**
 * Create projects table for code selling platform
 * @returns {Promise<{success: boolean, error: string|null, data?: boolean}>} Migration result
 */
export const createProjectsTable = async () => {
    try {
        const tableResult = await query(`
            CREATE TABLE IF NOT EXISTS projects (
                id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
                user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
                title VARCHAR(255) NOT NULL,
                description TEXT,
                price DECIMAL(10, 2) NOT NULL,
                tech_stack TEXT[], -- Array of technologies used
                github_url VARCHAR(500),
                demo_url VARCHAR(500),
                thumbnail_url VARCHAR(500),
                is_active BOOLEAN DEFAULT TRUE,
                downloads_count INTEGER DEFAULT 0,
                created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
                updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
            );
        `)
        
        if (!tableResult.success) {
            return {
                success: false,
                error: `Failed to create projects table: ${tableResult.error}`,
                data: null
            }
        }
        
        // Create indexes
        const userIdIndexResult = await query(`
            CREATE INDEX IF NOT EXISTS idx_projects_user_id ON projects(user_id);
        `)
        
        if (!userIdIndexResult.success) {
            return {
                success: false,
                error: `Failed to create projects user_id index: ${userIdIndexResult.error}`,
                data: null
            }
        }
        
        const activeIndexResult = await query(`
            CREATE INDEX IF NOT EXISTS idx_projects_active ON projects(is_active);
        `)
        
        if (!activeIndexResult.success) {
            return {
                success: false,
                error: `Failed to create projects active index: ${activeIndexResult.error}`,
                data: null
            }
        }
        
        const priceIndexResult = await query(`
            CREATE INDEX IF NOT EXISTS idx_projects_price ON projects(price);
        `)
        
        if (!priceIndexResult.success) {
            return {
                success: false,
                error: `Failed to create projects price index: ${priceIndexResult.error}`,
                data: null
            }
        }
        
        console.log('✅ Projects table created successfully')
        return {
            success: true,
            error: null,
            data: true
        }
    } catch (error) {
        console.error('❌ Error creating projects table:', error)
        return {
            success: false,
            error: error.message || 'Failed to create projects table',
            data: null
        }
    }
}

/**
 * Run all migrations
 * @returns {Promise<{success: boolean, error: string|null, data?: boolean}>} Migration result
 */
export const runMigrations = async () => {
    console.log('🚀 Running database migrations...')
    
    try {
        const usersResult = await createUsersTable()
        if (!usersResult.success) {
            return {
                success: false,
                error: `Users table migration failed: ${usersResult.error}`,
                data: null
            }
        }
        
        const sessionsResult = await createSessionsTable()
        if (!sessionsResult.success) {
            return {
                success: false,
                error: `Sessions table migration failed: ${sessionsResult.error}`,
                data: null
            }
        }
        
        const projectsResult = await createProjectsTable()
        if (!projectsResult.success) {
            return {
                success: false,
                error: `Projects table migration failed: ${projectsResult.error}`,
                data: null
            }
        }
        
        console.log('✅ All migrations completed successfully')
        return {
            success: true,
            error: null,
            data: true
        }
    } catch (error) {
        console.error('❌ Migration failed:', error)
        return {
            success: false,
            error: error.message || 'Migration process failed',
            data: null
        }
    }
}
