import { Fragment, useContext, useEffect, useMemo, useState } from 'react';
import { Message } from '@/contexts/ChatContext';
import SettingsContext from '@/contexts/SettingsContext';
import { SharedStateContextProvider } from '@/contexts/SharedStateContext';
import { parseMessage } from '@/utils/parse-message';
import Avatar from '../Avatar';
import { Widgetize } from '../MessageTranslator';
import { composeFromString } from '../cactiComponents/tools/compose';
import { FeedbackButton } from './FeedbackButton_';
import { ConnectFirst } from './widgets/helpers/ConnectFirst';
import Transfer from './widgets/transfer/Transfer';
import Uniswap from './widgets/uniswap/Uniswap';

export const MessageTranslator = ({ message }: { message: Message }) => {
  const {
    settings: { experimentalUi },
  } = useContext(SettingsContext);
  const parsedMessage = useMemo(() => parseMessage(message.payload), [message.payload]);

  const [componentList, setComponentList] = useState<(JSX.Element | null)[]>();

  useEffect(() => {
    if (parsedMessage && parsedMessage.length) {
      const list = parsedMessage.map((item: string | Widget) => {
        /* if item is a string (and not nothing ) send a text response */
        if (typeof item === 'string' && item.trim() !== '')
          return composeFromString(`[{"response":"TextResponse","props":{"text":"${item}"}}]`);
        /* if item has a fnName, assume its a widget */
        if (typeof item !== 'string' && item.fnName) return getWidget(item);
        /* else return null */
        return null;
      });
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

const getWidget = (widget: Widget): JSX.Element => {
  const { fnName: fn, args } = widget;
  const fnName = fn.toLowerCase().replace('display-', '');
  const parsedArgs = parseArgsStripQuotes(args);
  const inputString = `${fnName}(${args})`;

  const widgets = new Map<string, () => JSX.Element>();

  widgets.set('uniswap', () => (
    <Uniswap
      tokenInSymbol={parsedArgs[0]}
      tokenOutSymbol={parsedArgs[1]}
      inputAmount={parsedArgs[3]}
    />
  ));

  widgets.set('transfer', () => (
    <Transfer tokenSymbol={parsedArgs[0]} amtString={parsedArgs[1]} receiver={parsedArgs[2]} />
  ));

  /* If available, return the widget in the widgets map */
  if (widgets.has(fnName)) {
    return widgets.get(fnName)!();
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
