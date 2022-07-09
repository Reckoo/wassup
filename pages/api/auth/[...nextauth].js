import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google";

export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: 245969997775-eb7ucvv3g9jtg6to41od7kl8clg3d89u.apps.googleusercontent.com,
      clientSecret: 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,
    }),
    // ...add more providers here
        {secret: process.env.NEXT_PUBLIC_SECRET}
  ],
})