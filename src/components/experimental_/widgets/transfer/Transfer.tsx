import { parseUnits, zeroPad } from 'ethers/lib/utils.js';
import { ActionResponse, HeaderResponse } from '@/components/cactiComponents';
import useToken from '@/hooks/useToken';
import { ConnectFirst } from '../helpers/ConnectFirst';
import { erc20ABI, useEnsAddress } from 'wagmi';
import { SEND_ETH_FNNAME } from '@/components/cactiComponents/hooks/useSubmitTx';
import { AddressZero } from '@ethersproject/constants';

interface TransferWidgetProps {
  inputString: string;
  tokenSymbol: string;
  amtString: string;
  receiver: string;
}

const Transfer = ({ inputString, tokenSymbol, amtString, receiver }: TransferWidgetProps) => {
  
  const {isETH, data: token } = useToken( tokenSymbol );  
  const amount = parseUnits(amtString, token?.decimals);

  // Resolve ENS name
  const { data: receiverAddress } = useEnsAddress({
      name: receiver,
  });

  if (!isETH && !token) return null; // if not eth, and there is no token - abort.

  const approval = {
    approvalAmount: amount,
    address: token!.address as `0x${string}`,
    spender: AddressZero as `0x${string}`,
    skipApproval: true,
  }

  /* tx parameters to transfer ETH */ 
  const tx = isETH ? {
    address: undefined,
    abi: undefined,
    functionName: SEND_ETH_FNNAME,
    args: [receiverAddress ? receiverAddress : (receiver as `0x${string}`), amount],
  }
   /* tx parameters to transfer an ERC20 token */
  : {
    address: token!.address as `0x${string}`,
    abi: erc20ABI,
    functionName: 'transfer',
    args: [receiverAddress ? receiverAddress : (receiver as `0x${string}`), amount],
  };

  /* TODO Transfer NFT */
  /* TODO Transfer ERC721 */

  return (
    <ConnectFirst>
      <HeaderResponse
        text={`Transfer ${amtString} ${tokenSymbol} to ${receiver} `}
        projectName="user"
      />
      <ActionResponse
        label={`Transfer ${amtString || ''}`}
        txParams={ tx }
        approvalParams= { approval }
        // stepper
        // disabled={true}
      />
    </ConnectFirst>
  );
};

export default Transfer;
