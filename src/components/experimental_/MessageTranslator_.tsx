import { Fragment, createElement, useContext, useEffect, useMemo, useState } from 'react';
import { parseUnits } from 'ethers/lib/utils.js';
import * as cactiComponents from '@/components/cactiComponents';
import { CactiResponse } from '@/components/cactiComponents';
import useParseMessage from '@/hooks/useParseMessage';
import useToken from '@/hooks/useToken';
import { cleanValue, findProjectByName, shortenAddress } from '@/utils';
import { composeFromString } from '../cactiComponents/tools/compose';
import { ConnectFirst } from './widgets/helpers/ConnectFirst';
import Uniswap from './widgets/uniswap/Uniswap';
import SettingsContext from '@/contexts/SettingsContext';
import { parseMessage } from '@/utils/parse-message';
import { parse } from 'path';
import { Widgetize } from '../MessageTranslator';

import {
  ListItem,
  SharedStateContextProvider,
  useSharedStateContext,
} from '@/contexts/SharedStateContext';

export const MessageTranslator = ({ message }: { message: string }) => {

  const {settings: {experimentalUi}} = useContext(SettingsContext);
  const parsedMessage = useMemo(() => parseMessage(message), [message])

  const [componentList, setComponentList] = useState<(JSX.Element|null)[]>();
  
  useEffect(()=>{

    parsedMessage && console.log('Parsed changed:' , parsedMessage);

    if ( parsedMessage && parsedMessage.length)  {
      
      const list = parsedMessage.map((item: string| Widget)=>{
        /* if item is a string (and not nothing ) send a text response */
        if (typeof item === 'string' && item.trim() !== '') return composeFromString(`[{"response":"TextResponse","props":{"text":"${item}"}}]`)
        /* if item has a fnName, assume its a widget */
        if (typeof item !== 'string' && item.fnName ) return getWidget(item) 
        /* else return null */
        return null
      });

      setComponentList(list);
    }

  }, [parsedMessage])

  return (
    <SharedStateContextProvider>
    <div className="flex flex-col gap-2">
      { componentList && componentList.map((component, i) => <Fragment key={`i${i}`}>{component}</Fragment>)}
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
    <ConnectFirst>
      <Uniswap
        tokenInSymbol={parsedArgs[0]}
        tokenOutSymbol={parsedArgs[1]}
        inputAmount={parsedArgs[3]}
      />
    </ConnectFirst>
  ));

  if (widgets.has(fnName) ) {
    /* If available, return the widget in the widgets map */
    return widgets.get(fnName)!();
  } else {
    /* Else, try to get the widget from the previous implementation */
    try {
      return <>{Widgetize(widget)}</>
    } catch (e) {
      return <div className="inline-block bg-slate-500 p-5 text-white">
      Widget not implemented for <code>{inputString}</code>
    </div>
    }
  }

};


