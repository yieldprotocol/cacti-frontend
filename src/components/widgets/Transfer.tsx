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
import { Token } from '@/types/index.d';

interface TransferButtonProps {
  token?: Token;
  amount: BigNumber;
  receiver: string;
}

export const TransferButton = ({ token, amount, receiver }: TransferButtonProps) => {
  if (token.symbol === 'ETH') return <TransferEth {...{ amount, receiver }} />;
  return <TransferToken {...{ token, amount, receiver }} />;
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

const TransferToken = ({ token, amount, receiver }: TransferButtonProps) => {
  // Resolve ENS name
  const { data: receiverAddress } = useEnsAddress({
    name: receiver,
  });

  const { config: tokenConfig, error } = usePrepareContractWrite({
    address: token.address as `0x${string}`,
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
