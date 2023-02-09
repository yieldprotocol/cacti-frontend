import { Fragment } from 'react';
import { BigNumber } from 'ethers';
import { TransferButton } from '@/components/widgets/Transfer';
import { UniswapButton } from '@/components/widgets/Uniswap';
import { formatToWei } from '@/utils';
import { parseMessage } from '@/utils/parse-message';
import { ConnectFirst } from './widgets/helpers/ConnectFirst';

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
  const { fnName: fn, args } = widget;
  const fnName = fn.toLowerCase();
  const inputString = `${fnName}(${args.join(',')})`;

  try {
    switch (fnName) {
      // Transfer widget
      case 'transfer':
        const [tokenSymbol, amtString, receiver] = args;
        const amount = BigNumber.from(formatToWei(amtString));
        return (
          <div className="flex w-full flex-col bg-slate-500">
            <Grid>
              <div>
                <p>
                  Transfer {amtString} {tokenSymbol} to {receiver}
                </p>{' '}
                <code className="text-xs">{inputString}</code>
              </div>
              <ConnectFirst>
                <TransferButton {...{ amount, receiver, tokenSymbol }} />
              </ConnectFirst>
            </Grid>
          </div>
        );
      // Swap widget
      case 'uniswap':
        const [tokenInSymbol, tokenOutSymbol, buyOrSell, amountIn] = args;

        return (
          <div className="flex w-full flex-col bg-slate-500">
            <Grid>
              <div>
                <p>
                  Swap {amountIn} of {tokenInSymbol} to {tokenOutSymbol}
                </p>{' '}
                <code className="text-xs">{inputString}</code>
              </div>
              <ConnectFirst>
                <UniswapButton
                  {...{
                    tokenInSymbol,
                    tokenOutSymbol,
                    amountIn: BigNumber.from(formatToWei(amountIn)),
                  }}
                />
              </ConnectFirst>
            </Grid>
          </div>
        );
      default:
        return (
          <div className="inline-block bg-slate-500 p-5 text-white">
            Widget not implemented for <code>{inputString}</code>
          </div>
        );
    }
  } catch (e) {
    return (
      <div className="grid grid-cols-2 bg-slate-500 p-5 text-white">
        <div>
          <code>{inputString}</code>
        </div>
        <div>Error: {e.message}</div>
      </div>
    );
  }
};
