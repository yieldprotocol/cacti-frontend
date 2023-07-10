import { ReactNode, useContext } from 'react';
import Jazzicon, { jsNumberForAddress } from 'react-jazzicon';
import { AppProps } from 'next/app';
import {
  AvatarComponent,
  RainbowKitProvider,
  darkTheme,
  getDefaultWallets,
  lightTheme,
} from '@rainbow-me/rainbowkit';
import axios from 'axios';
import { Session } from 'next-auth';
import { SessionProvider } from 'next-auth/react';
import { Chain, WagmiConfig, configureChains, createClient, useEnsAvatar } from 'wagmi';
import { goerli, zkSyncTestnet } from 'wagmi/chains';
import { jsonRpcProvider } from 'wagmi/providers/jsonRpc';
import { publicProvider } from 'wagmi/providers/public';
import useCachedState from '@/hooks/useCachedState';
import { getBackendApiUrl } from '@/utils/backend';
import { GetSiweMessageOptions, RainbowKitSiweNextAuthProvider } from '@/utils/rainbowSIWEmod';
import SettingsContext from './SettingsContext';

const ConnectionWrapper = ({ children, pageProps, useSiwe = true }: any) => {
  /* Use a fork url cached in the browser localStorage, else use the .env value */
  const [forkUrl] = useCachedState(
    'forkUrl',
    `https://rpc.tenderly.co/fork/${process.env.NEXT_PUBLIC_TENDERLY_FORK_ID}`
  );
  console.log('🦄 ~ file: ConnectionWrapper.tsx:29 ~ ConnectionWrapper ~ forkUrl:', forkUrl);

  const {
    settings: { experimentalUi },
  } = useContext(SettingsContext);

  const mainnetFork = {
    id: 1,
    name: 'Mainnet Fork',
    network: 'mainnet',
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
    [mainnetFork, goerli, zkSyncTestnet],
    [publicProvider()]
  );

  const { connectors } = getDefaultWallets({
    appName: 'cacti app',
    projectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || '',
    chains,
  });

  const wagmiClient = createClient({
    autoConnect: true,
    connectors,
    provider,
  });

  const getSiweMessageOptions: GetSiweMessageOptions = () => ({
    statement: 'Sign me in to Cacti',
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

  const CustomAvatar: AvatarComponent = ({
    address,
    size,
  }: {
    address: string | `0x${string}` | undefined;
    size: number;
  }) => {
    const { data: ensImage } = useEnsAvatar({ address: address as `0x${string}` });
    return ensImage ? (
      <img alt="avatar" src={ensImage} width={size} height={size} style={{ borderRadius: 999 }} />
    ) : (
      <Jazzicon diameter={size} seed={address ? jsNumberForAddress(address) : 0} />
    );
  };

  return (
    <WagmiConfig client={wagmiClient}>
      <SessionProvider refetchInterval={0} session={pageProps?.session}>
        {useSiwe && (
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
        )}

        {!useSiwe && (
          <RainbowKitProvider
            chains={chains}
            theme={
              experimentalUi
                ? darkTheme({ accentColor: '#1f2937' })
                : lightTheme({ accentColor: '#1f2937' })
            }
            showRecentTransactions={true}
            avatar={CustomAvatar}
          >
            {children}
          </RainbowKitProvider>
        )}
      </SessionProvider>
    </WagmiConfig>
  );
};

export default ConnectionWrapper;
