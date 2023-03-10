import { Fragment } from 'react';
import { formatUnits, parseUnits } from 'ethers/lib/utils.js';
import { Chain, useNetwork } from 'wagmi';
import { Price } from '@/components/widgets/Price';
import { TransferButton } from '@/components/widgets/Transfer';
import { UniswapButton } from '@/components/widgets/Uniswap';
import { findTokenBySymbol, shortenAddress } from '@/utils';
import { parseMessage } from '@/utils/parse-message';
import {
  NftAttributes,
  NftCollectionAttributes,
  NftsWithAttributes,
} from './widgets/NftAttributes';
import { NftSearch } from './widgets/NftSearch';
import { ActionPanel } from './widgets/helpers/ActionPanel';
import { ConnectFirst } from './widgets/helpers/ConnectFirst';

export const MessageTranslator = ({ message }: { message: string }) => {
  const { chain } = useNetwork();
  const stringsAndWidgets = parseMessage(message);
  return (
    <div className="flex flex-col gap-3">
      {stringsAndWidgets.map((item, i) => {
        // if it's a string, just return the string in a fragment
        if (typeof item === 'string') return <Fragment key={`i${i}`}>{item}</Fragment>;
        // otherwise, let's try to translate the widget
        return Widgetize(item, chain);
      })}
    </div>
  );
};

const Widgetize = (widget: Widget, chain: Chain) => {
  const { fnName: fn, args } = widget;
  const fnName = fn.toLowerCase().replace('display-', '');
  const inputString = `${fnName}(${args.join(',')})`;
  const chainId = chain?.id || 36963;

  try {
    switch (fnName) {
      // Transfer widget
      case 'transfer':
        const [tokenSymbol, amtString, receiver] = args;
        const isEth = tokenSymbol === 'ETH';
        const token = isEth
          ? { address: '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE', symbol: 'ETH', decimals: 18 }
          : findTokenBySymbol(tokenSymbol, chainId);
        const amount = parseUnits(amtString, token.decimals);
        return (
          <ActionPanel
            header={`Transfer ${amtString} ${tokenSymbol} to ${receiver}`}
            msg={inputString}
            key={inputString}
          >
            <ConnectFirst>
              <TransferButton {...{ amount, receiver, token }} />
            </ConnectFirst>
          </ActionPanel>
        );
      // Swap widget
      case 'uniswap':
        const [tokenInSymbol, tokenOutSymbol, buyOrSell, amountInString] = args;

        const tokenIn =
          tokenInSymbol === 'ETH'
            ? { address: '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE', symbol: 'ETH', decimals: 18 }
            : findTokenBySymbol(tokenInSymbol, chainId);
        const tokenOut =
          tokenOutSymbol === 'ETH'
            ? { address: '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE', symbol: 'ETH', decimals: 18 }
            : findTokenBySymbol(tokenOutSymbol, chainId);

        const amountIn = parseUnits(amountInString, tokenIn.decimals);

        return (
          <ActionPanel
            header={`Swap ${formatUnits(
              amountIn.toString(),
              tokenIn.decimals
            )} of ${tokenInSymbol} to ${tokenOutSymbol}`}
            msg={inputString}
            key={inputString}
          >
            <ConnectFirst>
              <UniswapButton
                {...{
                  tokenIn,
                  tokenOut,
                  amountIn,
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
      case 'price':
        const [baseToken, queryToken] = args;
        return (
          <ActionPanel
            header={`Query for ${baseToken} in terms of ${queryToken}`}
            msg={inputString}
          >
            <Price baseToken={baseToken} queryToken={queryToken} />
          </ActionPanel>
        );
      case 'nfttraits':
        const [nftAddress, tokenID] = args;
        return (
          <ActionPanel
            key={inputString}
            header={`Query for NFT ${shortenAddress(nftAddress)}:${tokenID} traits`}
            msg={inputString}
          >
            <NftAttributes nftAddress={nftAddress} tokenID={tokenID} />
          </ActionPanel>
        );
      case 'nftcollectiontraits':
        const [nftCollectionAddress] = args;
        return <NftCollectionAttributes nftAddress={nftCollectionAddress} />;
      case 'nftsbytraits':
        const [nftAddr, traitType, traitValue] = args;
        return (
          <ActionPanel
            key={inputString}
            header={`Query for NFTs with Moon Hat traits`}
            msg={`Headwear, Moon Hat`}
          >
            <NftsWithAttributes
              nftAddress={nftAddr}
              traitType={traitType}
              traitValue={traitValue}
            />
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
