/**
 * Form validation utilities
 */

/**
 * @typedef {Object} ValidationResult
 * @property {boolean} isValid - Whether the validation passed
 * @property {string} [error] - Error message if validation failed
 */

/**
 * Validate email format
 * @param {string} email - Email to validate
 * @returns {ValidationResult} Validation result
 */
export function validateEmail(email) {
    if (!email) {
        return { isValid: false, error: 'Email is required' }
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
        return { isValid: false, error: 'Please enter a valid email address' }
    }
    
    if (email.length > 255) {
        return { isValid: false, error: 'Email is too long' }
    }
    
    return { isValid: true }
}

/**
 * Validate password strength
 * @param {string} password - Password to validate
 * @returns {ValidationResult} Validation result
 */
export function validatePassword(password) {
    if (!password) {
        return { isValid: false, error: 'Password is required' }
    }
    
    if (password.length < 8) {
        return { isValid: false, error: 'Password must be at least 8 characters long' }
    }
    
    if (password.length > 128) {
        return { isValid: false, error: 'Password is too long' }
    }
    
    if (!/(?=.*[a-z])/.test(password)) {
        return { isValid: false, error: 'Password must contain at least one lowercase letter' }
    }
    
    if (!/(?=.*[A-Z])/.test(password)) {
        return { isValid: false, error: 'Password must contain at least one uppercase letter' }
    }
    
    if (!/(?=.*\d)/.test(password)) {
        return { isValid: false, error: 'Password must contain at least one number' }
    }
    
    return { isValid: true }
}

/**
 * Validate name format
 * @param {string} name - Name to validate
 * @returns {ValidationResult} Validation result
 */
export function validateName(name) {
    if (!name) {
        return { isValid: true } // Name is optional
    }
    
    if (name.length < 2) {
        return { isValid: false, error: 'Name must be at least 2 characters long' }
    }
    
    if (name.length > 100) {
        return { isValid: false, error: 'Name is too long' }
    }
    
    if (!/^[a-zA-Z\s'-]+$/.test(name)) {
        return { isValid: false, error: 'Name can only contain letters, spaces, hyphens, and apostrophes' }
    }
    
    return { isValid: true }
}

/**
 * Validate signup form data
 * @param {Object} formData - Form data to validate
 * @param {string} formData.email - User email
 * @param {string} formData.password - User password
 * @param {string} [formData.name] - User name
 * @returns {ValidationResult} Validation result
 */
export function validateSignupForm(formData) {
    const emailValidation = validateEmail(formData.email)
    if (!emailValidation.isValid) {
        return emailValidation
    }
    
    const passwordValidation = validatePassword(formData.password)
    if (!passwordValidation.isValid) {
        return passwordValidation
    }
    
    const nameValidation = validateName(formData.name)
    if (!nameValidation.isValid) {
        return nameValidation
    }
    
    return { isValid: true }
}

/**
 * Validate login form data
 * @param {Object} formData - Form data to validate
 * @param {string} formData.email - User email
 * @param {string} formData.password - User password
 * @returns {ValidationResult} Validation result
 */
export function validateLoginForm(formData) {
    if (!formData.email) {
        return { isValid: false, error: 'Email is required' }
    }
    
    if (!formData.password) {
        return { isValid: false, error: 'Password is required' }
    }
    
    const emailValidation = validateEmail(formData.email)
    if (!emailValidation.isValid) {
        return emailValidation
    }
    
    return { isValid: true }
}

