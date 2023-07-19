import { parseUnits } from "ethers/lib/utils.js";
import { useEnsAddress } from "wagmi";
import { ActionResponse, HeaderResponse } from "@/components/cactiComponents";
import frxEthMinterAbi from '@/abi/frxETHMinter.json'
import { ConnectFirst } from "../helpers/ConnectFirst";
import { TxBasicParams } from '@/components/cactiComponents/hooks/useSubmitTx';

interface StakeWidgetProps {
    amtString: string;
    receiver: string;
  }
  
const StakeSfrxEth = ({ amtString, receiver }: StakeWidgetProps) => {
    const amount = parseUnits(amtString, 18);

    const { data: receiverAddress } = useEnsAddress({
        name: receiver,
      });    

    const tx: TxBasicParams = {
        address: '0xbAFA44EFE7901E04E39Dad13167D089C559c1138', // frxETHMinter address
        abi: frxEthMinterAbi, // frxETHMinter abi
        functionName: 'submitAndDeposit',
        args: [receiverAddress ? receiverAddress : (receiver as `0x${string}`), amount],
        overrides: { value: amount }
    }

    return (
        <ConnectFirst>
            <HeaderResponse text={`Stake ${amtString} Ether for sfrxETH`} projectName="frax" />
            <ActionResponse 
                label={`Stake ${amtString || ''} ETH for sfrxETH`}
                txParams={tx}
                approvalParams={undefined}
                sendParams={undefined}
            />
        </ConnectFirst>
    )
};

export default StakeSfrxEth;