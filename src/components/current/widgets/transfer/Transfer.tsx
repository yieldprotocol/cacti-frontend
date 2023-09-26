import { useMemo } from 'react';
import { parseUnits} from 'viem';
import { erc20ABI, useAccount, useEnsAddress } from 'wagmi';
import { ActionResponse, HeaderResponse } from '@/components/cactiComponents';
import useToken from '@/hooks/useToken';
import { ConnectFirst } from '../helpers/ConnectFirst';

interface TransferWidgetProps {
  tokenSymbol: string;
  amtString: string;
  receiver: string;
}

const Transfer = ({ tokenSymbol, amtString, receiver }: TransferWidgetProps) => {
  const { address: account } = useAccount();
  const { isETH, data: token } = useToken(tokenSymbol);
  const amount = parseUnits(amtString, token?.decimals!);

  // Resolve ENS name, if needed
  const { data: addressFromName } = useEnsAddress({
    name: receiver.trimStart().slice(2) === '0x' ? undefined : receiver, // only run if string doesnt start with 0x
  });

  const receiverAddress = useMemo(() => {
    if (addressFromName) return addressFromName;
    return receiver as `0x${string}`;
  }, [addressFromName, receiver]);

  if (!isETH && !token) return null; // if not eth, and there is no token - abort.

  /* tx parameters to transfer ETH */
  const tx = {
    address: token!.address as `0x${string}`,
    abi: erc20ABI,
    functionName: 'transfer',
    args: [receiverAddress, amount],
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
        label={`Transfer ${amtString || ''} ${tokenSymbol}`}
        txParams={ isETH ? undefined : tx}
        approvalParams={undefined} // approval shouldn't be required? 
        sendParams={isETH ? { to: receiverAddress, value: amount, from: account! } : undefined}
      />
    </ConnectFirst>
  );
};

export default Transfer;
