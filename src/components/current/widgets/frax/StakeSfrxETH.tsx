import { parseEther } from 'viem';
import { UsePrepareContractWriteConfig, useAccount } from 'wagmi';
import frxEthMinterAbi from '@/abi/frxETHMinter';
import { ActionResponse, HeaderResponse } from '@/components/cactiComponents';
import { ConnectFirst } from '../helpers/ConnectFirst';

interface StakedFraxEtherProps {
  receiver?: string;
  value: string;
}

const StakeSfrxEth = ({ receiver, value }: StakedFraxEtherProps) => {
  const amount = parseEther(value);

  const { address: account } = useAccount();

  const tx: UsePrepareContractWriteConfig = {
    address: '0xbAFA44EFE7901E04E39Dad13167D089C559c1138', // frxETHMinter address
    abi: frxEthMinterAbi, // frxETHMinter abi
    functionName: 'submitAndDeposit',
    args: [receiver ?? account],
    value: amount,
  };

  return (
    <ConnectFirst>
      <HeaderResponse text={`Stake ${value} Ether for sfrxETH`} projectName="frax" />
      <ActionResponse
        label={`Stake ${value || ''} ETH for sfrxETH`}
        txParams={tx}
        approvalParams={undefined}
        sendParams={undefined}
      />
    </ConnectFirst>
  );
};

export default StakeSfrxEth;
