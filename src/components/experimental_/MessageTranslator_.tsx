import { Fragment, useContext, useEffect, useMemo, useState } from 'react';
import SettingsContext from '@/contexts/SettingsContext';
import { SharedStateContextProvider } from '@/contexts/SharedStateContext';
import { parseMessage } from '@/utils/parse-message';
import { Widgetize } from '../MessageTranslator';
import { composeFromString } from '../cactiComponents/tools/compose';
import LidoDeposit from './widgets/lido/LidoDeposit';
import LidoWithdraw from './widgets/lido/LidoWithdraw';
import RethDeposit from './widgets/rocketPool/rocketPoolDeposit';
import RethWithdraw from './widgets/rocketPool/rocketPoolWithdraw';
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
        if (typeof item !== 'string' && item.fnName) return getWidget(item);
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
  const { fnName: fn, args } = widget;
  const fnName = fn.toLowerCase().replace('display-', '');
  console.log('🦄 ~ file: MessageTranslator_.tsx:57 ~ getWidget ~ fnName:', fnName);
  const parsedArgs = parseArgsStripQuotes(args);
  console.log('🦄 ~ file: MessageTranslator_.tsx:58 ~ getWidget ~ parsedArgs:', parsedArgs);
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
    <Transfer
      inputString={inputString}
      tokenSymbol={parsedArgs[0]}
      amtString={parsedArgs[1]}
      receiver={parsedArgs[2]}
    />
  ));

  widgets.set('deposit-eth-lido', () => <LidoDeposit inputString={parsedArgs[0]} />);
  widgets.set('withdraw-eth-lido', () => <LidoWithdraw inputString={parsedArgs[0]} />);

  widgets.set('deposit-eth-reth', () => <RethDeposit inputString={parsedArgs[0]} />);
  widgets.set('withdraw-eth-reth', () => <RethWithdraw inputString={parsedArgs[0]} />);

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
