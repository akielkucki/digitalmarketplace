/**
 * Common type definitions for the application
 */

/**
 * @typedef {Object} User
 * @property {string} id - User ID
 * @property {string} email - User email
 * @property {string} [name] - User name
 * @property {string} [role] - User role
 * @property {Date} createdAt - Account creation date
 * @property {Date} updatedAt - Last update date
 */

/**
 * @typedef {Object} AuthUser
 * @property {string} sub - Subject identifier
 * @property {string} [email] - User email
 * @property {string} [role] - User role
 * @property {number} iat - Issued at timestamp
 * @property {number} exp - Expiration timestamp
 */

/**
 * @typedef {Object} APIResponse
 * @property {boolean} success - Whether the request was successful
 * @property {string} [message] - Response message
 * @property {any} [data] - Response data
 * @property {string} [error] - Error message if applicable
 */

export {}
