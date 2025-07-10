import { query } from '@/lib/db'

/**
 * Initial database migration - Create users table
 */
export const createUsersTable = async () => {
    try {
        await query(`
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
        
        // Create index on email for faster lookups
        await query(`
            CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
        `)
        
        console.log('✅ Users table created successfully')
        return true
    } catch (error) {
        console.error('❌ Error creating users table:', error)
        throw error
    }
}

/**
 * Create sessions table for authentication
 */
export const createSessionsTable = async () => {
    try {
        await query(`
            CREATE TABLE IF NOT EXISTS sessions (
                id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
                user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
                token VARCHAR(255) UNIQUE NOT NULL,
                expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
                created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
            );
        `)
        
        // Create index on user_id and token
        await query(`
            CREATE INDEX IF NOT EXISTS idx_sessions_user_id ON sessions(user_id);
        `)
        await query(`
            CREATE INDEX IF NOT EXISTS idx_sessions_token ON sessions(token);
        `)
        
        console.log('✅ Sessions table created successfully')
        return true
    } catch (error) {
        console.error('❌ Error creating sessions table:', error)
        throw error
    }
}

/**
 * Create projects table for code selling platform
 */
export const createProjectsTable = async () => {
    try {
        await query(`
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
        
        // Create indexes
        await query(`
            CREATE INDEX IF NOT EXISTS idx_projects_user_id ON projects(user_id);
        `)
        await query(`
            CREATE INDEX IF NOT EXISTS idx_projects_active ON projects(is_active);
        `)
        await query(`
            CREATE INDEX IF NOT EXISTS idx_projects_price ON projects(price);
        `)
        
        console.log('✅ Projects table created successfully')
        return true
    } catch (error) {
        console.error('❌ Error creating projects table:', error)
        throw error
    }
}

/**
 * Run all migrations
 */
export const runMigrations = async () => {
    console.log('🚀 Running database migrations...')
    
    try {
        await createUsersTable()
        await createSessionsTable()
        await createProjectsTable()
        
        console.log('✅ All migrations completed successfully')
        return true
    } catch (error) {
        console.error('❌ Migration failed:', error)
        throw error
    }
}
