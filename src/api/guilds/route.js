/**
 * Handle GET requests to the guilds API
 * @returns {Promise<Response>} The response from the guilds API
 */
export async function GET() {
    const res = await fetch('http://localhost:8080/api/guilds')
    return res
}
