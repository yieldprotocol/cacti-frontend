import { BigNumber, utils } from 'ethers';
import {
  erc20ABI,
  useAccount,
  useContractWrite,
  useEnsAddress,
  useNetwork,
  usePrepareContractWrite,
  usePrepareSendTransaction,
  useSendTransaction,
} from 'wagmi';
import { Button } from '@/components/Button';
import { findTokenByAddress, shortenAddress } from '@/utils';

interface TransferButtonProps {
  token?: string;
  amount: string; // assume it's in raw decimal format
  receiver: string;
}

export const TransferButton = (props: TransferButtonProps) => {
  if (props.token) return <TransferToken {...props} />;
  return <TransferEth {...props} />;
};

const TransferEth = ({ amount, receiver }: TransferButtonProps) => {
  // Resolve ENS name
  const { data: resolvedAddress } = useEnsAddress({
    name: receiver,
  });

  const { config, error } = usePrepareSendTransaction({
    request: { to: resolvedAddress ? resolvedAddress : receiver, value: BigNumber.from(amount) },
  });
  const { sendTransaction } = useSendTransaction(config);

  if (error) {
    const err: Error & { reason?: string } = error;
    return <Button disabled={!sendTransaction}>Error: {err.reason || err.message}</Button>;
  }

  return (
    <div>
      <Button disabled={!sendTransaction} onClick={() => sendTransaction?.()}>
        Send {utils.formatEther(amount)} ETH to{' '}
        {resolvedAddress ? receiver : shortenAddress(receiver)}
      </Button>
    </div>
  );
};

const TransferToken = ({ token, amount, receiver }: TransferButtonProps) => {
  // Resolve ENS name
  const { data: receiverAddress } = useEnsAddress({
    name: receiver,
  });
  const { chain } = useNetwork();

  const { config: tokenConfig, error } = usePrepareContractWrite({
    address: token as `0x${string}`,
    abi: erc20ABI,
    functionName: 'transfer',
    args: [receiverAddress ? receiverAddress : (receiver as `0x${string}`), BigNumber.from(amount)],
  });

  const { write: tokenWrite } = useContractWrite(tokenConfig);

  if (error) {
    const err: Error & { reason?: string } = error;
    return <Button disabled={!tokenWrite}>{err.reason || err.message}</Button>;
  }

  return (
    <div>
      <Button disabled={!tokenWrite} onClick={() => tokenWrite?.()}>
        Send {utils.formatEther(amount)} {findTokenByAddress(token, chain.id)?.symbol || token} to{' '}
        {receiverAddress ? receiver : shortenAddress(receiver)}
      </Button>
    </div>
  );
};
