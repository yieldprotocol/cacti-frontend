import React from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { RainbowKitProvider, darkTheme, getDefaultWallets } from '@rainbow-me/rainbowkit';
import '@rainbow-me/rainbowkit/styles.css';
import { Chain, WagmiConfig, configureChains, createClient } from 'wagmi';
import { jsonRpcProvider } from 'wagmi/providers/jsonRpc';

/* Use a fork url cached in the browser localStorage, else use the .env value */
const [forkUrl] = `https://rpc.tenderly.co/fork/${process.env.NEXT_PUBLIC_TENDERLY_FORK_ID}`;

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
  appName: 'cacti storybook',
  chains,
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
});

const ConnectionMock = (props: any) => {
  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider
        chains={chains}
        theme={darkTheme({ accentColor: '#1f2937' })}
        showRecentTransactions={true}
      >
        {props.children}
      </RainbowKitProvider>
    </WagmiConfig>
  );
};

export const Decorators = [
  (Story) => (
    <ConnectionMock>
      <ToastContainer
        position="top-right"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <Story />
    </ConnectionMock>
  ),
];
