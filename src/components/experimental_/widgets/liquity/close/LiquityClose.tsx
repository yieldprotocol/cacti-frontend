import { useEffect, useState } from 'react';
import { EthersLiquity } from '@liquity/lib-ethers';
import { UnsignedTransaction, formatUnits } from 'ethers/lib/utils.js';
import { useAccount } from 'wagmi';
import {
  ActionResponse,
  HeaderResponse,
  ListResponse,
  SingleLineResponse,
} from '@/components/cactiComponents';
import useSigner from '@/hooks/useSigner';
import { cleanValue } from '@/utils';

interface LiquityCloseData {
  collateral: string;
  debt: string;
}

const LiquityClose = () => {
  const { address: account } = useAccount();
  const signer = useSigner();
  const [sendParams, setSendParams] = useState<UnsignedTransaction>();
  const [data, setData] = useState<LiquityCloseData>();

  useEffect(() => {
    (async () => {
      if (!signer) return;
      const liquity = await EthersLiquity.connect(signer);
      const trove = await liquity.getTrove(account);
      const collateral = trove.collateral.bigNumber;
      const collateral_ = formatUnits(collateral, 18); // ether decimals
      const debt = trove.debt.bigNumber;
      const debt_ = formatUnits(debt, 18); // LUSD decimals
      const { rawPopulatedTransaction: params } = await liquity.populate.closeTrove();
      setSendParams(params);
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
      <SingleLineResponse
        tokenSymbol={'LUSD'}
        tokenValueInUsd={1} // Provide the actual USD value for the borrow token
        amount={data?.debt} // Set the amount to 0 as it is not applicable for closing a trove
        amountValueInUsd={data?.debt} // Set the amount value to 0 as it is not applicable for closing a trove
      />
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
