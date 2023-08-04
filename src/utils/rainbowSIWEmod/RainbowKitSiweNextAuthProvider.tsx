import React, { ReactNode, useCallback, useEffect, useMemo } from 'react';
import { useRouter } from 'next/router';
import {
  RainbowKitAuthenticationProvider,
  createAuthenticationAdapter,
} from '@rainbow-me/rainbowkit';
import { getCsrfToken, signIn, signOut, useSession } from 'next-auth/react';
import { SiweMessage } from 'siwe';
import { useAccount } from 'wagmi';

type UnconfigurableMessageOptions = {
  address: string;
  chainId: number;
  nonce: string;
};

type ConfigurableMessageOptions = Partial<Omit<SiweMessage, keyof UnconfigurableMessageOptions>> & {
  [Key in keyof UnconfigurableMessageOptions]?: never;
};

export type GetSiweMessageOptions = () => ConfigurableMessageOptions;

interface RainbowKitSiweNextAuthProviderProps {
  enabled?: boolean;
  getSiweMessageOptions?: GetSiweMessageOptions;
  getCustomNonce?: () => Promise<string | undefined>;
  getSigninCallback?: (message: string, signature: string) => Promise<boolean>;
  getSignoutCallback?: () => Promise<void>;
  children: ReactNode;
}

//console.log(window.location.host);

export function RainbowKitSiweNextAuthProvider({
  children,
  enabled,
  getSiweMessageOptions,
  getCustomNonce,
  getSigninCallback,
  getSignoutCallback,
}: RainbowKitSiweNextAuthProviderProps) {
  const { data: session, status } = useSession();
  const { address: account } = useAccount();
  const router = useRouter();

  const signoutSequence = useCallback(async () => {
    // signout on backend first, to ensure session cookies get cleared
    // prior to any frontend hooks firing
    if (getSignoutCallback) {
      await getSignoutCallback();
      router.push('/');
    }
    await signOut({ redirect: false });
  }, [getSignoutCallback]);

  /* force logout if account changes */
  useEffect(() => {
    if (session && session.user?.name !== account) {
      console.log('detected account switch, logging out', session, account);
      signoutSequence();
    }
  }, [account, session, signoutSequence]);

  const adapter = useMemo(
    () =>
      createAuthenticationAdapter({
        createMessage: ({ address, chainId, nonce }) => {
          const defaultConfigurableOptions: ConfigurableMessageOptions = {
            domain: window.location.host,
            statement: 'Sign in with Ethereum to the app.',
            uri: window.location.origin,
            version: '1',
          };

          const unconfigurableOptions: UnconfigurableMessageOptions = {
            address,
            chainId,
            nonce,
          };

          return new SiweMessage({
            ...defaultConfigurableOptions,

            // Spread custom SIWE message options provided by the consumer
            ...getSiweMessageOptions?.(),

            // Spread unconfigurable options last so they can't be overridden
            ...unconfigurableOptions,
          });
        },

        getMessageBody: ({ message }) => message.prepareMessage(),

        getNonce: async () => {
          const nonce = getCustomNonce ? await getCustomNonce() : await getCsrfToken();
          if (!nonce) throw new Error();
          return nonce;
        },

        signOut: signoutSequence,

        verify: async ({ message, signature }) => {
          const messageJson = JSON.stringify(message);
          // signin on backend first, so that any issues there will not lead to
          // an inconsistent signin state with frontend. also, this ensures
          // session cookies are set by backend prior to any frontend hooks
          // firing
          if (getSigninCallback) {
            const result = await getSigninCallback(messageJson, signature);
            if (!result) {
              return false;
            }
          }
          const response = await signIn('credentials', {
            message: messageJson,
            redirect: false,
            signature,
          });
          return response?.ok ?? false;
        },
      }),
    [getCustomNonce, getSigninCallback, getSignoutCallback, getSiweMessageOptions]
  );

  return (
    <RainbowKitAuthenticationProvider adapter={adapter} enabled={enabled} status={status}>
      {children}
    </RainbowKitAuthenticationProvider>
  );
}
