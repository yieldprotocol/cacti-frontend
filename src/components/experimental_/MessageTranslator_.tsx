import { Fragment, createElement, useEffect, useState } from 'react';
import { formatUnits, parseUnits } from 'ethers/lib/utils.js';
import { useNetwork } from 'wagmi';
import { SendTransactionWithReplayMsg } from '@/components//widgets/SendTransactionWithReplayMsg';
import { YieldFarm } from '@/components//widgets/YieldFarm';
import { YieldRowContainer } from '@/components//widgets/YieldRowContainer';
import { ActionPanel } from '@/components//widgets/helpers/ActionPanel';
import { ConnectFirst } from '@/components//widgets/helpers/ConnectFirst';
import Grid from '@/components/Grid';
import * as cw3Components from '@/components/cw3Components';
import { Cw3Component } from '@/components/cw3Components';
import { BuyNFT } from '@/components/widgets/BuyNFT';
import { MultiStepContainer } from '@/components/widgets/MultiStepContainer';
import {
  NftAssetContainer,
  NftAssetTraitValueContainer,
  NftAssetTraitsContainer,
} from '@/components/widgets/NftAssetContainer';
import {
  NftCollectionAssetsContainer,
  NftCollectionContainer,
  NftCollectionTraitContainer,
  NftCollectionTraitValueContainer,
  NftCollectionTraitValuesContainer,
  NftCollectionTraitsContainer,
} from '@/components/widgets/NftCollectionContainer';
import { NftSearch } from '@/components/widgets/NftSearch';
import { Price } from '@/components/widgets/Price';
import { TransferButton } from '@/components/widgets/Transfer';
import Swap from '@/components/widgets/swap/Swap';
import useChainId from '@/hooks/useChainId';
import useParseMessage from '@/hooks/useParseMessage';
import useToken from '@/hooks/useToken';
import { cleanValue, findProjectByName, findTokenBySymbol, shortenAddress } from '@/utils';
import {
  NftAttributes,
  NftCollectionAttributes,
  NftsWithAttributes,
} from '../widgets/NftAttributes';
import { toast } from 'react-toastify';

export const MessageTranslator = ({ message }: { message: string }) => {
  const stringsAndWidgets = useParseMessage(message);
  return (
    <div className="flex flex-col gap-3">
      {stringsAndWidgets.map((item, i) => {
        return (
          <Fragment key={`i${i}`}>
            {
              // if it's a string, just return a TextResponse Component
              // otherwise, let's try to translate the widget
              typeof item === 'string' 
              ? item && WidgetFromString(`[{"componentType":"TextResponse","props":{"text":"${item}"}}]`)
              : Widgetize(item)
            }
          </Fragment>
        );
      })}

    </div>
  );
};

