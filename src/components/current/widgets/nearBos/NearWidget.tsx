import React, { useCallback, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
// import { sanitizeUrl } from '@braintree/sanitize-url';
// import { useParams } from "react-router-dom";
// import { useQuery } from "../hooks/useQuery";
// import { useHashRouterLegacy } from "../hooks/useHashRouterLegacy";
import { setupWalletSelector } from '@near-wallet-selector/core';
import { setupModal } from '@near-wallet-selector/modal-ui';
import { setupNearWallet } from '@near-wallet-selector/near-wallet';
// import { setupHereWallet } from "@near-wallet-selector/here-wallet";
// import { setupMeteorWallet } from "@near-wallet-selector/meteor-wallet";
import { setupNeth } from '@near-wallet-selector/neth';
import { setupNightly } from '@near-wallet-selector/nightly';
import { setupSender } from '@near-wallet-selector/sender';
import { Widget as BosWidget } from 'near-social-vm';
import { EthersProviderContext, useAccount, useInitNear, useNear, utils } from 'near-social-vm';
import { EIP1193Provider, EIP1193ProviderRpcError } from 'viem';
// import { getProvider, disconnect, watchProvider } from '@wagmi/core'
import { useWalletClient } from 'wagmi';
import { ResponseWrap } from '@/components/cactiComponents/helpers/layout';
import { useEthersProviderContext } from './data/web3';
// import Big from "big.js";
// import { NavigationWrapper } from "./components/navigation/NavigationWrapper";
import { NetworkId, Widgets } from './data/widgets';

interface NearWidgetProps {
  nearUser: string;
  nearWidget: string;
  nearWidgetProps?: Map<any, any>;
}

function NearWidget(props: NearWidgetProps) {
  const [widgetProps, setWidgetProps] = useState({});
  const src = `${props.nearUser}/widget/${props.nearWidget}`; // 'aave-v3.near/widget/AAVE'; //  widgetSrc || props.widgets.default;

  // useEffect(() => {
  //   if (props.nearWidgetProps) setWidgetProps(
  //     [...props.nearWidgetProps.entries()].reduce((props_, [key, value]) => {
  //       props_[key] = value;
  //       return props_;
  //     }, {})
  //   );
  // }, [props.nearWidgetProps]);

  const [connected, setConnected] = useState(false);
  const [signedIn, setSignedIn] = useState(false);
  const [signedAccountId, setSignedAccountId] = useState(null);
  const [availableStorage, setAvailableStorage] = useState(null);
  const [walletModal, setWalletModal] = useState(null);
  const [widgetSrc, setWidgetSrc] = useState(null);

  const { initNear } = useInitNear();
  const near = useNear();
  const account = useAccount();

  const accountId = account.accountId;

  useEffect(() => {
    initNear &&
      initNear({
        networkId: NetworkId,
        selector: setupWalletSelector({
          network: NetworkId,
          modules: [
            setupNearWallet(),
            // setupMyNearWallet(),
            setupSender(),
            // setupHereWallet(),
            // setupMeteorWallet(),
            setupNeth({
              gas: '300000000000000',
              bundle: false,
            }),
            setupNightly(),
          ],
        }),
        customElements: {
          Link: (props: any) => {
            if (!props.to && props.href) {
              props.to = props.href;
              delete props.href;
            }
            // if (props.to) {
            //   props.to = sanitizeUrl(props.to);
            // }
            return <Link {...props} />;
          },
        },
        config: {
          defaultFinality: undefined,
        },
      });
  }, [initNear]);

  useEffect(() => {
    if (!near) {
      return;
    }
    near.selector.then((selector: any) => {
      setWalletModal(selector && setupModal(selector, { contractId: near.config.contractName }));
    });
  }, [near]);

  const requestSignIn = useCallback(
    (e: any) => {
      e && e.preventDefault();
      // @ts-ignore
      walletModal.show();
      return false;
    },
    [walletModal]
  );

  const logOut = useCallback(async () => {
    if (!near) {
      return;
    }
    const wallet = await (await near.selector).wallet();
    wallet.signOut();
    near.accountId = null;
    setSignedIn(false);
    setSignedAccountId(null);
  }, [near]);

  const refreshAllowance = useCallback(async () => {
    alert("You're out of access key allowance. Need sign in again to refresh it");
    await logOut();
    // requestSignIn();
  }, [logOut, requestSignIn]);
  // refreshAllowanceObj.refreshAllowance = refreshAllowance;

  useEffect(() => {
    if (!near) {
      return;
    }
    setSignedIn(!!accountId);
    setSignedAccountId(accountId);
    setConnected(true);
  }, [near, accountId]);

  // useEffect(() => {
  //   setAvailableStorage(
  //     account.storageBalance
  //       ? Big(account.storageBalance.available).div(utils.StorageCostPerByte)
  //       : Big(0)
  //   );
  // }, [account]);

  const passProps = {
    refreshAllowance: () => refreshAllowance(),
    setWidgetSrc,
    signedAccountId,
    signedIn,
    connected,
    availableStorage,
    widgetSrc,
    logOut,
    requestSignIn,
    widgets: [],
    documentationHref: 'https://docs.near.org/docs/develop/front-end/near-api-js',
  };

  // const ethersProviderContext = useEthersProviderContext();

  // const [ethersProvider, setEthersProvider] = useState({
  //   useConnectWallet: () => [{}], // [{ wallet, connecting }, connect, disconnect]
  //   setChain: () => null,
  //   provider: getProvider(),
  // });

  // interface WalletModule {
  //   label: string;
  //   getIcon: () => Promise<string>;
  //   getInterface: (helpers: any) => Promise<WalletInterface>;
  // }
  // type WalletInterface = {
  //   provider: EIP1193Provider;
  //   instance?: unknown;
  // };
  // const walletModuleShim = (provider: EIP1193Provider): WalletModule => {
  //   const label = 'lable';
  //   return {
  //     label,
  //     getIcon: () => Promise.resolve(''),
  //     getInterface: () => Promise.resolve({ provider }),
  //   };
  // };

  const { data: walletClient, isError, isLoading } = useWalletClient();

  const useConnectWallet = () => [
    {
      wallet: {
        label: 'default',
        getIcon: () => Promise.resolve(''),
        getInterface: walletClient,
      },
      connecting: false,
    },
    () => console.log('connect'),
    () => console.log('disconnect'),
  ]; // Retun: [{ wallet, connecting }, connect, disconnect]

  const ethersProviderContext = {
    provider: walletClient,
    useConnectWallet,
    setChain: () => null,
  };

  return (
    // <iframe
    //   srcDoc='
    // <div>
    <EthersProviderContext.Provider value={ethersProviderContext}>
      <ResponseWrap>
        <div className="relative inline-block overflow-hidden bg-white text-black/70">
          <BosWidget key={src} src={src} props={{ ...widgetProps, ...passProps }} />
        </div>
      </ResponseWrap>
    </EthersProviderContext.Provider>
    // </div>'
    // ></iframe>
  );
}

export default NearWidget;
