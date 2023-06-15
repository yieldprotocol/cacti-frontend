import { useEffect, useState } from 'react';
import { useNetwork, useSwitchNetwork } from 'wagmi';
import { goerli } from 'wagmi/chains';
import * as zksync from 'zksync-web3';
import {
  ActionResponse,
  HeaderResponse,
  IconResponse,
  ListResponse,
  SingleLineResponse,
  TextResponse,
} from '@/components/cactiComponents';
import { TxBasicParams } from '../../../cactiComponents/hooks/useSubmitTx';
import { ConnectFirst } from '../helpers/ConnectFirst';
import getZKSyncTx from './zksync-utils';

interface ZKSyncProps {
  token: string;
  userAmount: string;
}

const ZKSyncDeposit = ({ token, userAmount }: ZKSyncProps) => {
  const { chain } = useNetwork();
  const { switchNetworkAsync } = useSwitchNetwork();
  const [txAndApproval, setTxAndApproval] = useState<{ tx?: TxBasicParams; approval?: any }>({
    tx: undefined,
    approval: undefined,
  });

  useEffect(() => {
    getZKSyncTx(token, userAmount)
      .then(({ tx, approval }) => {
        setTxAndApproval({ tx, approval });
      })
      .catch(console.error);
  }, [chain?.id, token, userAmount]);

  return (
    <ConnectFirst>
      <HeaderResponse text="Bridge to zkSync" />
      <SingleLineResponse tokenSymbol={token} value={userAmount} />
      <ActionResponse
        label={`Bridge ${userAmount} ${token} to zkSync`}
        txParams={{
          fullTxRequest: txAndApproval.tx,
          chainId: goerli.id,
        }}
        approvalParams={token.toUpperCase() !== 'ETH' ? txAndApproval.approval : undefined}
        preProcessFn={async () => {
          if (process.env.NODE_ENV === 'production') {
            await switchNetworkAsync?.(1);
          } else {
            await switchNetworkAsync?.(goerli.id);
          }
        }}
      />
    </ConnectFirst>
  );
};

export default ZKSyncDeposit;
