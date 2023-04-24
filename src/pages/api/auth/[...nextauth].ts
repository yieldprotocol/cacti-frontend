import NextAuth, { Session } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { getCsrfToken } from "next-auth/react"
import { SiweMessage } from "siwe"

import { Pool } from "pg";
import PostgresAdapter from "@/utils/postgres_authAdapter";

// For more information on each option (and a full list of options) go to
// https://next-auth.js.org/configuration/options
export default async function auth(req: any, res: any) {

  const connectionString = "postgresql://localhost/chatdb"
  const client = new Pool({
    connectionString,
  });

  const providers = [

    // OAuth authentication providers...

    CredentialsProvider({
      name: "Ethereum",
      credentials: {
        message: {
          label: "Message",
          type: "text",
          placeholder: "0x0",
        },
        signature: {
          label: "Signature",
          type: "text",
          placeholder: "0x0",
        },
      },
      async authorize(credentials) {
        try {
          const siwe = new SiweMessage(JSON.parse(credentials?.message || "{}"))
          const nextAuthUrl = new URL(process.env.NEXTAUTH_URL!)
          const result = await siwe.verify({
            signature: credentials?.signature || "",
            domain: nextAuthUrl.host,
            nonce: await getCsrfToken({ req }),
          })
          if (result.success) {
            return {
              id: siwe.address,
            }
          }
          return null
        } catch (e) {
          return null
        }
      },
    }),


  ]

  const isDefaultSigninPage =
    req.method === "GET" && req.query.nextauth.includes("signin")

  // Hide Sign-In with Ethereum from default sign page
  if (isDefaultSigninPage) {
    providers.pop()
  }

  return await NextAuth(req, res, {
    // adapter: PostgresAdapter(client),
    providers,
    session: {
      strategy: "jwt",
    },
    secret: process.env.NEXTAUTH_SECRET,
    callbacks: {
      // async jwt({token, profile} : any) {
      //   profile && console.log('profile', profile )
      //   console.log('token', token )
      //   return token;
      // },

      async session({ session, token }: { session: any; token: any }) { 
        session.address = token.sub
        session.user.name = token.sub
        session.jti = token.jti
        console.log('session', session)
        return session 
      },

    },
  })
}