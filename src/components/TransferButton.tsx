import { BigNumber, utils } from 'ethers';
import {
  erc20ABI,
  useAccount,
  useBalance,
  useContractRead,
  useContractWrite,
  useEnsAddress,
  usePrepareContractWrite,
  usePrepareSendTransaction,
  useSendTransaction,
} from 'wagmi';
import { Button } from '@/components/Button';
import { shortenAddress } from '@/utils';

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

  const { config } = usePrepareSendTransaction({
    request: { to: resolvedAddress ? resolvedAddress : receiver, value: BigNumber.from(amount) },
  });
  const { sendTransaction } = useSendTransaction(config);

  const { address } = useAccount();

  // Check Balance
  const { data: balance } = useBalance({
    address: address,
  });
  if (balance && BigNumber.from(balance.value) < BigNumber.from(amount))
    return <Button>Not enough ETH</Button>;

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

  const { config: tokenConfig } = usePrepareContractWrite({
    address: token as `0x${string}`,
    abi: erc20ABI,
    functionName: 'transfer',
    args: [receiverAddress ? receiverAddress : (receiver as `0x${string}`), BigNumber.from(amount)],
  });

  const { write: tokenWrite } = useContractWrite(tokenConfig);
  const { address } = useAccount();

  // Get token symbol
  const { data: tokenSymbol, isFetchedAfterMount } = useContractRead({
    address: token as `0x${string}`,
    abi: erc20ABI,
    functionName: 'symbol',
  });

  // Check Balance
  const { data: tokenBalance } = useContractRead({
    address: token as `0x${string}`,
    abi: erc20ABI,
    functionName: 'balanceOf',
    args: [address],
  });
  if (tokenBalance && tokenBalance < BigNumber.from(amount)) {
    return <Button>Not enough {tokenSymbol}</Button>;
  }

  return (
    <div>
      <Button disabled={!tokenWrite} onClick={() => tokenWrite?.()}>
        Send {utils.formatEther(amount)} {isFetchedAfterMount ? tokenSymbol : 'token'} to{' '}
        {receiverAddress ? receiver : shortenAddress(receiver)}
      </Button>
    </div>
  );
};
