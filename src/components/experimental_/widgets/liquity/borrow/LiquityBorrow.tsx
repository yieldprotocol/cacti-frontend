import { useEffect, useState } from 'react';
import { EthersLiquity } from '@liquity/lib-ethers';
import { parseUnits } from 'ethers/lib/utils.js';
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
  const { data: borrowToken } = useToken('LUSD');
  const { data: collateralToken } = useToken('ETH');
  const borrowAmtCleaned = cleanValue(borrowAmount.toString(), borrowToken?.decimals);
  const _borrowAmount = parseUnits(borrowAmtCleaned!, borrowToken?.decimals);
  const collateralAmtCleaned = cleanValue(collateralAmount.toString(), borrowToken?.decimals);
  const _collateralAmount = parseUnits(collateralAmtCleaned!, borrowToken?.decimals);

  const signer = useSigner();

  const [txParams, setTxParams] = useState<TxBasicParams>();

  useEffect(() => {
    (async () => {
      if (!signer) return;
      const liquity = await EthersLiquity.connect(signer);
      const txParams = liquity.populate.openTrove({
        borrowLUSD: _borrowAmount,
        depositCollateral: _collateralAmount,
      });
      console.log('🦄 ~ file: index.tsx:41 ~ txParams:', txParams);
    })();
  }, [_borrowAmount, _collateralAmount, signer]);

  return (
    <>
      <HeaderResponse
        text="Borrow LUSD with Liquity"
        projectName="Liquity"
        altUrl={`https://www.liquity.org/`}
      />
      <ResponseRow>
        <SingleLineResponse
          tokenSymbol={borrowToken?.symbol}
          tokenValueInUsd={100}
          amount={borrowAmtCleaned}
          amountValueInUsd={100}
        />
      </ResponseRow>
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
        label={`Borrow ${borrowAmtCleaned} ${borrowToken?.symbol} using ${collateralAmtCleaned} ${collateralToken?.symbol}`}
        txParams={txParams}
        approvalParams={undefined}
      />
    </>
  );
};

export default LiquityBorrow;
