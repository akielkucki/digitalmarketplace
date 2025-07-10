import { NextResponse } from 'next/server'
import { APP_CONFIG } from '@/constants/index.mjs'

/**
 * Handle GET requests to the guilds API
 * @returns {Promise<NextResponse>} The response from the guilds API
 */
export async function GET() {
    try {
        const res = await fetch(`${APP_CONFIG.api.baseUrl}/api/guilds`, {
            headers: {
                'Content-Type': 'application/json',
            },
        })
        
        if (!res.ok) {
            return NextResponse.json(
                { success: false, error: 'Failed to fetch guilds' },
                { status: res.status }
            )
        }
        
        const data = await res.json()
        return NextResponse.json({ success: true, data })
    } catch (error) {
        console.error('Guilds API error:', error)
        return NextResponse.json(
            { success: false, error: 'Internal server error' },
            { status: 500 }
        )
    }
}
