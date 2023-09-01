import { BigNumber } from 'ethers';
import { parseUnits } from 'ethers/lib/utils.js';
import {
  erc20ABI,
  useContractWrite,
  useEnsAddress,
  usePrepareContractWrite,
  usePrepareSendTransaction,
  useSendTransaction,
} from 'wagmi';
import { WidgetError } from '@/components/legacy/legacyWidgets/helpers';
import useToken from '@/hooks/useToken';
import { Token } from '@/types';
import { shortenAddress } from '@/utils';
import { ActionPanel } from './helpers/ActionPanel';
import { ConnectFirst } from './helpers/ConnectFirst';
import { Button } from '@/components/shared/Button';
import { TxStatus } from '../legacyComponents/TxStatus';

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

  const { config, error: err } = usePrepareSendTransaction({
    request: { to: resolvedAddress ? resolvedAddress : receiver, value: amount },
  });
  const { sendTransaction, isSuccess, data } = useSendTransaction(config);

  return (
    <div>
      {!isSuccess && (
        <Button disabled={!sendTransaction} onClick={() => sendTransaction?.()}>
          Send
        </Button>
      )}
      {isSuccess && <TxStatus hash={data?.hash!} />}
      {err && <WidgetError>Error simulating transaction: {err.message}</WidgetError>}
    </div>
  );
};

const TransferToken = ({ token, amount, receiver }: TransferButtonProps) => {
  // Resolve ENS name
  const { data: receiverAddress } = useEnsAddress({
    name: receiver,
  });

  const { config: tokenConfig, error: err } = usePrepareContractWrite({
    address: token.address as `0x${string}`,
    abi: erc20ABI,
    functionName: 'transfer',
    args: [receiverAddress ? receiverAddress : (receiver as `0x${string}`), amount],
  });

  const { write: tokenWrite, isSuccess, data } = useContractWrite(tokenConfig);

  return (
    <div>
      {!isSuccess && (
        <Button disabled={!tokenWrite} onClick={() => tokenWrite?.()}>
          Send
        </Button>
      )}
      {isSuccess && <TxStatus hash={data?.hash!} />}
      {err && <WidgetError>Error simulating transaction: {err.message}</WidgetError>}
    </div>
  );
};

interface TransferWidgetProps {
  inputString: string;
  tokenSymbol: string;
  amtString: string;
  receiver: string;
}

export const TransferWidget = ({
  inputString,
  tokenSymbol,
  amtString,
  receiver,
}: TransferWidgetProps) => {
  const { getToken } = useToken();
  const token = getToken(tokenSymbol);
  const amount = parseUnits(amtString, token?.decimals);
  return (
    <ActionPanel
      header={`Transfer ${amtString} ${tokenSymbol} to ${shortenAddress(receiver)}`}
      msg={`transfer(${tokenSymbol},${amtString},${shortenAddress(receiver)})`}
      key={inputString}
      centerTitle={true}
    >
      <div className="flex w-[100%] justify-end">
        <ConnectFirst>
          <TransferButton {...{ amount, receiver, token: token! }} />
        </ConnectFirst>
      </div>
    </ActionPanel>
  );
};
