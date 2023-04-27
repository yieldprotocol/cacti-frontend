import NextAuth, { User } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { SiweMessage } from 'siwe';
import { getBackendUrl } from '@/utils/backend';

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
      },
      async authorize(credentials) {
        try {
          const parsedCredentials = JSON.parse(credentials?.message || '{}');

          /* DEBUGGING Log the creds + sig */
          console.log('creds', parsedCredentials);
          console.log('signature: ', credentials?.signature);

          const backendUrl = getBackendUrl();

          /* Use the creds to create a SIWE message */
          const message = new SiweMessage(parsedCredentials);

          /* Prepare the message for validation */
          const preparedMessage = message.prepareMessage();

          /* Send prepared message back to the backend for validation */
          const verified = await message.verify({
            signature: credentials?.signature || '',
          });
          // const verify_res = await fetch(`${backendUrl}/verify`, {
          //   credentials: 'include',
          // });

          if (verified.success) {
            console.log('Access verified:', parsedCredentials.address);
            return {
              id: parsedCredentials.address,
              signature: credentials?.signature,
              credentials: parsedCredentials,
            };
          }

          return null;

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
      /* This is step 1 of a hack to pass the info from the credentials provider to the session */
      async signIn({ user, account }) {
        account!.signature = (user as any).signature;
        account!.credentials = (user as any).credentials;
        return true
      },
      /* This is step 2:  append the token with the updated account info  */
      async jwt({ token, account }) {
        if (account) {
          token.signature = account.signature
          token.credentials = account.credentials
        }
        return token
      },
      async session({ session, token, user }: { session: any; token: any; user: any }) {
        session.address = token.sub;
        session.user.name = token.sub;
        session.jti = token.jti;
        session.signature = token.signature;
        session.credentials = token.credentials;
        console.log('Session:', session);
        return session;
      },
    },
    
  });
}
