import { Fragment, useContext, useEffect, useMemo, useState } from 'react';
import SettingsContext from '@/contexts/SettingsContext';
import { SharedStateContextProvider } from '@/contexts/SharedStateContext';
import { parseMessage } from '@/utils/parse-message';
import { Widgetize } from '../MessageTranslator';
import { composeFromString } from '../cactiComponents/tools/compose';
import { ConnectFirst } from './widgets/helpers/ConnectFirst';
import Transfer from './widgets/transfer/Transfer';
import Uniswap from './widgets/uniswap/Uniswap';

export const MessageTranslator = ({ message }: { message: string }) => {
  const {
    settings: { experimentalUi },
  } = useContext(SettingsContext);
  const parsedMessage = useMemo(() => parseMessage(message), [message]);

  const [componentList, setComponentList] = useState<(JSX.Element | null)[]>();

  useEffect(() => {
    if (parsedMessage && parsedMessage.length) {
       
      const list = parsedMessage.map((item: string | Widget) => {
        /* if item is a string (and not nothing ) send a text response */
        if (typeof item === 'string' && item.trim() !== '')
          return composeFromString(`[{"response":"TextResponse","props":{"text":"${item}"}}]`);
        /* if item has a fnName, assume its a widget */
        if (typeof item !== 'string' && item.name) return getWidget(item);
        /* else return null */
        return null;
      });
      setComponentList(list);
    }
  }, [parsedMessage]);

  return (
    <SharedStateContextProvider>
      <div className="flex flex-col gap-2">
        {componentList &&
          componentList.map((component, i) => <Fragment key={`i${i}`}>{component}</Fragment>)}
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
  const { name: fn, args } = widget;
  const fnName = fn.toLowerCase().replace('display-', '');
  const parsedArgs = parseArgsStripQuotes(args);
  const inputString = `${fnName}(${args})`;

  const widgets = new Map<string, JSX.Element>();

  /** 
   * Aggregator display widgets 
   * */
  widgets.set('list-container', (
    <Fragment>
       {JSON.parse(args).items.map(( item: Widget, i: number) => (
            <Fragment key={`i${i}`}>
              {getWidget( { name: item.name, args: item.args })}
            </Fragment>
          )) || null}
    </Fragment>
  ));

 /**
  * Implemented Indivudual Widgets 
  * */ 

  widgets.set('uniswap', (
    <Uniswap
      tokenInSymbol={parsedArgs[0]}
      tokenOutSymbol={parsedArgs[1]}
      inputAmount={parsedArgs[3]}
    />
  ));

  widgets.set('transfer', (
    <Transfer tokenSymbol={parsedArgs[0]} amtString={parsedArgs[1]} receiver={parsedArgs[2]} />
  ));

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
