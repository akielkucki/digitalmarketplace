/**
 * @typedef {import('next/server').NextRequest} NextRequest
 */

/**
 * Middleware function to handle requests
 * @param {NextRequest} request - The incoming request
 */
export function middleware(request) {
    console.log(request)
}
