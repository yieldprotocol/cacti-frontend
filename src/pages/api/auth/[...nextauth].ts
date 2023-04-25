import { getBackendUrl } from '@/utils/backend';
import NextAuth, { Session } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { getCsrfToken } from 'next-auth/react';
import { SiweMessage } from 'siwe';

// For more information on each option (and a full list of options) go to
// https://next-auth.js.org/configuration/options
export default async function auth(req: any, res: any) {
  const providers = [

    CredentialsProvider({
      name: 'Ethereum',
      credentials: {
        message: {
          label: 'Message',
          type: 'text',
          placeholder: '0x0',
        },
        signature: {
          label: 'Signature',
          type: 'text',
          placeholder: '0x0',
        },
        // address: {
        //   label: 'Address',
        //   type: 'text',
        //   placeholder: '0x0',
        // },
      },
      async authorize(credentials) {
        try {
          // const siwe = new SiweMessage(JSON.parse(credentials?.message || "{}"))
          const nextAuthUrl = new URL(process.env.NEXTAUTH_URL!);
          const backendUrl = getBackendUrl();

          // await for a random nonce from the backend
          const nonce_res = await fetch(`${backendUrl}/nonce`, {
            credentials: 'include',
          });

          // use the nonce to create a SIWE message
          const message = new SiweMessage({
            domain: nextAuthUrl.host,
            address: '', // '' credentials?.address,
            statement: credentials?.message,
            uri: origin,
            version: '1',
            chainId: 1,
            nonce: await nonce_res.text(),
          });
          const preparedMessage = message.prepareMessage();
          console.log(message.prepareMessage());

          // send that prepared message back to the backend for validation
          const verify_res = await fetch(`${backendUrl}/verify`, {
            credentials: 'include',
          });
          console.log(verify_res);

          if (true) {
            return {
              id: '', //credentials?.address,
            };
          }

          // return null;
        } catch (e) {
          return null;
        }
      },
    }),
  ];

  const isDefaultSigninPage = req.method === 'GET' && req.query.nextauth.includes('signin');

  // Hide Sign-In with Ethereum from default sign page
  if (isDefaultSigninPage) {
    providers.pop();
  }

  return await NextAuth(req, res, {
    providers,
    session: {
      strategy: 'jwt',
    },
    secret: process.env.NEXTAUTH_SECRET,
    callbacks: {
      async session({ session, token, user }: { session: any; token: any; user: any }) {
        session.address = token.sub;
        session.user.name = token.sub;
        session.jti = token.jti;
        console.log('Session:', session);
        return session;
      },
    },
  });
}
