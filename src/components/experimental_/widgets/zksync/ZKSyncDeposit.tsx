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
import { ConnectFirst } from '../helpers/ConnectFirst';
import getZKSyncTx from './zksync-utils';

interface ZKSyncProps {
  token: string;
  userAmount: string;
}

const ZKSyncDeposit = ({ token, userAmount }: ZKSyncProps) => {
  const { chain } = useNetwork();
  const { switchNetwork } = useSwitchNetwork();
  const [txAndApproval, setTxAndApproval] = useState({ tx: undefined, approval: undefined });

  useEffect(() => {
    if (chain?.id === goerli.id) {
      getZKSyncTx(token, userAmount)
        .then(({ tx, approval }) => {
          setTxAndApproval({ tx, approval });
        })
        .catch(console.error);
    }
  }, [chain?.id, token, userAmount]);

  useEffect(() => {
    if (chain?.id !== goerli.id) {
      switchNetwork?.(goerli.id);
    }
  }, []);

  return (
    <ConnectFirst>
      <HeaderResponse text="Bridge to zkSync" />
      <SingleLineResponse tokenSymbol={token} value={userAmount} />
      <ActionResponse
        label={`Bridge ${userAmount} ${token} to zkSync`}
        txParams={txAndApproval.tx}
        approvalParams={undefined}
      />
    </ConnectFirst>
  );
};

export default ZKSyncDeposit;
