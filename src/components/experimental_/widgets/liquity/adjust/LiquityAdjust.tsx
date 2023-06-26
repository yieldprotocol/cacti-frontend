import { useEffect, useState } from 'react';
import { Decimalish, TroveAdjustmentParams } from '@liquity/lib-base';
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
    if (!amount) return undefined;
    const cleaned = cleanValue(amount, 18);
    if (!cleaned) return undefined;
    const num = +cleaned;
    return isNaN(num) || num === 0 ? undefined : +cleaned;
  };

  const borrowLUSD = handleInput(borrowAmount);
  const repayLUSD = handleInput(repayAmount);
  const _withdrawCollateral = handleInput(withdrawCollateral);
  const _depositCollateral = handleInput(depositCollateral);
  const isBorrow = !!borrowLUSD || !!_depositCollateral;
  const [label, setLabel] = useState<string>();

  const [sendParams, setSendParams] = useState<UnsignedTransaction>();

  useEffect(() => {
    (async () => {
      if (!signer) return;

      const liquity = await EthersLiquity.connect(signer);
      const validParams = {} as TroveAdjustmentParams<Decimalish>;

      if (borrowLUSD) validParams.borrowLUSD = borrowLUSD;
      if (repayLUSD) validParams.repayLUSD = repayLUSD;
      if (_depositCollateral) validParams.depositCollateral = _depositCollateral;
      if (_withdrawCollateral) validParams.withdrawCollateral = _withdrawCollateral;

      // handle if for some reason there is a borrow and a repay input
      if (borrowLUSD && repayLUSD) {
        validParams.repayLUSD = 0; // TODO handle more gracefully to identify what user actually wants to do
      }

      // handle if for some reason there is a deposit and a withdraw input
      if (_depositCollateral && _withdrawCollateral) {
        validParams.withdrawCollateral = 0; // TODO handle more gracefully to identify what user actually wants to do
      }

      const { rawPopulatedTransaction: params } = await liquity.populate.adjustTrove(validParams);
      setSendParams(params);

      // handle repay label
      const labels: { [action: string]: string } = {};
      if (repayLUSD) labels.repayLUSD = `Repay ${repayLUSD} ${'LUSD'}`;
      if (_withdrawCollateral)
        labels.withdrawCollateral = `Withdraw ${_withdrawCollateral} ${'ETH'}`;
      if (borrowLUSD) labels.borrowLUSD = `Borrow ${borrowLUSD} ${'LUSD'}`;
      if (_depositCollateral) labels.depositCollateral = `Deposit ${_depositCollateral} ${'ETH'}`;
      const label = Object.values(labels).join(' and ');

      setLabel(label);
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
      {borrowAmount && <DoubleLineResponse tokenSymbol={'LUSD'} amount={borrowLUSD} />}
      {repayAmount && <DoubleLineResponse tokenSymbol={'LUSD'} amount={repayLUSD} />}
      {depositCollateral && <DoubleLineResponse tokenSymbol={'ETH'} amount={borrowLUSD} />}
      {withdrawCollateral && <DoubleLineResponse tokenSymbol={'ETH'} amount={_depositCollateral} />}
      <ListResponse
        title="Breakdown"
        data={[
          ['New Collateralization Ratio', 'something'],
          isBorrow ? ['LUSD to Borrow', borrowLUSD] : ['LUSD to Repay', repayLUSD],
          isBorrow
            ? ['ETH to Deposit', _depositCollateral]
            : ['ETH to Withdraw', _withdrawCollateral],
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
