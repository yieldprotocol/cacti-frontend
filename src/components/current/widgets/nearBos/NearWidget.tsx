import React, { useCallback, useEffect, useState } from 'react';
import Link from 'next/link';
import { sanitizeUrl } from '@braintree/sanitize-url';
// import { useParams } from "react-router-dom";
// import { useQuery } from "../hooks/useQuery";
// import { useHashRouterLegacy } from "../hooks/useHashRouterLegacy";
import { setupWalletSelector } from '@near-wallet-selector/core';
import { setupSender } from "@near-wallet-selector/sender";
// import { setupHereWallet } from "@near-wallet-selector/here-wallet";
// import { setupMeteorWallet } from "@near-wallet-selector/meteor-wallet";
import { setupNeth } from "@near-wallet-selector/neth";
import { setupNightly } from "@near-wallet-selector/nightly";

import { setupModal } from '@near-wallet-selector/modal-ui';
import { setupNearWallet } from '@near-wallet-selector/near-wallet';
import { Widget as BosWidget } from 'near-social-vm';
import { EthersProviderContext, useAccount, useInitNear, useNear, utils } from 'near-social-vm';

import { ResponseWrap } from '@/components/cactiComponents/helpers/layout';
import { useEthersProviderContext } from './data/web3';
// import Big from "big.js";
// import { NavigationWrapper } from "./components/navigation/NavigationWrapper";
import { NetworkId, Widgets } from './data/widgets';

function NearWidgetUnwrapped(props: any) {
  // const { widgetSrc } = useParams();
  const [widgetProps, setWidgetProps] = useState({});
  const src = 'aave-v3.near/widget/AAVE'; //  widgetSrc || props.widgets.default;

  // useEffect(() => {
  //   setWidgetProps(
  //     [...query.entries()].reduce((props, [key, value]) => {
  //       props[key] = value;
  //       return props;
  //     }, {})
  //   );
  // }, [query]);

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
              gas: "300000000000000",
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
            if (props.to) {
              props.to = sanitizeUrl(props.to);
            }
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

  return (
    <ResponseWrap>
      <div className="remove-all">
       <BosWidget key={src} src={src} props={{...widgetProps, ...passProps}} />
      </div>
    </ResponseWrap>
  );
}

const NearWidget = () => {
   const ethersProviderContext = useEthersProviderContext();
  return (
    <EthersProviderContext.Provider value={ethersProviderContext}><NearWidgetUnwrapped /></EthersProviderContext.Provider> 
  )
}

export default NearWidget;
