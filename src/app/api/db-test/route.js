import { NextResponse } from 'next/server'
import { testConnection, query } from '@/lib'

/**
 * Handle GET requests to test database connection
 * @returns {Promise<NextResponse>} The response with connection status
 */
export async function GET() {
    try {
        // Test basic connection
        const isConnected = await testConnection()
        
        if (!isConnected) {
            return NextResponse.json(
                { success: false, error: 'Database connection failed' },
                { status: 500 }
            )
        }
        
        // Get database info
        const dbInfo = await query(`
            SELECT 
                version() as db_version,
                current_database() as db_name,
                current_user as db_user,
                inet_server_addr() as server_addr,
                inet_server_port() as server_port,
                NOW() as current_time
        `)
        
        if (!dbInfo.success) {
            return NextResponse.json(
                { success: false, error: 'Failed to get database info' },
                { status: 500 }
            )
        }
        
        return NextResponse.json({
            success: true,
            message: 'Database connection successful',
            data: {
                connected: true,
                ...dbInfo.data.rows[0]
            }
        })
        
    } catch (error) {
        console.error('Database test error:', error)
        return NextResponse.json(
            { 
                success: false, 
                error: 'Database connection error',
                details: error.message 
            },
            { status: 500 }
        )
    }
}
