import { useState } from 'react'

/**
 * Custom hook for form state management
 * @param {Object} initialValues - Initial form values
 * @param {Function} [onSubmit] - Submit handler function
 * @returns {Object} Form state and handlers
 */
export function useForm(initialValues = {}, onSubmit = null) {
    const [values, setValues] = useState(initialValues)
    const [errors, setErrors] = useState({})
    const [isSubmitting, setIsSubmitting] = useState(false)

    /**
     * Handle input change
     * @param {Event | string} e - Event object or field name
     * @param {string} [value] - Value for field (if first param is field name)
     */
    const handleChange = (e, value) => {
        let name, val

        if (typeof e === 'string') {
            name = e
            val = value
        } else {
            const target = /** @type {HTMLInputElement} */ (e.target)
            name = target.name
            val = target.value
        }

        setValues(prev => ({
            ...prev,
            [name]: val
        }))

        // Clear error for this field when user starts typing
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }))
        }
    }

    /**
     * Set field error
     * @param {string} field - Field name
     * @param {string} error - Error message
     */
    const setFieldError = (field, error) => {
        setErrors(prev => ({
            ...prev,
            [field]: error
        }))
    }

    /**
     * Clear all errors
     */
    const clearErrors = () => {
        setErrors({})
    }

    /**
     * Reset form to initial values
     */
    const reset = () => {
        setValues(initialValues)
        setErrors({})
        setIsSubmitting(false)
    }

    /**
     * Handle form submission
     * @param {Event} e - Form submit event
     */
    const handleSubmit = async (e) => {
        e.preventDefault()
        
        if (isSubmitting || !onSubmit) return

        setIsSubmitting(true)
        
        try {
            await onSubmit(values)
        } catch (error) {
            console.error('Form submission error:', error)
        } finally {
            setIsSubmitting(false)
        }
    }

    return {
        values,
        errors,
        isSubmitting,
        handleChange,
        handleSubmit,
        setFieldError,
        clearErrors,
        reset,
        setValues,
        setErrors
    }
}
