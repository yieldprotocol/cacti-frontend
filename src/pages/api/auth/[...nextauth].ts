import NextAuth, { Session } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { getCsrfToken } from "next-auth/react"
import { SiweMessage } from "siwe"

// For more information on each option (and a full list of options) go to
// https://next-auth.js.org/configuration/options
export default async function auth(req: any, res: any) {

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

          
          
          // const res = await fetch(`${BACKEND_ADDR!}/nonce`|| '', {
          //   credentials: 'include',
          // });

            const message = new SiweMessage({
                domain: nextAuthUrl.host,
                address: siwe.address,
                statement: credentials?.message,
                uri: origin,
                version: '1',
                chainId: 1,
                nonce: await res.text()
            });

            console.log( message.prepareMessage())

            // console.log(message.prepareMessage());
            // return message.prepareMessage();

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
    providers,
    session: {
      strategy: "jwt",
    },
    secret: process.env.NEXTAUTH_SECRET,
    callbacks: {
      async session({ session, token, user }: { session: any; token: any, user:any }) { 
        session.address = token.sub
        session.user.name = token.sub
        session.jti = token.jti
        console.log('Session:', session)
        return session 
      },

    },
  })
}