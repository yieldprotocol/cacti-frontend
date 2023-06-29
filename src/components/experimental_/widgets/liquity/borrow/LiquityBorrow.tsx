import { useEffect, useState } from 'react';
import { EthersLiquity } from '@liquity/lib-ethers';
import { UnsignedTransaction } from 'ethers/lib/utils.js';
import {
  ActionResponse,
  HeaderResponse,
  ListResponse,
  SingleLineResponse,
} from '@/components/cactiComponents';
import useSigner from '@/hooks/useSigner';
import useToken from '@/hooks/useToken';
import { cleanValue } from '@/utils';

interface BorrowProps {
  borrowAmount: string;
  collateralAmount: string;
}

const LiquityBorrow = ({ borrowAmount, collateralAmount }: BorrowProps) => {
  const signer = useSigner();
  const { data: borrowToken } = useToken('LUSD');
  const { data: collateralToken } = useToken('ETH');
  const borrowCleaned = cleanValue(borrowAmount, borrowToken?.decimals);
  const collateralCleaned = cleanValue(collateralAmount, collateralToken?.decimals);
  const borrowLUSD = isNaN(+borrowCleaned!) ? 0 : +borrowCleaned!;
  const depositCollateral = isNaN(+collateralCleaned!) ? 0 : +collateralCleaned!;

  const [sendParams, setSendParams] = useState<UnsignedTransaction>();

  useEffect(() => {
    (async () => {
      if (!signer) return;
      const liquity = await EthersLiquity.connect(signer);
      const { rawPopulatedTransaction: params } = await liquity.populate.openTrove({
        borrowLUSD,
        depositCollateral,
      });
      setSendParams(params);
    })();
  }, [signer, borrowLUSD, depositCollateral]);

  return (
    <>
      <HeaderResponse
        text="Borrow LUSD with Liquity"
        projectName="Liquity"
        altUrl={`https://www.liquity.org/`}
      />
      <SingleLineResponse
        tokenSymbol={borrowToken?.symbol}
        tokenValueInUsd={100}
        amount={borrowLUSD}
        amountValueInUsd={100}
      />
      <ListResponse
        title="Breakdown"
        data={[
          ['Collateralization Ratio', 'some ratio'],
          ['Reserve Fee', 'some fee'],
          ['Gas Fees', 'some gas fee'],
        ]}
        collapsible
      />
      <ActionResponse
        label={`Borrow ${borrowLUSD} ${borrowToken?.symbol} using ${depositCollateral} ${collateralToken?.symbol}`}
        txParams={undefined}
        sendParams={sendParams}
        approvalParams={undefined}
      />
    </>
  );
};

export default LiquityBorrow;
