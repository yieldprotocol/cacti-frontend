import { Fragment, useEffect } from 'react';
import Grid from '@/components/Grid';
import {
  NftAssetContainer,
  NftAssetTraitValueContainer,
  NftAssetTraitsContainer,
} from '@/components/widgets/NftAssetContainer';
import {
  NftCollectionAssetsContainer,
  NftCollectionContainer,
  NftCollectionTraitValuesContainer,
  NftCollectionTraitsContainer,
} from '@/components/widgets/NftCollectionContainer';
import { Price } from '@/components/widgets/Price';
import { TransferWidget } from '@/components/widgets/Transfer';
import {
  ListItem,
  SharedStateContextProvider,
  useSharedStateContext,
} from '@/contexts/SharedStateContext';
import useParseMessage from '@/hooks/useParseMessage';
import { shortenAddress } from '@/utils';
import { BuyNFT } from './widgets/BuyNFT';
import { MultiStepContainer } from './widgets/MultiStepContainer';
import {
  NftAttributes,
  NftCollectionAttributes,
  NftsWithAttributes,
} from './widgets/NftAttributes';
import { NftSearch } from './widgets/NftSearch';
import { SendTransactionWithReplayMsg } from './widgets/SendTransactionWithReplayMsg';
import { YieldFarmWidget } from './widgets/YieldFarm';
import { YieldRowContainer } from './widgets/YieldRowContainer';
import { ActionPanel } from './widgets/helpers/ActionPanel';
import { ConnectFirst } from './widgets/helpers/ConnectFirst';
import { SwapWidget } from './widgets/swap/SwapWidget';

export const MessageTranslator = ({ message }: { message: string }) => {
  const stringsAndWidgets = useParseMessage(message);
  return (
    <SharedStateContextProvider>
      <div className="flex flex-col gap-3">
        {stringsAndWidgets.map((item, i) => {
          return (
            <Fragment key={`i${i}`}>
              {
                // if it's a string, just return the string
                // otherwise, let's try to translate the widget
                typeof item === 'string' ? item : Widgetize(item)
              }
            </Fragment>
          );
        })}
      </div>
    </SharedStateContextProvider>
  );
};

