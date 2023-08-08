import { Fragment, useContext, useEffect, useMemo, useState } from 'react';
import { AnyARecord } from 'dns';
import { Message } from '@/contexts/ChatContext';
import { SharedStateContextProvider } from '@/contexts/SharedStateContext';
import { parseMessage } from '@/utils/parse-message';
import Avatar from '../Avatar';
import { Widgetize } from '../MessageTranslator';
import { ListResponse, TextResponse } from '../cactiComponents';
import { ImageVariant } from '../cactiComponents/ImageResponse';
import { TableResponse } from '../cactiComponents/TableResponse';
import { FeedbackButton } from './FeedbackButton_';
import ListContainer from './containers/ListContainer';
import { MultiStepContainer } from './containers/MultiStepContainer';
import { SingleStepContainer } from './containers/SingleStepContainer';
import { StreamingContainer } from './containers/StreamingContainer';
import DepositVault from './widgets/4626vault/DepositIntoVault';
import WithdrawVault from './widgets/4626vault/WithdrawFromVault';
import DepositDSR from './widgets/dsr/DepositDSR';
import RedeemDSR from './widgets/dsr/RedeemDSR';
import StakeSfrxEth from './widgets/frax/StakeSfrxETH';
import LidoDeposit from './widgets/lido/LidoDeposit';
import LidoWithdraw from './widgets/lido/LidoWithdraw';
import LiquityBorrow from './widgets/liquity/borrow/LiquityBorrow';
import LiquityClose from './widgets/liquity/close/LiquityClose';
import { BuyNft } from './widgets/nft/BuyNft';
import { NftAsset } from './widgets/nft/NftAsset';
import { NftAssetList } from './widgets/nft/NftAssetList';
import { NftCollection } from './widgets/nft/NftCollection';
import RethDeposit from './widgets/rocketPool/rocketPoolDeposit';
import RethWithdraw from './widgets/rocketPool/rocketPoolWithdraw';
import Transfer from './widgets/transfer/Transfer';
import Uniswap from './widgets/uniswap/Uniswap';
import WrapEth from './widgets/weth/WrapEth';
import YieldProtocolBorrowClose from './widgets/yield-protocol/actions/borrow-close/YieldProtocolBorrowClose';
import YieldProtocolBorrow from './widgets/yield-protocol/actions/borrow/YieldProtocolBorrow';
import YieldProtocolLendClose from './widgets/yield-protocol/actions/lend-close/YieldProtocolLendClose';
import YieldProtocolLend from './widgets/yield-protocol/actions/lend/YieldProtocolLend';
import ZKSyncDeposit from './widgets/zksync/ZKSyncDeposit';
import ZKSyncWithdraw from './widgets/zksync/ZKSyncWithdraw';

/**
 * This function parses the args passed to a widget,
 * if the args are a string, it tries to parse it as an object or a comma separated list of strings
 * if the args are an object, it returns the object
 * if the args are neither, it returns an empty array
 * @param args
 * @returns
 */
