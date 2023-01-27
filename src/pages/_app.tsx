import type { AppProps } from 'next/app';
import { RainbowKitProvider, getDefaultWallets, lightTheme } from '@rainbow-me/rainbowkit';
import '@rainbow-me/rainbowkit/styles.css';
import { WagmiConfig, configureChains, createClient, goerli } from 'wagmi';
// import { mainnet, polygon, optimism, arbitrum } from "wagmi/chains";
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { publicProvider } from 'wagmi/providers/public';
import { ChatContextProvider } from '@/contexts/ChatContext';
import '@/styles/globals.css';

const { chains, provider } = configureChains(
  [goerli],
  [publicProvider(), alchemyProvider({ apiKey: process.env.ALCHEMY_ID })]
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
        <ChatContextProvider>
          <Component {...pageProps} />
        </ChatContextProvider>
      </RainbowKitProvider>
    </WagmiConfig>
  );
}
