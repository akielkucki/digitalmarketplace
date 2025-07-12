'use client'

import { SessionProvider } from 'next-auth/react'

/**
 * Session provider wrapper component for NextAuth
 * @param {Object} props
 * @param {React.ReactNode} props.children - Child components
 * @param {Object} [props.session] - Session object from getServerSession
 * @returns {React.ReactElement} Session provider wrapper
 */
export default function NextAuthSessionProvider({ children, session }) {
  return (
    <SessionProvider session={session}>
      {children}
    </SessionProvider>
  )
}
