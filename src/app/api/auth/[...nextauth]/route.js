import NextAuth from 'next-auth'
import Google from 'next-auth/providers/google'
import Discord from 'next-auth/providers/discord'
import GitHub from 'next-auth/providers/github'

/**
 * NextAuth v5 configuration with Google, Discord, and GitHub OAuth providers
 */
const handler = NextAuth({
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    Discord({
      clientId: process.env.DISCORD_CLIENT_ID,
      clientSecret: process.env.DISCORD_CLIENT_SECRET,
    }),
    GitHub({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    })
  ],
  pages: {
    signIn: '/auth/signin',
  },
})

export { handler as GET, handler as POST }
