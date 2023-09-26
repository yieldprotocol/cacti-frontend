import { useContext } from 'react';
import Jazzicon, { jsNumberForAddress } from 'react-jazzicon';
import {
  AvatarComponent,
  DisclaimerComponent,
  RainbowKitProvider,
  darkTheme,
  getDefaultWallets,
  lightTheme,
} from '@rainbow-me/rainbowkit';
import axios from 'axios';
import { Chain, WagmiConfig, configureChains, createConfig, useEnsAvatar } from 'wagmi';
import { goerli, zkSyncTestnet } from 'wagmi/chains';
import { publicProvider } from 'wagmi/providers/public';
import useCachedState from '@/hooks/useCachedState';
import { getBackendApiUrl } from '@/utils/backend';
import { GetSiweMessageOptions, RainbowKitSiweNextAuthProvider } from '@/utils/rainbowSIWEmod';
import SettingsContext from './SettingsContext';

const ConnectionWrapper = ({ children, useSiwe = true }: any) => {

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
    name: 'mainnet',
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

  const { chains, publicClient, webSocketPublicClient } = configureChains(
    [mainnetFork, goerli, zkSyncTestnet],
    [publicProvider()]
  );

  const { connectors } = getDefaultWallets({
    appName: 'cacti app',
    projectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || '',
    chains,
  });

  const wagmiConfig = createConfig({
    autoConnect: true,
    connectors,
    publicClient,
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
    const { data: ensImage } = useEnsAvatar();
    return ensImage ? (
      <img alt="avatar" src={ensImage} width={size} height={size} style={{ borderRadius: 999 }} />
    ) : (
      <Jazzicon diameter={size} seed={address ? jsNumberForAddress(address) : 0} />
    );
  };

  const Disclaimer: DisclaimerComponent = ({ Text, Link }) => (
    <Text>
      By connecting my wallet, I agree to the{' '}
      <Link href="https://cacti.finance/terms/">Terms of Service</Link> and acknowledge I have
      read and understand the protocol{' '}
      <Link href="https://cacti.finance/privacy/">Privacy Policy</Link>.
    </Text>
  );

  return (
    <WagmiConfig config={wagmiConfig}>
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
