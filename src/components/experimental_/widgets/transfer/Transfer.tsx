import { parseUnits } from 'ethers/lib/utils.js';
import { ActionResponse, HeaderResponse } from '@/components/cactiComponents';
import { TransferButton } from '@/components/widgets/Transfer';
import { ActionPanel } from '@/components/widgets/helpers/ActionPanel';
import useToken from '@/hooks/useToken';
import { shortenAddress } from '@/utils';
import { ConnectFirst } from '../helpers/ConnectFirst';
import { erc20ABI, useEnsAddress } from 'wagmi';
import { SEND_ETH_FNNAME } from '@/components/cactiComponents/hooks/useSubmitTx';

interface TransferWidgetProps {
  inputString: string;
  tokenSymbol: string;
  amtString: string;
  receiver: string;
}

const Transfer = ({ inputString, tokenSymbol, amtString, receiver }: TransferWidgetProps) => {
  
  const { getToken, getTokenIsETH } = useToken();
  const token = getToken(tokenSymbol);
  const isEth = getTokenIsETH();
  if (!isEth && !token) return null; // if not eth, and there is no token - abort.

  const amount = parseUnits(amtString, token?.decimals);

  // Resolve ENS name
  const { data: receiverAddress } = useEnsAddress({
      name: receiver,
  });

  /* tx parameters to transfer ETH */ 
  const tx = isEth ? {
    address: receiverAddress ? receiverAddress : (receiver as `0x${string}`),
    abi: undefined,
    functionName: SEND_ETH_FNNAME,
    args: [amount],
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
        // approvalParams={approval}
        // stepper
        // disabled={true}
      />
    </ConnectFirst>
  );
};

export default Transfer;
