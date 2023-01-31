import { useEffect, useState } from 'react';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount } from 'wagmi';
import { parseMessage } from '@/utils/parse-message';
import { TransferButton } from './TransferButton';

const Widgetize = (widget: Widget) => {
  const { fnName, args } = widget;
  const [connected, setConnected] = useState(false);
  const { isConnected } = useAccount();

  useEffect(() => {
    setConnected(isConnected);
  }, [isConnected]);
  if (!connected) return <ConnectButton />;

  switch (fnName) {
    case 'transfer':
      const [token, amount, receiver] = args;
      // TODO: ask for them to send token address
      const tokenAddress = token === 'ETH' ? undefined : 'not implemented';
      return <TransferButton {...{ amount, receiver, token: tokenAddress }} />;
    default:
      return (
        <div className="bg-red-800 p-5 text-white">
          Widget not implemented for{' '}
          <code>
            {fnName}({args.join(',')})
          </code>
        </div>
      );
  }
};

export const MessageTranslator = ({ message }: { message: string }) => {
  const stringsAndWidgets = parseMessage(message);
  console.log(stringsAndWidgets);
  return (
    <div className="flex flex-col gap-3">
      {stringsAndWidgets.map((item) => {
        // if it's a string, just return the string in a fragment
        if (typeof item === 'string') return <>{item}</>;
        // otherwise, let's try to translate the widget
        return Widgetize(item);
      })}
    </div>
  );
};
