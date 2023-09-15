import { singletonHook } from "react-singleton-hook";
import { useEffect, useState } from "react";

import ls from "local-storage";
// import icon from "../images/near_social_icon.svg";

import { EIP1193Provider } from "viem";
import { useEthersProvider } from "@/utils/ethersPolyfill";
import { JsonRpcProvider } from "near-api-js/lib/providers";

// const web3onboardKey = "web3-onboard:connectedWallets";

// const wcV1InitOptions = {
//   qrcodeModalOptions: {
//     mobileLinks: ["metamask", "argent", "trust"],
//   },
//   connectFirstChainId: true,
// };

// const walletConnect = walletConnectModule(wcV1InitOptions);
// const ledger = ledgerModule();
// const injected = injectedModule();

// // initialize Onboard
// export const onboard = init({
//   wallets: [injected],
//   chains: [
//     {
//       id: 1,
//       token: "ETH",
//       label: "Ethereum Mainnet",
//       rpcUrl: "https://rpc.ankr.com/eth",
//     },
//     {
//       id: 3,
//       token: "ETH",
//       label: "Ropsten - Ethereum Testnet",
//       rpcUrl: "https://rpc.ankr.com/eth_ropsten",
//     },
//     {
//       id: 5,
//       token: "ETH",
//       label: "Goerli - Ethereum Testnet",
//       rpcUrl: "https://rpc.ankr.com/eth_goerli",
//     },
//     {
//       id: 10,
//       token: "ETH",
//       label: "Optimism",
//       rpcUrl: "https://rpc.ankr.com/optimism",
//     },
//     {
//       id: 420,
//       token: "ETH",
//       label: "Optimism Goerli Testnet",
//       rpcUrl: "https://optimism-goerli.publicnode.com",
//     },
//     {
//       id: 56,
//       token: "BNB",
//       label: "Binance Smart Chain Mainnet",
//       rpcUrl: "https://bsc.publicnode.com",
//     },
//     {
//       id: 97,
//       token: "tBNB",
//       label: "Binance Smart Chain Testnet",
//       rpcUrl: "https://bsc-testnet.publicnode.com",
//     },
//     {
//       id: 1313161554,
//       token: "ETH",
//       label: "Aurora Mainnet",
//       rpcUrl: "https://mainnet.aurora.dev",
//     },
//     {
//       id: 1313161555,
//       token: "ETH",
//       label: "Aurora Testnet",
//       rpcUrl: "https://testnet.aurora.dev",
//     },
//     {
//       id: 137,
//       token: "MATIC",
//       label: "Polygon Mainnet",
//       rpcUrl: "https://rpc.ankr.com/polygon",
//     },
//     {
//       id: 80001,
//       token: "MATIC",
//       label: "Polygon Testnet Mumbai",
//       rpcUrl: "https://rpc.ankr.com/polygon_mumbai",
//     },
//     {
//       id: 280,
//       token: "ETH",
//       label: "zkSync Era Testnet",
//       rpcUrl: "https://testnet.era.zksync.dev",
//     },
//     {
//       id: 324,
//       token: "ETH",
//       label: "zkSync Era Mainnet",
//       rpcUrl: "https://zksync2-mainnet.zksync.io",
//     },
//     {
//       id: 1101,
//       token: "ETH",
//       label: "Polygon zkEVM",
//       rpcUrl: "https://zkevm-rpc.com",
//     },
//     {
//       id: 1442,
//       token: "ETH",
//       label: "Polygon zkEVM Testnet",
//       rpcUrl: "https://rpc.public.zkevm-test.net",
//     },
//     {
//       id: 42161,
//       token: "ETH",
//       label: "Arbitrum One Mainnet",
//       rpcUrl: "https://arb1.arbitrum.io/rpc",
//     },
//     {
//       id: 42170,
//       token: "ETH",
//       label: "Arbitrum Nova",
//       rpcUrl: "https://nova.arbitrum.io/rpc",
//     },
//     {
//       id: 421613,
//       token: "AGOR",
//       label: "Arbitrum Goerli",
//       rpcUrl: "https://goerli-rollup.arbitrum.io/rpc",
//     },
//     {
//       id: 25,
//       token: "CRO",
//       label: "Cronos Mainnet Beta",
//       rpcUrl: "https://evm.cronos.org",
//     },
//     {
//       id: 338,
//       token: "TCRO",
//       label: "Cronos Testnet",
//       rpcUrl: "https://evm-t3.cronos.org",
//     },
//     {
//       id: 100,
//       token: "XDAI",
//       label: "Gnosis",
//       rpcUrl: "https://rpc.ankr.com/gnosis",
//     },
//     {
//       id: 10200,
//       token: "XDAI",
//       label: "Gnosis Chiado Testnet",
//       rpcUrl: "https://rpc.chiadochain.net",
//     },
//     {
//       id: 42220,
//       token: "CELO",
//       label: "Celo Mainnet",
//       rpcUrl: "https://rpc.ankr.com/celo",
//     },
//     {
//       id: 44787,
//       token: "CELO",
//       label: "Celo Alfajores Testnet",
//       rpcUrl: "https://alfajores-forno.celo-testnet.org",
//     },
//     {
//       id: 43114,
//       token: "AVAX",
//       label: "Avalanche C-Chain",
//       rpcUrl: "https://rpc.ankr.com/avalanche",
//     },
//     {
//       id: 43113,
//       token: "AVAX",
//       label: "Avalanche Fuji Testnet",
//       rpcUrl: "https://rpc.ankr.com/avalanche_fuji",
//     },
//     {
//       id: 250,
//       token: "FTM",
//       label: "Fantom Opera",
//       rpcUrl: "https://rpc.ankr.com/fantom",
//     },
//     {
//       id: 4002,
//       token: "FTM",
//       label: "Fantom Testnet",
//       rpcUrl: "https://rpc.ankr.com/fantom_testnet",
//     },
//     {
//       id: 1284,
//       token: "GLMR",
//       label: "Moonbeam",
//       rpcUrl: "https://rpc.ankr.com/moonbeam",
//     },
//     {
//       id: 61,
//       token: "ETC",
//       label: "Ethereum Classic Mainnet",
//       rpcUrl: "https://etc.rivet.link",
//     },
//     {
//       id: 84531,
//       token: "ETH",
//       label: "Base Goerli Testnet",
//       rpcUrl: "https://goerli.base.org",
//     },
//     {
//       id: 8453,
//       token: "ETH",
//       label: "Base Mainnet",
//       rpcUrl: "https://mainnet.base.org",
//     },
//   ],
//   appMetadata: {
//     name: "NEAR Social",
//     icon: './images/near_social_icon.svg',
//     description: "NEAR Social",
//   },
//   theme: "dark",
//   containerElements: {
//     // connectModal: '#near-social-navigation-bar',
//     // accountCenter: "#near-social-web3-account",
//   },
// });
interface EthersProviderContext {
  provider?: any;
  useConnectWallet: any; 
  setChain:any;
}
const defaultEthersProviderContext: EthersProviderContext = {
  useConnectWallet: () => [{}], // [{ wallet, connecting }, connect, disconnect]
  setChain: ()=> null,
};

