import { Fragment, useContext, useEffect, useMemo, useState } from 'react';
import { Message } from '@/contexts/ChatContext';
import SettingsContext from '@/contexts/SettingsContext';
import { SharedStateContextProvider, useSharedStateContext } from '@/contexts/SharedStateContext';
import { parseMessage } from '@/utils/parse-message';
import Avatar from '../Avatar';
import { Widgetize } from '../MessageTranslator';
import { composeFromString } from '../cactiComponents/tools/compose';
import { FeedbackButton } from './FeedbackButton_';
import { NftAsset } from './widgets/nft/NftAsset';
import Transfer from './widgets/transfer/Transfer';
import Uniswap from './widgets/uniswap/Uniswap';
import YieldProtocolLend from './widgets/yield-protocol/actions/lend/YieldProtocolLend';

export const MessageTranslator = ({ message }: { message: Message }) => {
  const {
    settings: { experimentalUi },
  } = useContext(SettingsContext);
  const parsedMessage = useMemo(() => parseMessage(message.payload), [message.payload]);

  const [componentGroup, setComponentGroup] = useState<JSX.Element[]>([]);

  useEffect(() => {
    if (parsedMessage && parsedMessage.length) {
      const list = parsedMessage.reduce((list, item, idx) => {

        console.log(item)

        /* if item is a string (and not nothing) send a text response */
        if (typeof item === 'string' && item.trim() !== '')
          return [
            ...list,
            composeFromString(`[{"response":"TextResponse","props":{"text":"${item}"}}]`),
          ];

        /* if item has a fnName, assume its a widget */
        if (typeof item !== 'string' && item.name)
          return [...list, <Widget key={idx} widget={item} />];

        /* else return null */
        return list;
      }, [] as JSX.Element[]);

      setComponentGroup(list);
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
        <div
          className=" 
          col-span-8 flex 
          h-full w-full flex-col 
          gap-2 
          px-4 
          text-white/70
          focus:outline-none
          "
        >
          {componentGroup &&
            componentGroup.map((component, i) => <Fragment key={`i${i}`}>{component}</Fragment>)}
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
  const { name: fn, args } = widget;
  const fnName = fn.toLowerCase().replace('display-', '');
  const parsedArgs = parseArgs(args);
  const inputString = `${fnName}(${args})`;

  const widgets = new Map<string, JSX.Element>();

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

  widgets.set(
    'yield-protocol-lend',
    <YieldProtocolLend
      tokenInSymbol={parsedArgs[0]}
      inputAmount={parsedArgs[1]}
      action="lend"
      projectName="yield-protocol"
    />
  );

  /* agregator widgets */
  widgets.set('list-container', <ListContainer items={args} />);
  widgets.set('streaming-list-container', <StreamingContainer {...parsedArgs} />);

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
          Widget not implemented for <code>{inputString}</code>
        </div>
      );
    }
  }
};

/**
 * Aggregator display containers
 * */
const ListContainer = (props: any) => {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      {JSON.parse(props.items).items.map((item: { name: string; params: any }, i: number) => (
        <Fragment key={`i${i}`}>
          <Widget key={item.name} widget={{ name: item.name, args: item.params }} />{' '}
        </Fragment>
      )) || null}
    </div>
  );
};

interface StreamingContainerProps {
  operation: string;
  item: Widget | null;
  prefix: string | null;
  suffix: string | null;
  isThinking: boolean | null;
}

const StreamingContainer = ({
  operation,
  item,
  prefix: newPrefix,
  suffix: newSuffix,
  isThinking: newIsThinking,
}: StreamingContainerProps) => {
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
  }, [
    item,
    newIsThinking,
    newPrefix,
    newSuffix,
    operation,
    setIsThinking,
    setItems,
    setPrefix,
    setSuffix,
  ]);

  if (operation === 'create') {
    return (
      <div className="p-3 text-white">
        <span className={`${isThinking ? 'after:animate-ellipse' : ''}`}>{prefix}</span>
        <ListContainer items={items} /> here
        <span>{suffix}</span>
      </div>
    );
  }
  return null;
};

export default MessageTranslator;
