import { ReactNode, useContext } from 'react';
import Jazzicon, { jsNumberForAddress } from 'react-jazzicon';
import { useQueryClient } from 'react-query';
import { AppProps } from 'next/app';
import {
  AvatarComponent,
  DisclaimerComponent,
  RainbowKitProvider,
  darkTheme,
  getDefaultWallets,
  lightTheme,
} from '@rainbow-me/rainbowkit';
import axios from 'axios';
import { Chain, WagmiConfig, configureChains, createClient, useEnsAvatar } from 'wagmi';
import { arbitrum, goerli, zkSyncTestnet } from 'wagmi/chains';
import { jsonRpcProvider } from 'wagmi/providers/jsonRpc';
import { publicProvider } from 'wagmi/providers/public';
import useCachedState from '@/hooks/useCachedState';
import { getBackendApiUrl } from '@/utils/backend';
import { GetSiweMessageOptions, RainbowKitSiweNextAuthProvider } from '@/utils/rainbowSIWEmod';
import SettingsContext from './SettingsContext';

const ConnectionWrapper = ({ children, useSiwe = true }: any) => {
  const queryClient = useQueryClient();

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

  const arbitrumFork = {
    ...arbitrum,
    name: 'Arbitrum One Fork',
    rpcUrls: {
      public: { http: [arbitrum.rpcUrls.public.http[0]] },
      default: { http: [process.env.ARBITRUM_FORK_URL] },
    },
  } as Chain;

  const { chains, provider } = configureChains(
    [mainnetFork, goerli, zkSyncTestnet, arbitrumFork],
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

  const Disclaimer: DisclaimerComponent = ({ Text, Link }) => (
    <Text>
      By connecting my wallet, I agree to the{' '}
      <Link href="https://cacti.finance/terms/">Terms of Service</Link> and acknowledge I have read
      and understand the protocol <Link href="https://cacti.finance/privacy/">Privacy Policy</Link>.
    </Text>
  );

  return (
    <WagmiConfig client={wagmiClient}>
      {useSiwe && (
        <RainbowKitSiweNextAuthProvider
          getCustomNonce={getCustomNonce}
          getSiweMessageOptions={getSiweMessageOptions}
          getSigninCallback={getSigninCallback}
          getSignoutCallback={getSignoutCallback}
        >
          <RainbowKitProvider
            appInfo={{
              appName: 'Cacti',
              disclaimer: Disclaimer,
            }}
            chains={chains}
            theme={
              experimentalUi
                ? darkTheme({ accentColor: '#14b8a6' })
                : lightTheme({ accentColor: '#1f2937' })
            }
            showRecentTransactions={true}
            avatar={CustomAvatar}
            modalSize="compact"
          >
            {children}
          </RainbowKitProvider>
        </RainbowKitSiweNextAuthProvider>
      )}

      {!useSiwe && (
        <RainbowKitProvider
          appInfo={{
            appName: 'Cacti',
            disclaimer: Disclaimer,
          }}
          chains={chains}
          theme={
            experimentalUi
              ? darkTheme({ accentColor: '#14b8a6' })
              : lightTheme({ accentColor: '#1f2937' })
          }
          showRecentTransactions={true}
          avatar={CustomAvatar}
          modalSize="compact"
        >
          {children}
        </RainbowKitProvider>
      )}
    </WagmiConfig>
  );
};

export default ConnectionWrapper;
