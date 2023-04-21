import { ReactNode } from 'react';
import { AppProps } from 'next/app';
import { RainbowKitProvider, getDefaultWallets, lightTheme } from '@rainbow-me/rainbowkit';
import {
  GetSiweMessageOptions,
  RainbowKitSiweNextAuthProvider,
} from '@rainbow-me/rainbowkit-siwe-next-auth';
import { SessionProvider } from 'next-auth/react';
import { Chain, WagmiConfig, configureChains, createClient } from 'wagmi';
import { jsonRpcProvider } from 'wagmi/providers/jsonRpc';
import useCachedState from '@/hooks/useCachedState';

const ConnectionWrapper = ({children, pageProps }: any) => {
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
    statement: 'Sign in to my RainbowKit app',
  });

  return (
    <WagmiConfig client={wagmiClient}>
      <SessionProvider refetchInterval={0} session={pageProps?.session}>
        <RainbowKitSiweNextAuthProvider getSiweMessageOptions={getSiweMessageOptions}>
          <RainbowKitProvider
            chains={chains}
            theme={lightTheme({ accentColor: '#1f2937' })}
            showRecentTransactions={true}
          >
            {children}
          </RainbowKitProvider>
        </RainbowKitSiweNextAuthProvider>
      </SessionProvider>
    </WagmiConfig>
  );
};

export default ConnectionWrapper;
