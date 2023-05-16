import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
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
      },
      async authorize(credentials) {
        try {
          const parsedCredentials = JSON.parse(credentials?.message || '{}');

          /* DEBUGGING Log the creds + sig */
          // console.log('creds', parsedCredentials);
          // console.log('signature: ', credentials?.signature);

          /* Use the creds to create a SIWE message */
          const message = new SiweMessage(parsedCredentials);

          /* Verify the message clientside   */
          const verified = await message.verify({
            signature: credentials?.signature || '',
          });

          /* Store the signature and Eip with the session  -- note hack in NextAuth() callbacks */
          if (verified.success) {
            console.log('Access verified:', verified.data.address);
            return {
              id: verified.data.address,
              signature: credentials?.signature,
              eip4361: JSON.stringify(verified.data),
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
        account!.eip4361 = (user as any).eip4361;
        return true;
      },
      /* This is step 2:  append the token with the updated account info  */
      async jwt({ token, account }) {
        if (account) {
          token.signature = account.signature;
          token.eip4361 = account.eip4361;
        }
        return token;
      },
      async session({ session, token, user }: { session: any; token: any; user: any }) {
        session.address = token.sub;
        session.user.name = token.sub;
        session.jti = token.jti;
        session.signature = token.signature;
        session.eip4361 = token.eip4361;
        //console.log('Session:', session);
        return session;
      },
    },
  });
}
