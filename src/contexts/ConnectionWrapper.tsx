import { ReactNode, useContext } from 'react';
import { AppProps } from 'next/app';
import {
  RainbowKitProvider,
  darkTheme,
  getDefaultWallets,
  lightTheme,
} from '@rainbow-me/rainbowkit';
import axios from 'axios';
import { SessionProvider } from 'next-auth/react';
import { Chain, WagmiConfig, configureChains, createClient } from 'wagmi';
import { jsonRpcProvider } from 'wagmi/providers/jsonRpc';
import useCachedState from '@/hooks/useCachedState';
import { getBackendApiUrl } from '@/utils/backend';
import { GetSiweMessageOptions, RainbowKitSiweNextAuthProvider } from '@/utils/rainbowSIWEmod';
import SettingsContext from './SettingsContext';

const ConnectionWrapper = ({ children, pageProps }: any) => {
  /* Use a fork url cached in the browser localStorage, else use the .env value */
  const [forkUrl] = useCachedState(
    'forkUrl',
    `https://rpc.tenderly.co/fork/${process.env.NEXT_PUBLIC_TENDERLY_FORK_ID}`
  );

  const {
    settings: { experimentalUi },
  } = useContext(SettingsContext);

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
    /* Async call to retrieve a custom nonce */
    const backendUrl = getBackendApiUrl();
    const resp = await axios.get(`${backendUrl}/nonce`, { withCredentials: true });
    const nonce = resp.data as string;
    return nonce;
  };

  const getSigninCallback = async (message: string, signature: string) => {
    const backendUrl = getBackendApiUrl();
    const result = await axios.post(
      `${backendUrl}/login`,
      {
        eip4361: message,
        signature,
      },
      { withCredentials: true }
    );
    return !!result.data;
  };

  const getSignoutCallback = async () => {
    const backendUrl = getBackendApiUrl();
    await axios.post(`${backendUrl}/logout`, {}, { withCredentials: true });
  };

  return (
    <WagmiConfig client={wagmiClient}>
      <SessionProvider refetchInterval={0} session={pageProps?.session}>
        <RainbowKitSiweNextAuthProvider
          getCustomNonce={getCustomNonce}
          getSiweMessageOptions={getSiweMessageOptions}
          getSigninCallback={getSigninCallback}
          getSignoutCallback={getSignoutCallback}
        >
          <RainbowKitProvider
            chains={chains}
            theme={
              experimentalUi
                ? darkTheme({ accentColor: '#1f2937' })
                : lightTheme({ accentColor: '#1f2937' })
            }
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
