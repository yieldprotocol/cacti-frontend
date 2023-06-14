import { useEffect, useState } from 'react';
import { EthersLiquity } from '@liquity/lib-ethers';
import { UnsignedTransaction, parseUnits } from 'ethers/lib/utils.js';
import {
  ActionResponse,
  HeaderResponse,
  ListResponse,
  SingleLineResponse,
} from '@/components/cactiComponents';
import { ResponseRow } from '@/components/cactiComponents/helpers/layout';
import { TxBasicParams } from '@/components/cactiComponents/hooks/useSubmitTx';
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
  const borrowLUSD = +(cleanValue(borrowAmount.toString(), borrowToken?.decimals) || 0);
  const depositCollateral = +(cleanValue(collateralAmount.toString(), borrowToken?.decimals) || 0);

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
