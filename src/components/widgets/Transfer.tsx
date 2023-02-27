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
import { TxStatus } from '@/components/TxStatus';
import { WidgetError } from '@/components/widgets/helpers';
import { Token } from '@/types';

interface TransferButtonProps {
  token: Token;
  amount: BigNumber;
  receiver: string;
}

export const TransferButton = ({ token, amount, receiver }: TransferButtonProps) => {
  if (token.symbol === 'ETH') return <TransferEth {...{ amount, receiver }} />;
  return <TransferToken {...{ token, amount, receiver }} />;
};

const TransferEth = ({ amount, receiver }: Omit<TransferButtonProps, 'token'>) => {
  // Resolve ENS name
  const { data: resolvedAddress } = useEnsAddress({
    name: receiver,
  });

  const { config, error } = usePrepareSendTransaction({
    request: { to: resolvedAddress ? resolvedAddress : receiver, value: amount },
  });
  const { sendTransaction, isSuccess, data } = useSendTransaction(config);

  const err: Error & { reason?: string } = error;

  return (
    <div>
      {!isSuccess && (
        <Button disabled={!sendTransaction} onClick={() => sendTransaction?.()}>
          Send
        </Button>
      )}
      {isSuccess && <TxStatus hash={data?.hash} />}
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

  const { write: tokenWrite, isSuccess, data } = useContractWrite(tokenConfig);
  const err: Error & { reason?: string } = error;

  return (
    <div>
      {!isSuccess && (
        <Button disabled={!tokenWrite} onClick={() => tokenWrite?.()}>
          Send
        </Button>
      )}
      {isSuccess && <TxStatus hash={data?.hash} />}
      {err && <WidgetError>Error simulating transaction: {err.reason || err.message}</WidgetError>}
    </div>
  );
};
