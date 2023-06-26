import { useEffect, useState } from 'react';
import { EthersLiquity } from '@liquity/lib-ethers';
import { UnsignedTransaction } from 'ethers/lib/utils.js';
import {
  ActionResponse,
  DoubleLineResponse,
  HeaderResponse,
  ListResponse,
} from '@/components/cactiComponents';
import useSigner from '@/hooks/useSigner';
import { cleanValue } from '@/utils';

interface AdjustProps {
  borrowAmount?: string;
  repayAmount?: string;
  depositCollateral?: string;
  withdrawCollateral?: string;
}

const LiquityAdjust = ({
  borrowAmount,
  repayAmount,
  depositCollateral,
  withdrawCollateral,
}: AdjustProps) => {
  const signer = useSigner();

  const handleInput = (amount: string | undefined) => {
    if (!amount) return 0;
    const cleaned = cleanValue(amount, 18) || '0';
    return isNaN(+cleaned) ? 0 : +cleaned;
  };

  const borrowLUSD = handleInput(borrowAmount);
  const repayLUSD = handleInput(repayAmount);
  const _withdrawCollateral = handleInput(withdrawCollateral);
  const _depositCollateral = handleInput(depositCollateral);
  const isBorrow = !!borrowAmount || !!depositCollateral;
  const [label, setLabel] = useState<string>();

  const [sendParams, setSendParams] = useState<UnsignedTransaction>();

  useEffect(() => {
    (async () => {
      if (!signer) return;

      const liquity = await EthersLiquity.connect(signer);

      // handle repay
      const { rawPopulatedTransaction: repayParams } = await liquity.populate.adjustTrove({
        repayLUSD,
        withdrawCollateral: _withdrawCollateral,
      });

      // handle borrow
      const { rawPopulatedTransaction: borrowParams } = await liquity.populate.adjustTrove({
        borrowLUSD,
        depositCollateral: _depositCollateral,
      });

      // assess if borrow or repay
      const params = isBorrow ? borrowParams : repayParams;

      setLabel(
        isBorrow
          ? `Adjust Trove: Borrow ${borrowLUSD} ${'LUSD'} using ${_depositCollateral} ${'ETH'}`
          : `Adjust Trove: Repay ${repayLUSD} ${'LUSD'} and withdraw ${_withdrawCollateral} ${'ETH'}`
      );

      setSendParams(params);
    })();
  }, [_depositCollateral, _withdrawCollateral, borrowLUSD, isBorrow, repayLUSD, signer]);

  return (
    <>
      <HeaderResponse
        text="Adjust Trove with Liquity"
        projectName="Liquity"
        altUrl={`https://www.liquity.org/`}
      />
      <DoubleLineResponse
        tokenSymbol={'LUSD'}
        tokenValueInUsd={1}
        amount={borrowLUSD}
        amountValueInUsd={borrowLUSD}
      />
      <ListResponse
        title="Breakdown"
        data={[
          'New Collateralization Ratio',
          'something',
          ...(isBorrow
            ? [
                ['Borrow Amount', borrowLUSD],
                ['Deposit Collateral', _depositCollateral],
              ]
            : [
                ['Repay Amount', repayLUSD],
                ['Withdraw Collateral', _withdrawCollateral],
              ]),
        ]}
        collapsible
      />
      <ActionResponse
        label={label}
        txParams={undefined}
        sendParams={sendParams}
        approvalParams={undefined}
      />
    </>
  );
};

export default LiquityAdjust;
