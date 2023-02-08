import { Fragment, useEffect, useState } from 'react';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount, useNetwork } from 'wagmi';
import { TransferButton } from '@/components/widgets/Transfer';
import { UniswapButton } from '@/components/widgets/Uniswap';
import { findTokenBySymbol, formatToWei } from '@/utils';
import { parseMessage } from '@/utils/parse-message';

const Widgetize = (widget: Widget) => {
  const { fnName, args } = widget;
  const [connected, setConnected] = useState(false);
  const { isConnected } = useAccount();
  const { chain } = useNetwork();

  const inputString = `${fnName}(${args.join(',')})`;

  useEffect(() => {
    setConnected(isConnected);
  }, [isConnected]);
  if (!connected) return <ConnectButton />;

  switch (fnName) {
    case 'transfer':
      const [token, amount, receiver] = args;
      // TODO: ask for them to send token address
      const tokenAddress = token === 'ETH' ? undefined : token;
      return <TransferButton {...{ amount: formatToWei(amount), receiver, token: tokenAddress }} />;
    case 'swap':
      const [tokenIn, tokenOut, amountIn] = args;
      const tokenInAddress =
        tokenIn === 'ETH' ? 'ETH' : findTokenBySymbol(tokenIn, chain.id)?.address;
      const tokenOutAddress = findTokenBySymbol(tokenOut, chain.id)?.address;
      return (
        <UniswapButton
          {...{
            tokenIn: tokenInAddress,
            tokenOut: tokenOutAddress,
            amountIn: formatToWei(amountIn),
          }}
        />
      );
    default:
      return (
        <div className="bg-red-800 p-5 text-white">
          Widget not implemented for <code>{inputString}</code>
        </div>
      );
  }
};

export const MessageTranslator = ({ message }: { message: string }) => {
  const stringsAndWidgets = parseMessage(message);
  console.log(stringsAndWidgets);
  return (
    <div className="flex flex-col gap-3">
      {stringsAndWidgets.map((item, i) => {
        // if it's a string, just return the string in a fragment
        if (typeof item === 'string') return <Fragment key={`i${i}`}>{item}</Fragment>;
        // otherwise, let's try to translate the widget
        return Widgetize(item);
      })}
    </div>
  );
};
