import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import Google from "next-auth/providers/google"

export const { handlers, auth, signIn, signOut } = NextAuth({
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
  },
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID!,
      clientSecret: process.env.AUTH_GOOGLE_SECRET!,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
    Credentials({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
        id: { label: "ID", type: "text" },
        name: { label: "Name", type: "text" },
        role: { label: "Role", type: "text" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.id) {
          return null
        }

        const user = credentials as {
          id: string
          email: string
          name: string
          role: string
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, account }) {
      if (user) {
        token.role = (user.role as string) || "investor"
        token.id = user.id as string
      }
      if (account?.provider) {
        token.provider = account.provider as string
      }
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.role = (token.role as string) || "investor"
        session.user.id = token.id as string
        session.user.provider = token.provider as string | undefined
      }
      return session
    },
  },
  trustHost: true,
})
