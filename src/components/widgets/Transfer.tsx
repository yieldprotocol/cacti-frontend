import { BigNumber } from 'ethers';
import {
  erc20ABI,
  useContractWrite,
  useEnsAddress,
  usePrepareContractWrite,
  usePrepareSendTransaction,
  useSendTransaction,
} from 'wagmi';
import { Button } from '@/components/Button';
import { WidgetError } from '@/components/widgets/helpers';

interface TransferButtonProps {
  tokenAddress?: string;
  amount: BigNumber;
  receiver: string;
}

export const TransferButton = ({ tokenAddress, amount, receiver }: TransferButtonProps) => {
  if (tokenAddress) return <TransferToken {...{ tokenAddress, amount, receiver }} />;
  return <TransferEth {...{ amount, receiver }} />;
};

const TransferEth = ({ amount, receiver }: TransferButtonProps) => {
  // Resolve ENS name
  const { data: resolvedAddress } = useEnsAddress({
    name: receiver,
  });

  const { config, error } = usePrepareSendTransaction({
    request: { to: resolvedAddress ? resolvedAddress : receiver, value: amount },
  });
  const { sendTransaction } = useSendTransaction(config);

  const err: Error & { reason?: string } = error;

  return (
    <div>
      <Button disabled={!sendTransaction} onClick={() => sendTransaction?.()}>
        Send
      </Button>
      {err && <WidgetError>Error simulating transaction: {err.reason || err.message}</WidgetError>}
    </div>
  );
};

const TransferToken = ({ tokenAddress, amount, receiver }: TransferButtonProps) => {
  // Resolve ENS name
  const { data: receiverAddress } = useEnsAddress({
    name: receiver,
  });

  const { config: tokenConfig, error } = usePrepareContractWrite({
    address: tokenAddress as `0x${string}`,
    abi: erc20ABI,
    functionName: 'transfer',
    args: [receiverAddress ? receiverAddress : (receiver as `0x${string}`), amount],
  });

  const { write: tokenWrite } = useContractWrite(tokenConfig);
  const err: Error & { reason?: string } = error;

  return (
    <div>
      <Button disabled={!tokenWrite} onClick={() => tokenWrite?.()}>
        Send
      </Button>
      {err && <WidgetError>Error simulating transaction: {err.reason || err.message}</WidgetError>}
    </div>
  );
};
