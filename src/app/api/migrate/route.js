import { NextResponse } from 'next/server'
import { runMigrations } from '@/lib'

/**
 * Handle POST requests to run database migrations
 * @returns {Promise<NextResponse>} The response with migration status
 */
export async function POST() {
    try {
        // Only allow migrations in development
        if (process.env.NODE_ENV === 'production') {
            return NextResponse.json(
                { success: false, error: 'Migrations not allowed in production' },
                { status: 403 }
            )
        }
        
        const migrationResult = await runMigrations()
        
        if (!migrationResult.success) {
            return NextResponse.json(
                { 
                    success: false, 
                    error: migrationResult.error,
                },
                { status: 500 }
            )
        }
        
        return NextResponse.json({
            success: true,
            message: 'Database migrations completed successfully'
        })
        
    } catch (error) {
        console.error('Migration error:', error)
        return NextResponse.json(
            { 
                success: false, 
                error: 'Migration failed',
                details: error.message 
            },
            { status: 500 }
        )
    }
}
