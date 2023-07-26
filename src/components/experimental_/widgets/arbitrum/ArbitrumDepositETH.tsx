import { parseUnits } from 'ethers/lib/utils.js';
import { useAccount } from 'wagmi';
import InboxAbi from '@/abi/arbitrum/Inbox.json';
import { ActionResponse, HeaderResponse } from '@/components/cactiComponents';
import { TxBasicParams } from '@/components/cactiComponents/hooks/useSubmitTx';
import { ConnectFirst } from '../helpers/ConnectFirst';

interface ArbitrumDepositETHProps {
  value: string;
}

const ArbitrumDepositETH = ({ value }: ArbitrumDepositETHProps) => {
  const amount = parseUnits(value, 18);

  const { address: account } = useAccount();

  const tx: TxBasicParams = {
    address: '0x5aED5f8A1e3607476F1f81c3d8fe126deB0aFE94',
    abi: InboxAbi,
    functionName: 'depositEth',
    args: [],
    overrides: { value: amount },
  };

  return (
    <ConnectFirst>
      <HeaderResponse text={`Deposit ${value} Ether to Arbitrum`} projectName="arbitrum" />
      <ActionResponse
        label={`Deposit ${value || ''} ETH to Arbitrum`}
        txParams={tx}
        approvalParams={undefined}
        sendParams={undefined}
      />
    </ConnectFirst>
  );
};

export default ArbitrumDepositETH;
