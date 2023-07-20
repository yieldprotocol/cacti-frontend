import { parseUnits } from "ethers/lib/utils.js";
import { ActionResponse, HeaderResponse } from "@/components/cactiComponents";
import frxEthMinterAbi from '@/abi/frxETHMinter.json'
import { ConnectFirst } from "../helpers/ConnectFirst";
import { TxBasicParams } from '@/components/cactiComponents/hooks/useSubmitTx';
import { useAccount } from "wagmi";

interface StakedFraxEtherProps {
    receiver?: string;
    value: string;
}
  
const StakeSfrxEth = ({ receiver, value }: StakedFraxEtherProps) => {
    const amount = parseUnits(value, 18);

    const { address: account } = useAccount();

    const tx: TxBasicParams = {
        address: '0xbAFA44EFE7901E04E39Dad13167D089C559c1138', // frxETHMinter address
        abi: frxEthMinterAbi, // frxETHMinter abi
        functionName: 'submitAndDeposit',
        args: [receiver ?? account],
        overrides: { value: amount }
    }

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
    )
};

export default StakeSfrxEth;