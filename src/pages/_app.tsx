import type { AppProps } from 'next/app';
import { CenterProvider } from '@center-inc/react';
import { RainbowKitProvider, getDefaultWallets, lightTheme } from '@rainbow-me/rainbowkit';
import '@rainbow-me/rainbowkit/styles.css';
import { WagmiConfig, configureChains, createClient, goerli } from 'wagmi';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { publicProvider } from 'wagmi/providers/public';
import { ChatContextProvider } from '@/contexts/ChatContext';
import { ModalContextProvider } from '@/contexts/ModalContext';
import '@/styles/globals.css';

const { chains, provider } = configureChains(
  [goerli],
  [publicProvider(), alchemyProvider({ apiKey: process.env.NEXT_PUBLIC_ALCHEMY_API_KEY })]
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

export default function App({ Component, pageProps }: AppProps) {
  return (
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
  );
}
