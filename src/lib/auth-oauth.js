import { signIn } from 'next-auth/react'

/**
 * @typedef {Object} AuthResult
 * @property {boolean} success - Whether the operation succeeded
 * @property {string|null} error - Error message if failed
 * @property {Object|null} data - Additional data if successful
 */

/**
 * Handle Google OAuth sign in
 * @param {string} [callbackUrl='/dashboard'] - URL to redirect after successful sign in
 * @returns {Promise<AuthResult>} Sign in result
 */
export async function handleGoogleSignIn(callbackUrl = '/dashboard') {
  try {
    const result = await signIn('google', { 
      callbackUrl,
      redirect: false 
    })
    
    if (result?.error) {
      return {
        success: false,
        error: result.error,
        data: null
      }
    }
    
    return {
      success: true,
      error: null,
      data: { provider: 'google', callbackUrl }
    }
  } catch (error) {
    console.error('Google sign in error:', error)
    return {
      success: false,
      error: error?.message || 'Failed to sign in with Google',
      data: null
    }
  }
}

/**
 * Handle Discord OAuth sign in
 * @param {string} [callbackUrl='/dashboard'] - URL to redirect after successful sign in
 * @returns {Promise<AuthResult>} Sign in result
 */
export async function handleDiscordSignIn(callbackUrl = '/dashboard') {
  try {
    const result = await signIn('discord', { 
      callbackUrl,
      redirect: false 
    })
    
    if (result?.error) {
      return {
        success: false,
        error: result.error,
        data: null
      }
    }
    
    return {
      success: true,
      error: null,
      data: { provider: 'discord', callbackUrl }
    }
  } catch (error) {
    console.error('Discord sign in error:', error)
    return {
      success: false,
      error: error?.message || 'Failed to sign in with Discord',
      data: null
    }
  }
}

/**
 * Handle GitHub OAuth sign in
 * @param {string} [callbackUrl='/dashboard'] - URL to redirect after successful sign in
 * @returns {Promise<AuthResult>} Sign in result
 */
export async function handleGitHubSignIn(callbackUrl = '/dashboard') {
  try {
    const result = await signIn('github', { 
      callbackUrl,
      redirect: false 
    })
    
    if (result?.error) {
      return {
        success: false,
        error: result.error,
        data: null
      }
    }
    
    return {
      success: true,
      error: null,
      data: { provider: 'github', callbackUrl }
    }
  } catch (error) {
    console.error('GitHub sign in error:', error)
    return {
      success: false,
      error: error?.message || 'Failed to sign in with GitHub',
      data: null
    }
  }
}

/**
 * Generic OAuth sign in handler
 * @param {string} provider - OAuth provider name (google, discord, github)
 * @param {string} [callbackUrl='/dashboard'] - URL to redirect after successful sign in
 * @returns {Promise<AuthResult>} Sign in result
 */
export async function handleOAuthSignIn(provider, callbackUrl = '/dashboard') {
  switch (provider) {
    case 'google':
      return handleGoogleSignIn(callbackUrl)
    case 'discord':
      return handleDiscordSignIn(callbackUrl)
    case 'github':
      return handleGitHubSignIn(callbackUrl)
    default:
      return {
        success: false,
        error: `Unsupported provider: ${provider}`,
        data: null
      }
  }
}