const parseArgsStripQuotes = (args: string): any[] => {
  return args
    ? JSON.parse(
        JSON.stringify(args.split(',').map((str) => str.trim().replaceAll(RegExp(/['"]/g), '')))
      )
    : [];
};

/**
 * Create a bundled set of react components from a string describing the components.
 * @param input string `[{"componentType":"TextResponses", "props": {"text":"Hello World" } }]`
 * @returns React.ReactElement
 */
export const WidgetFromString = (input: string): React.ReactElement => {

  // Testing demo exmaple item input (array of cw3Components)
  const demoInput = `[{"componentType":"HeaderResponse", "props": {"text":"Swap with Aave", "projectName": "aave-v2" }}, 
    [{"componentType":"SingleLineResponse", "props": {"tokenSymbol":"USDC", "value":"10234"}},
      {"componentType":"IconResponse", "props": {"icon":"forward"}},
      {"componentType":"SingleLineResponse", "props": {"tokenSymbol":"USDC", "value":"10234"}}],
    {"componentType":"TextResponse", "props": {"text":"Swapping with Aave"}}]`;

  // Parse the array of strings describing each component.
  const parsedItems = JSON.parse(input) as {
    componentType: Cw3Component;
    props?: any;
    children?: any;
  }[];

  // Create a component for each component desciption in the array
  const components = parsedItems.map((parsedItem) => {
    // Case 1: If we have a component that matches a cw3Component type, create a component with it
    if (cw3Components[parsedItem.componentType]) {
      return createElement(cw3Components[parsedItem.componentType], parsedItem.props);
    }

    // Case 2: If we have a nested array of components, create single line of components including all those elements
    if (Array.isArray(parsedItem)) {
      const singleLineOfComponents = parsedItem.map((item) => {
        return createElement(cw3Components[item.componentType as Cw3Component], item.props);
      });
      return <div className="flex items-center gap-2">{singleLineOfComponents}</div>;
    }

    // Case 3: If not a cw3Component resort to default: a text response with the item as the input
    return createElement(cw3Components[Cw3Component.TextResponse], { text: input });
    
    // TODO also can handle an error here
  });

  // Returns the list of compiled components
  return <>{components}</>;
};

const Widgetize = (widget: Widget): JSX.Element => {

  const { fnName: fn, args } = widget;
  const fnName = fn.toLowerCase().replace('display-', '');
  const inputString = `${fnName}(${args})`;
  const chainId = useChainId();
  const { getToken } = useToken();

  try {
    switch (fnName) {

      // Transfer widget
      case 'transfer': {
        const [tokenSymbol, amtString, receiver] = parseArgsStripQuotes(args);
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
      }

      // Swap widget
      case 'uniswap': {

        const [tokenInSymbol, tokenOutSymbol, buyOrSell, amountInStrRaw] =
          parseArgsStripQuotes(args);
        const tokenIn = getToken(tokenInSymbol);
        const amountIn = parseUnits(
          cleanValue(amountInStrRaw, tokenIn?.decimals)!,
          tokenIn?.decimals
        );

        const [ amountOut, setAmountOut ] = useState<string>('|pending|');

        const swapInput = `[{"componentType":"HeaderResponse", "props": {"text":"Swap with Uniswap", "projectName": "uniswap" }}, 
        [{"componentType":"SingleLineResponse", "props": {"tokenSymbol":"${tokenInSymbol}", "value":"${amountIn}"}},
          {"componentType":"IconResponse", "props": {"icon":"forward"}},
          {"componentType":"SingleLineResponse", "props": {"tokenSymbol":"${tokenOutSymbol}", "value":"${amountOut}"}}],
          {"componentType":"ListResponse", "props": {"data":[["Slippage","0.5%" ],["Gas Fees","0.034" ],["Route","USDC-DAI"]], "title":"Breakdown"}}
        ]`;

        (async()=> {
           /* do any async stuff here */
            await new Promise(r => setTimeout(r, 2000));
            setAmountOut('1000.45');
        })()
    
        return (
          <ConnectFirst>
            { WidgetFromString(swapInput) }
          </ConnectFirst>
        );
      }

      case 'yield-farm': {
        const [projectName, network, tokenSymbol, amtString] = parseArgsStripQuotes(args);
        const token = getToken(tokenSymbol);
        const amount = parseUnits(amtString, token?.decimals);
        const project = findProjectByName(projectName);
        return (
          <ActionPanel
            header={`You are depositing ${amtString} ${tokenSymbol} into ${projectName}`}
            msg={inputString}
            key={inputString}
            gap="gap-3"
            centerTitle={true}
          >
            <ConnectFirst>
              <YieldFarm {...{ project, network, token: token!, amount }} />
            </ConnectFirst>
          </ActionPanel>
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
        return (
          <div className="text-black">
            <Grid>
              {params.items?.map(
                ({ name, params }: { name: string; params: string }, i: number) => (
                  <Fragment key={`i${i}`}>
                    {Widgetize({ fnName: name, args: JSON.stringify(params) })}
                  </Fragment>
                )
              ) || ''}
            </Grid>
          </div>
        );
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
          totalSteps,
          userActionType,
          tx,
          errorMsg,
          description,
        } = JSON.parse(args);

        const headerText = `Step ${stepNumber}/${totalSteps}: ${description}`;

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
                    totalSteps,
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
