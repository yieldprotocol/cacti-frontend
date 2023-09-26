import { useEffect, useState } from 'react';
import { EthersLiquity } from '@liquity/lib-ethers';
import { Address, TransactionRequestBase, formatEther, formatUnits } from 'viem';
import { useAccount, useWalletClient } from 'wagmi';
import {
  ActionResponse,
  HeaderResponse,
  ListResponse,
  SingleLineResponse,
} from '@/components/cactiComponents';
import { walletClientToSigner } from '@/utils/ethersAdapter';

interface LiquityCloseData {
  collateral: string;
  debt: string;
}

const LiquityClose = () => {
  const { address: account } = useAccount();
  const { data: walletClient } = useWalletClient();
  const signer = walletClient ? walletClientToSigner(walletClient) : undefined;
  const [sendParams, setSendParams] = useState<TransactionRequestBase>();
  const [data, setData] = useState<LiquityCloseData>();

  useEffect(() => {
    (async () => {
      if (!signer) return;
      const liquity = await EthersLiquity.connect(signer);
      const trove = await liquity.getTrove(account);
      const collateral = trove.collateral.bigNumber;
      const collateral_ = formatEther(BigInt(collateral.toString())); // ether decimals
      const debt = trove.debt.bigNumber;
      const debt_ = formatUnits(BigInt(debt.toString()), 18); // LUSD decimals
      const { rawPopulatedTransaction: params } = await liquity.populate.closeTrove();
      if (!params.from) {
        console.error('No connected address found');
        return;
      }

      setSendParams({
        to: params.to as Address | undefined,
        data: params.data as Address | undefined,
        from: params.from as Address,
        value: BigInt(params.value?.toString() || 0),
      });

      setData({ collateral: collateral_, debt: debt_ });
    })();
  }, [signer, account]);

  return (
    <>
      <HeaderResponse
        text="Close Liquity Trove"
        projectName="Liquity"
        altUrl={`https://www.liquity.org/`}
      />
      <SingleLineResponse tokenSymbol={'LUSD'} />
      <ListResponse
        title="Breakdown"
        data={[
          ['Collateral Returned', data?.collateral], // Provide the actual collateral returned value
          ['LUSD Debt Repayed', data?.debt], // Provide the actual outstanding LUSD value
        ]}
        collapsible
      />
      <ActionResponse
        label={`Close Trove with ${data?.debt} LUSD and ${data?.collateral} ETH`}
        txParams={undefined}
        sendParams={sendParams}
        approvalParams={undefined}
      />
    </>
  );
};

export default LiquityClose;
