import NextAuth from "next-auth"
import GoogleProvider  from "next-auth/providers/google"
export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code"
        }
      },
      
      timeout: 5000,
    }),
    // ...add more providers here
  ],
  secret: process.env.AUTH_SECRET
}

export default NextAuth(authOptions)