import { useEffect, useState } from 'react';
import { EthersLiquity } from '@liquity/lib-ethers';
import { Address, TransactionRequestBase } from 'viem';
import { useWalletClient } from 'wagmi';
import {
  ActionResponse,
  HeaderResponse,
  ListResponse,
  SingleLineResponse,
} from '@/components/cactiComponents';
import useToken from '@/hooks/useToken';
import { cleanValue } from '@/utils';
import { useEthersSigner } from '@/utils/ethersAdapter';

interface BorrowProps {
  borrowAmount: string;
  collateralAmount: string;
}

const LiquityBorrow = ({ borrowAmount, collateralAmount }: BorrowProps) => {
  const signer = useEthersSigner();
  const { data: borrowToken } = useToken('LUSD');
  const { data: collateralToken } = useToken('ETH');
  const borrowCleaned = cleanValue(borrowAmount, borrowToken?.decimals);
  const collateralCleaned = cleanValue(collateralAmount, collateralToken?.decimals);
  const borrowLUSD = isNaN(+borrowCleaned!) ? 0 : +borrowCleaned!;
  const depositCollateral = isNaN(+collateralCleaned!) ? 0 : +collateralCleaned!;

  const [sendParams, setSendParams] = useState<TransactionRequestBase>();

  useEffect(() => {
    (async () => {
      if (!signer) return;
      const liquity = await EthersLiquity.connect(signer);
      const { rawPopulatedTransaction: params } = await liquity.populate.openTrove({
        borrowLUSD,
        depositCollateral,
      });

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
    })();
  }, [signer, borrowLUSD, depositCollateral]);

  return (
    <>
      <HeaderResponse
        text="Borrow LUSD with Liquity"
        projectName="Liquity"
        altUrl={`https://www.liquity.org/`}
      />
      <SingleLineResponse tokenSymbol={borrowToken?.symbol} value={100} />
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
