import { Fragment, useEffect, useState } from 'react';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { BigNumber } from 'ethers';
import { useAccount, useNetwork } from 'wagmi';
import { TransferButton } from '@/components/widgets/Transfer';
import { UniswapButton } from '@/components/widgets/Uniswap';
import { findTokenBySymbol, formatToWei } from '@/utils';
import { parseMessage } from '@/utils/parse-message';
import { ConnectFirst } from './widgets/wrappers/ConnectFirst';

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

const Grid = ({ children }) => {
  return (
    <div className="grid grid-cols-2 border-2 border-dotted border-slate-800 p-2">{children}</div>
  );
};

const Widgetize = (widget: Widget) => {
  const { fnName, args } = widget;
  const { chain } = useNetwork();

  const inputString = `${fnName}(${args.join(',')})`;

  try {
    switch (fnName) {
      // Transfer widget
      case 'transfer':
        const [tokenSymbol, amtString, receiver] = args;
        const amount = BigNumber.from(formatToWei(amtString));
        const tokenAddress =
          tokenSymbol === 'ETH' ? undefined : findTokenBySymbol(tokenSymbol, chain.id)?.address;
        return (
          <div className="flex w-full flex-col bg-slate-300">
            <Grid>
              <div>
                <p>
                  Transfer {amtString} {tokenSymbol} to {receiver}
                </p>{' '}
                <code className="text-xs">{inputString}</code>
              </div>
              <ConnectFirst>
                <TransferButton {...{ amount, receiver, tokenAddress }} />
              </ConnectFirst>
            </Grid>
          </div>
        );
      // Swap widget
      case 'uniswap':
        const [tokenIn, tokenOut, amountIn] = args;
        const tokenInAddress =
          tokenIn === 'ETH' ? 'ETH' : findTokenBySymbol(tokenIn, chain.id)?.address;
        const tokenOutAddress = findTokenBySymbol(tokenOut, chain.id)?.address;
        return (
          <div className="flex w-full flex-col bg-slate-300">
            <Grid>
              <div>
                <p>
                  Swap {amountIn} of {tokenIn} to {tokenOut}
                </p>{' '}
                <code className="text-xs">{inputString}</code>
              </div>
              <ConnectFirst>
                <UniswapButton
                  {...{
                    tokenIn: tokenInAddress,
                    tokenOut: tokenOutAddress,
                    amountIn: formatToWei(amountIn),
                  }}
                />
              </ConnectFirst>
            </Grid>
          </div>
        );
      default:
        return (
          <div className="inline-block bg-slate-300 p-5 text-white">
            Widget not implemented for <code>{inputString}</code>
          </div>
        );
    }
  } catch (e) {
    return <div>Error: {e.message}</div>;
  }
};
