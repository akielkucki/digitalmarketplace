import { Pool } from 'pg'
import { DB_CONFIG } from '@/constants/index.mjs'

/**
 * Database configuration from centralized constants
 */
const dbConfig = {
  ...DB_CONFIG,
  password: process.env.DB_PASSWORD,
  ssl: process.env.DB_SSL_MODE === 'require' ? { rejectUnauthorized: false } : false,
}

/**
 * Global PostgreSQL connection pool
 * Using a singleton pattern to reuse connections across requests
 */
let pool

/**
 * Get or create the database connection pool
 * @returns {Pool} PostgreSQL connection pool
 */
export function getDbPool() {
  if (!pool) {
    pool = new Pool(dbConfig)
    
    // Handle pool errors
    pool.on('error', (err) => {
      console.error('Unexpected error on idle client', err)
      process.exit(-1)
    })
    
    // Log successful connection
    pool.on('connect', () => {
      console.log('🗄️  Database connected successfully')
    })
  }
  
  return pool
}

/**
 * Execute a database query
 * @param {string} text - SQL query text
 * @param {any[]} [params] - Query parameters
 * @returns {Promise<any>} Query result
 */
export async function query(text, params = []) {
  const pool = getDbPool()
  const start = Date.now()
  
  try {
    const result = await pool.query(text, params)
    const duration = Date.now() - start
    
    console.log('🔍 Query executed', { 
      text: text.substring(0, 100) + (text.length > 100 ? '...' : ''),
      duration: `${duration}ms`,
      rows: result.rowCount 
    })
    
    return result
  } catch (error) {
    console.error('❌ Database query error:', error)
    throw error
  }
}

/**
 * Get a client from the pool for transactions
 * @returns {Promise<import('pg').PoolClient>} Database client
 */
export async function getClient() {
  const pool = getDbPool()
  return await pool.connect()
}

/**
 * Test database connection
 * @returns {Promise<boolean>} Connection status
 */
export async function testConnection() {
  try {
    const result = await query('SELECT NOW() as current_time')
    console.log('✅ Database connection test successful:', result.rows[0])
    return true
  } catch (error) {
    console.error('❌ Database connection test failed:', error.message)
    return false
  }
}

/**
 * Close the database connection pool
 * @returns {Promise<void>}
 */
export async function closePool() {
  if (pool) {
    await pool.end()
    pool = null
    console.log('🔒 Database connection pool closed')
  }
}
