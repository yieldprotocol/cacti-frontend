import { Fragment, useContext, useEffect, useMemo, useState } from 'react';
import { Message } from '@/contexts/ChatContext';
import SettingsContext from '@/contexts/SettingsContext';
import { SharedStateContextProvider } from '@/contexts/SharedStateContext';
import { parseMessage } from '@/utils/parse-message';
import Avatar from '../Avatar';
import { Widgetize } from '../MessageTranslator';
import { composeFromString } from '../cactiComponents/tools/compose';
import LidoDeposit from './widgets/lido/LidoDeposit';
import LidoWithdraw from './widgets/lido/LidoWithdraw';
import RethDeposit from './widgets/rocketPool/rocketPoolDeposit';
import RethWithdraw from './widgets/rocketPool/rocketPoolWithdraw';
import { FeedbackButton } from './FeedbackButton_';
import LiquityBorrow from './widgets/liquity/borrow/LiquityBorrow';
import Transfer from './widgets/transfer/Transfer';
import Uniswap from './widgets/uniswap/Uniswap';
import YieldProtocolLend from './widgets/yield-protocol/actions/lend/YieldProtocolLend';

export const MessageTranslator = ({ message }: { message: Message }) => {
  const {
    settings: { experimentalUi },
  } = useContext(SettingsContext);
  const parsedMessage = useMemo(() => parseMessage(message.payload), [message.payload]);

  const [componentList, setComponentList] = useState<JSX.Element[]>([]);

  useEffect(() => {
    if (parsedMessage && parsedMessage.length) {
      const list = parsedMessage.reduce((list, item, idx) => {
        /* if item is a string (and not nothing) send a text response */
        if (typeof item === 'string' && item.trim() !== '')
          return [
            ...list,
            composeFromString(`[{"response":"TextResponse","props":{"text":"${item}"}}]`),
          ];

        /* if item has a fnName, assume its a widget */
        if (typeof item !== 'string' && item.fnName)
          return [...list, <Widget key={idx} widget={item} />];

        /* else return null */
        return list;
      }, [] as JSX.Element[]);

      setComponentList(list);
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
          {componentList &&
            componentList.map((component, i) => <Fragment key={`i${i}`}>{component}</Fragment>)}
        </div>

        <div className="text-white/70">
          <FeedbackButton message={message} />
        </div>
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

const Widget = ({ widget }: { widget: Widget }) => {
  const { fnName: fn, args } = widget;
  const fnName = fn.toLowerCase().replace('display-', '');
  console.log('🦄 ~ file: MessageTranslator_.tsx:57 ~ getWidget ~ fnName:', fnName);
  const parsedArgs = parseArgsStripQuotes(args);
  console.log('🦄 ~ file: MessageTranslator_.tsx:58 ~ getWidget ~ parsedArgs:', parsedArgs);
  const inputString = `${fnName}(${args})`;

  const widgets = new Map<string, JSX.Element>();

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
    'liquity-borrow',
    <LiquityBorrow borrowAmount={parsedArgs[0]} collateralAmount={parsedArgs[1]} />
  );

  widgets.set('deposit-eth-lido', () => <LidoDeposit inputString={parsedArgs[0]} />);
  widgets.set('withdraw-eth-lido', () => <LidoWithdraw inputString={parsedArgs[0]} />);

  widgets.set('deposit-eth-reth', () => <RethDeposit inputString={parsedArgs[0]} />);
  widgets.set('withdraw-eth-reth', () => <RethWithdraw inputString={parsedArgs[0]} />);

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

export default MessageTranslator;
