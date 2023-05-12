
import { ReactNode,useContext } from 'react';
import Jazzicon, { jsNumberForAddress } from 'react-jazzicon';
import {
  AvatarComponent,
  RainbowKitProvider,
  getDefaultWallets,
  lightTheme,
  darkTheme
} from '@rainbow-me/rainbowkit';
import axios from 'axios';
import { Session } from 'next-auth';
import { SessionProvider } from 'next-auth/react';
import { Chain, WagmiConfig, configureChains, createClient, useEnsAvatar } from 'wagmi';
import { jsonRpcProvider } from 'wagmi/providers/jsonRpc';
import useCachedState from '@/hooks/useCachedState';
import { getBackendApiUrl } from '@/utils/backend';
import { GetSiweMessageOptions, RainbowKitSiweNextAuthProvider } from '@/utils/rainbowSIWEmod';
import SettingsContext from './SettingsContext';


const ConnectionWrapper = ({ children, session }: { children: ReactNode; session: Session }) => {
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
    /* add in any async call here to add a custom nonce eg. server call */
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
      <SessionProvider refetchInterval={0} session={session}>
        <RainbowKitSiweNextAuthProvider
          getCustomNonce={getCustomNonce}
          getSiweMessageOptions={getSiweMessageOptions}
          getSigninCallback={getSigninCallback}
          getSignoutCallback={getSignoutCallback}
        >
          <RainbowKitProvider
            chains={chains}
            theme={experimentalUi ? darkTheme({ accentColor: '#1f2937' }) : lightTheme({ accentColor: '#1f2937' })}
            showRecentTransactions={true}
            avatar={CustomAvatar}
          >
            {children}
          </RainbowKitProvider>
        </RainbowKitSiweNextAuthProvider>
      </SessionProvider>
    </WagmiConfig>
  );
};

export default ConnectionWrapper;
