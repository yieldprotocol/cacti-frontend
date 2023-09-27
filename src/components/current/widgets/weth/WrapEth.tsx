import { parseEther } from 'viem';
import { UsePrepareContractWriteConfig } from 'wagmi';
import wethAbi from '@/abi/weth';
import { ActionResponse, HeaderResponse } from '@/components/cactiComponents';
import { ConnectFirst } from '../helpers/ConnectFirst';

const WrapEth = ({ amtString }: { amtString: string }) => {
  const amount = parseEther(amtString);

  const tx: UsePrepareContractWriteConfig = {
    address: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2', //weth addrss
    abi: wethAbi, // weth abi
    functionName: 'deposit', // wrap eth
    args: [],
    value: amount!,
  };

  return (
    <ConnectFirst>
      <HeaderResponse text={`Wrap ${amtString} Ether`} projectName="weth" />
      <ActionResponse
        label={`Wrap ${amtString || ''} ETH`}
        txParams={tx}
        approvalParams={undefined}
        sendParams={undefined}
      />
    </ConnectFirst>
  );
};

export default WrapEth;
