import { ReactNode } from 'react';
import { AppProps } from 'next/app';
import { AuthenticationStatus, RainbowKitAuthenticationProvider, RainbowKitProvider, getDefaultWallets, lightTheme } from '@rainbow-me/rainbowkit';
import { SessionProvider, getCsrfToken } from 'next-auth/react';
import { generateNonce } from 'siwe';
import { Chain, WagmiConfig, configureChains, createClient } from 'wagmi';
import { jsonRpcProvider } from 'wagmi/providers/jsonRpc';
import useCachedState from '@/hooks/useCachedState';
import { GetSiweMessageOptions, CustomAuthProvider } from '@/utils/rainbowSIWEmod';

const ConnectionWrapper = ({ children, pageProps }: any) => {
  /* Use a fork url cached in the browser localStorage, else use the .env value */
  const [forkUrl] = useCachedState(
    'forkUrl',
    `https://rpc.tenderly.co/fork/${process.env.NEXT_PUBLIC_TENDERLY_FORK_ID}`
  );

  const mainnetFork = {
    id: 1,
    name: 'Mainnet Fork',
    network: 'mainnetFork',
    nativeCurrency: {
      decimals: 18,
      name: 'Ether',
      symbol: 'ETH',
    },
    rpcUrls: {
      public: { http: [forkUrl] },
      default: { http: [forkUrl] },
    },
  } as Chain;

  const { chains, provider } = configureChains(
    [mainnetFork],
    [
      jsonRpcProvider({
        priority: 0,
        rpc: (chain) => ({
          http: forkUrl,
        }),
      }),
    ]
  );

  const { connectors } = getDefaultWallets({
    appName: 'chatweb3 app',
    chains,
  });

  const wagmiClient = createClient({
    autoConnect: true,
    connectors,
    provider,
  });

  const getSiweMessageOptions: GetSiweMessageOptions = () => ({
    statement: 'Sign me in to wc3 app',
  });

  const getCustomNonce = async () => {
    console.log('Existing Session: ', pageProps?.session);

    /* add in any async call here to add a custom nonce eg. server call */
    const nonce = await generateNonce(); //TODO add in the call to the backend server here
    return nonce;
  };

  return (
    <WagmiConfig client={wagmiClient}>
      <SessionProvider refetchInterval={0} session={pageProps?.session}>
        <CustomAuthProvider
          getCustomNonce={getCustomNonce}
          getSiweMessageOptions={getSiweMessageOptions}
        >
          <RainbowKitProvider
            chains={chains}
            theme={lightTheme({ accentColor: '#1f2937' })}
            showRecentTransactions={true}
          >
            {children}
          </RainbowKitProvider>
        </CustomAuthProvider>
      </SessionProvider>
    </WagmiConfig>
  );
};

export default ConnectionWrapper;
