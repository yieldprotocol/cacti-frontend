import { Fragment, useContext, useEffect, useMemo, useState } from 'react';
import { Message } from '@/contexts/ChatContext';
import SettingsContext from '@/contexts/SettingsContext';
import { SharedStateContextProvider, useSharedStateContext } from '@/contexts/SharedStateContext';
import { parseMessage } from '@/utils/parse-message';
import Avatar from '../Avatar';
import { Widgetize } from '../MessageTranslator';
import { composeFromString } from '../cactiComponents/tools/compose';
import { FeedbackButton } from './FeedbackButton_';
import ListContainer from './containers/ListContainer';
import { StreamingContainer } from './containers/StreamingContainer';
import { NftAsset } from './widgets/nft/NftAsset';
import { NftCollection } from './widgets/nft/NftCollection';
import Transfer from './widgets/transfer/Transfer';
import Uniswap from './widgets/uniswap/Uniswap';
import YieldProtocolLend from './widgets/yield-protocol/actions/lend/YieldProtocolLend';

export const MessageTranslator = ({ message }: { message: Message }) => {
  const parsedMessage = useMemo(() => parseMessage(message.payload), [message.payload]);
  const [widgetGroup, setWidgetGroup] = useState<JSX.Element[]>([]);

  useEffect(() => {
    if (parsedMessage && parsedMessage.length) {

      const list = parsedMessage.reduce((list, item, idx) => {

        /* if item is a string (and not nothing) send a text response */
        if (typeof item === 'string' && item.trim() !== '')
          return [
            ...list,
            composeFromString(`[{"response":"TextResponse","props":{"text":"${item}"}}]`),
          ];

        /* handle if a list container is passed */
        if (typeof item !== 'string' && item.name === 'list-container')
          return [...list, <ListContainer key={idx} { ...JSON.parse(item.args) } />];

        /* handle is a streaming container is passed */
        if (typeof item !== 'string' && item.name === 'display-streaming-list-container')
          return [...list, <StreamingContainer key={idx} { ...JSON.parse(item.args) } />];

        /* if item has a fnName, assume its a widget */
        if (typeof item !== 'string' && item.name)
          return [...list, <Widget key={idx} widget={item} />];

        /* else return null */
        return list;
      }, [] as JSX.Element[]);

      setWidgetGroup(list);
    }
  }, [parsedMessage]);

  return (
    <SharedStateContextProvider>
      <div className={`grid-gap-2 mb-8 grid grid-cols-12 py-3 `}>
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

const parseArgs = (args: string | object) => {
  if (args && typeof args === 'string')
    return JSON.parse(
      JSON.stringify(args.split(',').map((str) => str.trim().replaceAll(RegExp(/['"]/g), '')))
    );
  if (args && typeof args === 'object') return { ...args };
  return [];
};

export const Widget = ({ widget }: { widget: Widget }) => {
  const widgets = new Map<string, JSX.Element>();

  const { name, args } = widget;
  const fnName = name.toLowerCase().replace('display-', '');
  const parsedArgs = parseArgs(args);

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

  /* Nft widgets */
  widgets.set('nft-asset-container', <NftAsset {...parsedArgs} />);
  widgets.set('nft-collection-container', <NftCollection {...parsedArgs} />);

  widgets.set(
    'yield-protocol-lend',
    <YieldProtocolLend
      tokenInSymbol={parsedArgs[0]}
      inputAmount={parsedArgs[1]}
      action="lend"
      projectName="yield-protocol"
    />
  );

  /* agregator widgets => note we can't send parsedArgs here becasue we need the originals as string args  */
  // widgets.set('list-container', <ListContainer widgets={...parsedArgs} />);
  // widgets.set('streaming-list-container', <StreamingContainer {...parsedArgs} />);

  /* If available, return the widget in the widgets map */
  if (widgets.has(fnName)) {
    return widgets.get(fnName)!;
  } else {
    /* Else, 'try' to get the widget from the previous implementation */
    try {
      return <>{Widgetize(widget)}</>;
    } catch (e) {
      return (
        <div className="inline-block bg-slate-500 p-5 text-white">
          Widget not implemented for <code>{`${fnName}(${args})`}</code>
        </div>
      );
    }
  }
};

export default MessageTranslator;