export const parseArgs = (args: string | object) => {
  if (args && typeof args === 'string') {
    try {
      // try directly parse the string as an object
      return JSON.parse(args); // function could throw exception
    } catch (e) {
      /* Alternatively, assume it is a comma separated list of strings */
      return JSON.parse(
        JSON.stringify(args.split(',').map((str) => str.trim().replaceAll(RegExp(/['"]/g), '')))
      );
    }
  }
  /* if the args are already an object, return it */
  if (args && typeof args === 'object') return { ...args };
  /* else return an empty array as a last resort */
  return [];
};

export const MessageTranslator = ({ message }: { message: Message }) => {
  const parsedMessage = useMemo(() => parseMessage(message.payload), [message.payload]);
  const [widgetGroup, setWidgetGroup] = useState<JSX.Element[]>([]);

  useEffect(() => {
    if (parsedMessage && parsedMessage.length) {
      try {
        const list = parsedMessage.reduce((list, item, idx) => {
          /* if item is a string (and not nothing) simply send a text response */
          if (typeof item === 'string' && item.trim() !== '')
            return [
              ...list,
              <Widget
                key={item.slice(0, 16)}
                widget={{ name: 'TextResponse', params: { text: item } }}
              />,
            ];

          /* if item is an object, assume it is a container or a widget */
          if (typeof item !== 'string' && item.name) {
            /* handle if a list container is passed */
            if (item.name === 'list-container')
              return [...list, <ListContainer key={idx} {...JSON.parse(item.params)} />];

            /* handle is a streaming container is passed */
            if (item.name === 'display-streaming-list-container')
              return [...list, <StreamingContainer key={idx} {...JSON.parse(item.params)} />];

            /* handle if a multistep container is passed */
            if (item.name === 'display-multistep-payload-container')
              return [...list, <MultiStepContainer key={idx} {...JSON.parse(item.params)} />];

            /* handle if a single step container is passed */
            if (item.name === 'display-tx-payload-for-sending-container')
              return [...list, <SingleStepContainer key={idx} {...JSON.parse(item.params)} />];

            /* if item has a function name, assume its a widget */
            return [...list, <Widget key={idx} widget={item} />];
          }

          /* else return null */
          return list;
        }, [] as JSX.Element[]);

        setWidgetGroup(list);
      } catch (e) {
        console.log('ERROR: ', e);
        setWidgetGroup([
          <Widget
            key={'error'}
            widget={{
              name: 'TextResponse',
              params: {
                text: 'Hmmm, it looks like we had a little trouuble translating the AI response.',
              },
            }}
          />,
        ]);
      }
      // setWidgetGroup(list);
    }
  }, [parsedMessage]);

  return (
    <SharedStateContextProvider>
      <div className={`grid-gap-2 mb-8 grid grid-cols-12 pb-3`}>
        <div className="col-span-2 py-4">
          <div className="float-right">
            <Avatar actor="bot" />
          </div>
        </div>
        <div className=" col-span-8 flex h-full w-full flex-col gap-2 px-4 text-white/70 focus:outline-none">
          {widgetGroup.map((component, i) => (
            <Fragment key={`i${i}`}>{component}</Fragment>
          ))}
        </div>
        <div className="text-white/70">
          <FeedbackButton message={message} />
        </div>
      </div>
    </SharedStateContextProvider>
  );
};

export interface WidgetProps {
  widget: Widget;
  children?: React.ReactNode;
}

export const Widget = (props: WidgetProps) => {
  const widgets = new Map<string, JSX.Element>();

  const { name, params, variant } = props.widget;
  const fnName = name.replace('display-', '');
  const parsedArgs = parseArgs(params);

  console.log('WIDGET: ', `${fnName}(${params})`);
  console.log('PARSED_ARGS: ', parsedArgs);

  /**
   * Implemented Indivudual Widgets
   * */
  widgets.set(
    'uniswap',
    <Uniswap
      tokenInSymbol={parsedArgs[0]}
      tokenOutSymbol={parsedArgs[1]}
      inputAmount={parsedArgs[3]}
    />
  );

  widgets.set(
    'transfer',
    <Transfer tokenSymbol={parsedArgs[0]} amtString={parsedArgs[1]} receiver={parsedArgs[2]} />
  );

  // widgets.set('table-container', <TableResponse {...JSON.parse(params)} />);

  /* Nft widgets */
  widgets.set('nft-asset-container', <NftAsset {...parsedArgs} variant={variant} />);
  widgets.set(
    'nft-collection-container',
    <NftCollection {...parsedArgs} variant={variant as ImageVariant} />
  );

  widgets.set('nft-asset-list-container', <NftAssetList {...parsedArgs} />);

  widgets.set(
    'nft-asset-traits-container',
    <NftAsset {...parsedArgs?.asset?.params}>
      {/* <>{  parsedArgs?.asset?.values?.params?.map((trait: any) =>
      console.log( trait) ) }
    </> */}
    </NftAsset>
  );

  widgets.set('buy-nft', <BuyNft nftAddress={parsedArgs[0]} tokenId={parsedArgs[1]} />);

  widgets.set(
    'fetch-nfts',
    <NftCollection
      address={parsedArgs[0]}
      name={parsedArgs[1]}
      network={'ethereum-mainnet'}
      assetsToShow={6}
    />
  );

  widgets.set(
    'yield-protocol-lend',
    <YieldProtocolLend
      tokenInSymbol={parsedArgs[0]}
      inputAmount={parsedArgs[1]}
      action="lend"
      projectName="yield-protocol"
    />
  );

  widgets.set(
    'yield-protocol-lend-close',
    <YieldProtocolLendClose
      baseTokenSymbol={parsedArgs[0]}
      inputAmount={parsedArgs[1]}
      action="lend-close"
      projectName="yield-protocol"
    />
  );

  widgets.set(
    'yield-protocol-borrow',
    <YieldProtocolBorrow
      borrowTokenSymbol={parsedArgs[0]}
      borrowAmount={parsedArgs[1]}
      collateralTokenSymbol={parsedArgs[2]}
      collateralAmount={parsedArgs[3]}
      action="borrow"
      projectName="yield-protocol"
    />
  );

  widgets.set(
    'yield-protocol-borrow-close',
    <YieldProtocolBorrowClose
      borrowTokenSymbol={parsedArgs[0]}
      action="borrow-close"
      projectName="yield-protocol"
    />
  );
  /**
   * Experimental: Bring in some 'direct' cacti components
   * */
  widgets.set('tableresponse', <TableResponse {...parsedArgs} />);
  widgets.set('TextResponse', <TextResponse {...parsedArgs} />);
  widgets.set('table-container', <TableResponse {...parsedArgs} />);
  widgets.set(
    'zksync-deposit',
    <ZKSyncDeposit tokenSymbol={parsedArgs[0]} userAmount={parsedArgs[1]} />
  );

  widgets.set(
    'zksync-withdraw',
    <ZKSyncWithdraw tokenSymbol={parsedArgs[0]} userAmount={parsedArgs[1]} />
  );
  widgets.set('stake-sfrxeth', <StakeSfrxEth receiver={parsedArgs[0]} value={parsedArgs[1]} />);
  widgets.set(
    'liquity-borrow',
    <LiquityBorrow borrowAmount={parsedArgs[0]} collateralAmount={parsedArgs[1]} />
  );
  widgets.set('liquity-close', <LiquityClose />);

  widgets.set('deposit-eth-lido', <LidoDeposit inputString={parsedArgs} />);
  widgets.set('withdraw-eth-lido', <LidoWithdraw inputString={parsedArgs} />);

  widgets.set('deposit-eth-reth', <RethDeposit inputString={parsedArgs} />);
  widgets.set('withdraw-eth-reth', <RethWithdraw inputString={parsedArgs} />);

  widgets.set('savings-dai-deposit', <DepositDSR depositAmount={parsedArgs[0]} />);

  widgets.set('redeem-sdai', <RedeemDSR shares={parsedArgs[0]} />);

  widgets.set(
    'deposit-vault',
    <DepositVault depositToken={parsedArgs[0]} amount={parsedArgs[1]} vault={parsedArgs[2]} />
  );
  widgets.set(
    'withdraw-vault',
    <WithdrawVault withdrawToken={parsedArgs[0]} amount={parsedArgs[1]} vault={parsedArgs[2]} />
  );
  widgets.set('wrap-eth', <WrapEth amtString={'1'} />);

  /* If available, return the widget in the widgets map */
  if (widgets.has(fnName)) {
    return widgets.get(fnName)!;
  } else {
    /* Else, 'try' to get the widget from the previous implementation */
    try {
      return <>{Widgetize(props.widget)}</>;
    } catch (e) {
      return (
        <div className="inline-block bg-slate-500 text-white">
          Widget not implemented for <code>{`${fnName}(${params})`}</code>
        </div>
      );
    }
  }
};

export default MessageTranslator;
