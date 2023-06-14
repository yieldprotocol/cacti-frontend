import { AddressZero } from '@ethersproject/constants';
import { parseUnits, zeroPad } from 'ethers/lib/utils.js';
import { erc20ABI, useAccount, useEnsAddress } from 'wagmi';
import { ActionResponse, HeaderResponse } from '@/components/cactiComponents';
import { SEND_ETH_FNNAME } from '@/components/cactiComponents/hooks/useSubmitTx';
import useToken from '@/hooks/useToken';
import { ConnectFirst } from '../helpers/ConnectFirst';

interface TransferWidgetProps {
  inputString: string;
  tokenSymbol: string;
  amtString: string;
  receiver: string;
}

const Transfer = ({ inputString, tokenSymbol, amtString, receiver }: TransferWidgetProps) => {
  const { address: account } = useAccount();
  const { isETH, data: token } = useToken(tokenSymbol);
  const amount = parseUnits(amtString, token?.decimals);

  // Resolve ENS name
  const { data: receiverAddress } = useEnsAddress({
    name: receiver,
  });

  if (!isETH && !token) return null; // if not eth, and there is no token - abort.

  const approval = {
    approvalAmount: amount,
    tokenAddress: token!.address as `0x${string}`,
    spender: AddressZero as `0x${string}`,
    skipApproval: true,
  };

  /* tx parameters to transfer ETH */
  const tx = isETH
    ? {
        address: undefined,
        abi: undefined,
        functionName: SEND_ETH_FNNAME,
        args: [receiverAddress ? receiverAddress : (receiver as `0x${string}`), amount],
      }
    : /* tx parameters to transfer an ERC20 token */
      {
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
        txParams={tx}
        approvalParams={approval}
        sendParams={isETH ? { to: receiverAddress, from: account, value: amount } : undefined}
        // stepper
        // disabled={true}
      />
    </ConnectFirst>
  );
};

export default Transfer;
