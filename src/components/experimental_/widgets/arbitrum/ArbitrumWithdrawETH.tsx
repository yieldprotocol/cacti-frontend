import { parseUnits } from 'ethers/lib/utils.js';
import { useAccount } from 'wagmi';
import ArbSysAbi from '@/abi/arbitrum/ArbSys.json';
import { ActionResponse, HeaderResponse } from '@/components/cactiComponents';
import { TxBasicParams } from '@/components/cactiComponents/hooks/useSubmitTx';
import { ConnectFirst } from '../helpers/ConnectFirst';

interface ArbitrumWithdrawETHProps {
  destination?: string;
  value: string;
}

const ArbitrumWithdrawETH = ({ destination, value }: ArbitrumWithdrawETHProps) => {
  const amount = parseUnits(value, 18);

  const { address: account } = useAccount();

  const tx: TxBasicParams = {
    address: '0x0000000000000000000000000000000000000064',
    abi: ArbSysAbi,
    functionName: 'withdrawEth',
    args: [destination ?? account],
    overrides: { value: amount },
  };

  return (
    <ConnectFirst>
      <HeaderResponse text={`Withdraw ${value} Ether from Arbitrum`} projectName="arbitrum" />
      <ActionResponse
        label={`Withdraw ${value || ''} ETH from Arbitrum to ${destination}`}
        txParams={tx}
        approvalParams={undefined}
        sendParams={undefined}
      />
    </ConnectFirst>
  );
};

export default ArbitrumWithdrawETH;
