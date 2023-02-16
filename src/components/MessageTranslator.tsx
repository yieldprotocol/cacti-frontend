import { Fragment } from 'react';
import { parseUnits } from 'ethers/lib/utils.js';
import { useNetwork } from 'wagmi';
import { TransferButton } from '@/components/widgets/Transfer';
import { UniswapButton } from '@/components/widgets/Uniswap';
import { findTokenBySymbol, formatToEther } from '@/utils';
import { parseMessage } from '@/utils/parse-message';
import { NftSearch } from './widgets/NftSearch';
import { ActionPanel } from './widgets/helpers/ActionPanel';
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

const Widgetize = (widget: Widget) => {
  const { fnName: fn, args } = widget;
  const fnName = fn.toLowerCase();
  const inputString = `${fnName}(${args.join(',')})`;
  const { chain } = useNetwork();

  try {
    switch (fnName) {
      // Transfer widget
      case 'transfer':
        const [tokenSymbol, amtString, receiver] = args;
        const isEth = tokenSymbol === 'ETH';
        const token = isEth
          ? { address: undefined, decimals: 18 }
          : findTokenBySymbol(tokenSymbol, chain.id);
        const tokenAddress = token.address;
        const amount = parseUnits(amtString, token.decimals);

        return (
          <ActionPanel
            header={`Transfer ${amtString} ${tokenSymbol} to ${receiver}`}
            msg={inputString}
          >
            <ConnectFirst>
              <TransferButton {...{ amount, receiver, tokenAddress }} />
            </ConnectFirst>
          </ActionPanel>
        );
      // Swap widget
      case 'uniswap':
        const [tokenInSymbol, tokenOutSymbol, buyOrSell, amountInString] = args;

        const tokenIn =
          tokenInSymbol === 'ETH'
            ? { address: 'undefined', decimals: 18 }
            : findTokenBySymbol(tokenInSymbol, chain.id);
        const tokenOut =
          tokenOutSymbol === 'ETH'
            ? findTokenBySymbol('WETH', chain.id)
            : findTokenBySymbol(tokenOutSymbol, chain.id);
        const tokenInAddress = tokenIn.address;
        const tokenOutAddress = tokenOut.address;

        const amountIn = parseUnits(amountInString, tokenIn.decimals);

        return (
          <ActionPanel
            header={`Swap ${formatToEther(
              amountIn.toString()
            )} of ${tokenInSymbol} to ${tokenOutSymbol}`}
            msg={inputString}
          >
            <ConnectFirst>
              <UniswapButton
                {...{
                  tokenInAddress,
                  tokenOutAddress,
                  amountIn: amountIn,
                }}
              />
            </ConnectFirst>
          </ActionPanel>
        );
      case 'nftsearch':
        const [query] = args;
        return (
          <ActionPanel header={`Query for ${query} NFTs`} msg={inputString}>
            <NftSearch {...{ query }} />
          </ActionPanel>
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