interface WalletModule {
  label: string;
  getIcon: () => Promise<string>;
  getInterface: (helpers: any) => Promise<WalletInterface>;
}
type WalletInterface = {
  provider: EIP1193Provider;
  instance?: unknown;
};
const walletModuleShim = (provider: EIP1193Provider): WalletModule => {
  const label = 'default';
  return {
    label,
    getIcon: () => Promise.resolve(''),
    getInterface: () => Promise.resolve({ provider }),
  };
};

export const useEthersProviderContext = singletonHook(
  defaultEthersProviderContext,
  () => {
    // const [{ wallet }] = useConnectWallet();
    const [ethersProvider, setEthersProvider] = useState(
      defaultEthersProviderContext
    );

    const provider = useEthersProvider();
   
    const useConnectWallet = () => [
      { wallet: 
        {
          label: 'default',
          getIcon: () => Promise.resolve(''),
          getInterface: () => Promise.resolve({ provider }),
        },   
        connecting: false },
      ()=>console.log('connect'),
      ()=>console.log('disconnect'),
    ]; // [{ wallet, connecting }, connect, disconnect]    

    useEffect(() => {
      setEthersProvider({
        provider,
        useConnectWallet,
        setChain: () => null,
      });
    }, [provider]);

    return ethersProvider;
  }
);