const parseArgsStripQuotes = (args: string): any[] => {
  return args
    ? JSON.parse(
        JSON.stringify(args.split(',').map((str) => str.trim().replaceAll(RegExp(/['"]/g), '')))
      )
    : [];
};

export const Widgetize = (widget: Widget) => {
  const { fnName: fn, args } = widget;
  const fnName = fn.toLowerCase().replace('display-', '');
  const inputString = `${fnName}(${args})`;
  // The Widgetize function is called recursively. Do not put any hooks here,
  // as it will cause problems with React rendering when there are multiple
  // widgets in a line or nested widgets. Instead, create a component for
  // the widget and put the hook inside that component.

  try {
    switch (fnName) {
      // Transfer widget
      case 'transfer': {
        const [tokenSymbol, amtString, receiver] = parseArgsStripQuotes(args);
        return <TransferWidget {...{ inputString, tokenSymbol, amtString, receiver }} />;
      }
      // Swap widget
      case 'uniswap': {
        const [tokenInSymbol, tokenOutSymbol, buyOrSell, amountInStrRaw] =
          parseArgsStripQuotes(args);
        return <SwapWidget {...{ tokenInSymbol, tokenOutSymbol, buyOrSell, amountInStrRaw }} />;
      }
      case 'yield-farm': {
        const [projectName, network, tokenSymbol, amtString] = parseArgsStripQuotes(args);
        return (
          <YieldFarmWidget {...{ inputString, projectName, network, tokenSymbol, amtString }} />
        );
      }
      case 'price': {
        const [baseToken, queryToken] = parseArgsStripQuotes(args);
        return (
          <ActionPanel
            header={`Query for ${baseToken} in terms of ${queryToken}`}
            msg={inputString}
            centerTitle={true}
          >
            <div className="flex w-[100%] justify-end">
              <Price baseToken={baseToken} queryToken={queryToken} />
            </div>
          </ActionPanel>
        );
      }
      case 'nft-traits': {
        const [nftAddress, tokenID] = parseArgsStripQuotes(args);
        return (
          <ActionPanel
            key={inputString}
            header={`Query for NFT ${shortenAddress(nftAddress)}:${tokenID} traits`}
            msg={inputString}
          >
            <NftAttributes nftAddress={nftAddress} tokenID={tokenID} />
          </ActionPanel>
        );
      }
      case 'nft-collection-traits': {
        const [nftCollectionAddress] = parseArgsStripQuotes(args);
        return <NftCollectionAttributes nftAddress={nftCollectionAddress} />;
      }
      case 'nfts-by-traits': {
        const [nftAddr, traitType, traitValue] = parseArgsStripQuotes(args);
        return (
          <ActionPanel
            key={inputString}
            direction="col"
            header={`Query for NFTs with ${traitValue} ${traitType}`}
            msg={`Query for ${shortenAddress(nftAddr)} with ${traitValue} ${traitType}`}
          >
            <NftsWithAttributes
              nftAddress={nftAddr}
              traitType={traitType}
              traitValue={traitValue}
            />
          </ActionPanel>
        );
      }
      case 'nft-search': {
        const query = args;
        return (
          <ActionPanel header={`Query for ${query} NFTs`} msg={inputString} direction="col">
            <NftSearch {...{ query }} />
          </ActionPanel>
        );
      }
      case 'buy-nft': {
        const [buyNftAddress, buyTokenID] = parseArgsStripQuotes(args);
        return (
          <ActionPanel
            header={`Buy NFTs ${shortenAddress(buyNftAddress)} ${buyTokenID}`}
            msg={inputString}
            direction="col"
          >
            <BuyNFT nftAddress={buyNftAddress} tokenId={buyTokenID} />
          </ActionPanel>
        );
      }
      case 'nft-collection-container': {
        let params;
        try {
          params = JSON.parse(args);
        } catch (e) {
          const [network, address, name, numAssets, previewImageUrl] = parseArgsStripQuotes(args);
          params = { network, address, name, numAssets, previewImageUrl };
        }
        return <NftCollectionContainer {...params} />;
      }
      case 'nft-asset-container': {
        let params;
        try {
          params = JSON.parse(args);
        } catch (e) {
          const [network, address, tokenId, collectionName, name, previewImageUrl, price] =
            parseArgsStripQuotes(args);
          params = { network, address, tokenId, collectionName, name, previewImageUrl, price };
        }
        return <NftAssetContainer {...params} />;
      }
      case 'nft-asset-traits-container': {
        const { asset, values } = JSON.parse(args);
        return (
          <NftAssetTraitsContainer
            asset={Widgetize({ fnName: asset.name, args: JSON.stringify(asset.params) })}
          >
            {values?.map(({ name, params }: { name: string; params: string }, i: number) => (
              <Fragment key={`i${i}`}>
                {Widgetize({ fnName: name, args: JSON.stringify(params) })}
              </Fragment>
            )) || ''}
          </NftAssetTraitsContainer>
        );
      }
      case 'nft-asset-trait-value-container': {
        const params = JSON.parse(args);
        return <NftAssetTraitValueContainer {...params} />;
      }
      case 'nft-collection-assets-container': {
        const { collection, assets } = JSON.parse(args);
        return (
          <NftCollectionAssetsContainer
            collection={Widgetize({
              fnName: collection.name,
              args: JSON.stringify(collection.params),
            })}
          >
            <div className="text-black">
              <Grid>
                {assets?.map(({ name, params }: { name: string; params: string }, i: number) => (
                  <Fragment key={`i${i}`}>
                    {Widgetize({ fnName: name, args: JSON.stringify(params) })}
                  </Fragment>
                )) || ''}
              </Grid>
            </div>
          </NftCollectionAssetsContainer>
        );
      }
      case 'nft-collection-traits-container': {
        const params = JSON.parse(args);
        return <NftCollectionTraitsContainer {...params} />;
      }
      case 'nft-collection-trait-values-container': {
        const params = JSON.parse(args);
        return <NftCollectionTraitValuesContainer {...params} />;
      }
      case 'yield-container': {
        const params = JSON.parse(args);

        return <YieldRowContainer {...params} />;
      }
      case 'list-container': {
        const params = JSON.parse(args);
        return <ListContainer {...params} />;
      }
      case 'streaming-list-container': {
        const params = JSON.parse(args);
        return <StreamingListContainer {...params} />;
      }
      case 'table-container': {
        const params = JSON.parse(args);
        const headers = params.headers;
        const rows = params.rows;
        return (
          <table className="table-auto border border-gray-500">
            <thead className="bg-gray-800 text-left">
              <tr className="border-b border-gray-400">
                {headers.map(({ displayName }: { displayName: string }, i: number) => (
                  <th className="px-2 py-1" key={`i${i}`}>
                    {displayName}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map(({ name, params }: { name: string; params: string }, i: number) => {
                const rowArgs = {
                  headers,
                  rowParams: params,
                };
                return (
                  <Fragment key={`i${i}`}>
                    {Widgetize({ fnName: name, args: JSON.stringify(rowArgs) })}
                  </Fragment>
                );
              })}
            </tbody>
          </table>
        );
      }
      case 'tx-payload-for-sending-container': {
        const { userRequestStatus, parsedUserRequest, tx, isApprovalTx, errorMsg, description } =
          JSON.parse(args);

        return (
          <ActionPanel header={description} msg={inputString} key={inputString} centerTitle={true}>
            <div className="flex w-[100%] justify-end">
              <ConnectFirst>
                <SendTransactionWithReplayMsg
                  {...{
                    userRequestStatus,
                    tx,
                    isApprovalTx,
                    errorMsg,
                    parsedUserRequest,
                    description,
                  }}
                />
              </ConnectFirst>
            </div>
          </ActionPanel>
        );
      }
      case 'multistep-payload-container': {
        const {
          status,
          workflowId,
          workflowType,
          stepId,
          stepType,
          stepNumber,
          isFinalStep,
          userActionType,
          tx,
          errorMsg,
          description,
        } = JSON.parse(args);

        const headerText =
          stepNumber === 1 && isFinalStep ? description : `Step ${stepNumber}: ${description}`;

        return (
          <ActionPanel header={headerText} msg={inputString} key={inputString} centerTitle={true}>
            <div className="flex w-[100%] justify-end">
              <ConnectFirst>
                <MultiStepContainer
                  {...{
                    status,
                    workflowId,
                    workflowType,
                    stepId,
                    stepType,
                    userActionType,
                    stepNumber,
                    isFinalStep,
                    tx,
                    errorMsg,
                    description,
                  }}
                />
              </ConnectFirst>
            </div>
          </ActionPanel>
        );
      }
      default:
        return (
          <div className="inline-block bg-slate-500 p-5 text-white">
            Widget not implemented for <code>{inputString}</code>
          </div>
        );
    }
  } catch (e: any) {
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

interface ListContainerProps {
  items: ListItem[];
}
interface ListItemContainerProps {
  item: ListItem;
}

const ListContainer = ({ items }: ListContainerProps) => {
  return (
    <div className="text-black">
      <Grid>
        {items?.map(({ name, params }: { name: string; params: string }, i: number) => (
          <Fragment key={`i${i}`}>
            {Widgetize({ fnName: name, args: JSON.stringify(params) })}
          </Fragment>
        )) || ''}
      </Grid>
    </div>
  );
};

interface StreamingListContainerProps {
  operation: string;
  item: ListItem | null;
  prefix: string | null;
  suffix: string | null;
  isThinking: boolean | null;
}

const StreamingListContainer = ({
  operation,
  item,
  prefix: newPrefix,
  suffix: newSuffix,
  isThinking: newIsThinking,
}: StreamingListContainerProps) => {
  const { items, setItems, prefix, setPrefix, suffix, setSuffix, isThinking, setIsThinking } =
    useSharedStateContext();
  useEffect(() => {
    const timer = setTimeout(() => {
      // handle list items
      if (operation === 'create') {
        setItems([]);
      } else if (operation === 'append' && item) {
        setItems((items) => {
          return [...items, item];
        });
      }
      // handle prefix/suffix/isThinking
      if (operation === 'create' || operation === 'update') {
        if (newPrefix != null) {
          setPrefix(newPrefix);
        }
        if (newSuffix != null) {
          setSuffix(newSuffix);
        }
        if (newIsThinking != null) {
          setIsThinking(newIsThinking);
        }
      }
    }, 0);
    return () => clearTimeout(timer);
  }, []);
  if (operation === 'create') {
    return (
      <div className="p-3 text-white">
        <span className={`${isThinking ? 'after:animate-ellipse' : ''}`}>{prefix}</span>
        <ListContainer items={items} />
        <span>{suffix}</span>
      </div>
    );
  }
  return null;
};
