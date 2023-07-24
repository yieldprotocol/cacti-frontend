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

  const [validLiquityParams, setValidLiquityParams] = useState<TroveAdjustmentParams<Decimalish>>();
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

      setValidLiquityParams(validParams);
      const { rawPopulatedTransaction: params } = await liquity.populate.adjustTrove(validParams);
      setSendParams(params);

      // handle labels for each param
      const labels: { [action: string]: string } = {};

      if (repayLUSD) labels.repayLUSD = `Repay ${repayLUSD} ${'LUSD'}`;
      if (_withdrawCollateral)
        labels.withdrawCollateral = `Withdraw ${_withdrawCollateral} ${'ETH'}`;
      if (borrowLUSD) labels.borrowLUSD = `Borrow ${borrowLUSD} ${'LUSD'}`;
      if (_depositCollateral) labels.depositCollateral = `Deposit ${_depositCollateral} ${'ETH'}`;

      const label = Object.values(labels).join(' and ');
      setLabel(label);
    })();
  }, [_depositCollateral, _withdrawCollateral, borrowLUSD, repayLUSD, signer]);

  return (
    <>
      <HeaderResponse
        text="Adjust Trove with Liquity"
        projectName="Liquity"
        altUrl={`https://www.liquity.org/`}
      />
      {validLiquityParams?.borrowLUSD && (
        <DoubleLineResponse tokenSymbol={'LUSD'} amount={validLiquityParams.borrowLUSD} />
      )}
      {validLiquityParams?.repayLUSD && (
        <DoubleLineResponse tokenSymbol={'LUSD'} amount={validLiquityParams.repayLUSD} />
      )}
      {validLiquityParams?.depositCollateral && (
        <DoubleLineResponse tokenSymbol={'ETH'} amount={validLiquityParams.depositCollateral} />
      )}
      {validLiquityParams?.withdrawCollateral && (
        <DoubleLineResponse tokenSymbol={'ETH'} amount={validLiquityParams?.withdrawCollateral} />
      )}
      <ListResponse
        title="Breakdown"
        data={[
          ['New Collateralization Ratio', 'something'],
          validLiquityParams?.borrowLUSD && ['Borrow LUSD', validLiquityParams?.borrowLUSD],
          validLiquityParams?.repayLUSD && ['Repay LUSD', validLiquityParams?.repayLUSD],
          validLiquityParams?.depositCollateral && [
            'Deposit ETH',
            validLiquityParams?.depositCollateral,
          ],
          validLiquityParams?.withdrawCollateral && [
            'Withdraw ETH',
            validLiquityParams?.withdrawCollateral,
          ],
        ].filter(Boolean)}
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
