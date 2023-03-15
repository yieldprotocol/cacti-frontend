import { QueryClient, QueryClientProvider } from 'react-query';
import type { AppProps } from 'next/app';
import { CenterProvider } from '@center-inc/react';
import { RainbowKitProvider, getDefaultWallets, lightTheme } from '@rainbow-me/rainbowkit';
import '@rainbow-me/rainbowkit/styles.css';
import { Chain, WagmiConfig, configureChains, createClient, mainnet } from 'wagmi';
import { jsonRpcProvider } from 'wagmi/providers/jsonRpc';
import { ChatContextProvider } from '@/contexts/ChatContext';
import { ModalContextProvider } from '@/contexts/ModalContext';
import '@/styles/globals.css';

const mainnetForkURL = `https://rpc.tenderly.co/fork/${process.env.NEXT_PUBLIC_TENDERLY_FORK_ID}`;
const mainnetFork = {
  id: 36963,
  name: 'Mainnet Fork',
  network: 'mainnetFork',
  nativeCurrency: {
    decimals: 18,
    name: 'Ether',
    symbol: 'ETH',
  },
  rpcUrls: {
    public: { http: [mainnetForkURL] },
    default: { http: [mainnetForkURL] },
  },
} as Chain;

const { chains, provider } = configureChains(
  [mainnetFork, mainnet],
  [
    jsonRpcProvider({
      priority: 0,
      rpc: (chain) => ({
        http: mainnetForkURL,
      }),
    }),
  ]
);

const { connectors } = getDefaultWallets({
  appName: 'My RainbowKit App',
  chains,
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
});

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <WagmiConfig client={wagmiClient}>
        <RainbowKitProvider chains={chains} theme={lightTheme({ accentColor: '#2563eb' })}>
          <CenterProvider>
            <ModalContextProvider>
              <ChatContextProvider>
                <Component {...pageProps} />
              </ChatContextProvider>
            </ModalContextProvider>
          </CenterProvider>
        </RainbowKitProvider>
      </WagmiConfig>
    </QueryClientProvider>
  );
}
