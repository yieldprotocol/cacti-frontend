import { Fragment, createElement, useMemo, useState } from 'react';
import { parseUnits } from 'ethers/lib/utils.js';
import * as cactiComponents from '@/components/cactiComponents';
import { CactiResponse } from '@/components/cactiComponents';
import useParseMessage from '@/hooks/useParseMessage';
import useToken from '@/hooks/useToken';
import { cleanValue, findProjectByName, shortenAddress } from '@/utils';
import { composeFromString } from '../cactiComponents/tools/compose';
import { ConnectFirst } from './widgets/helpers/ConnectFirst';
import Uniswap from './widgets/uniswap/Uniswap';
import YieldProtocolLend from './widgets/yield-protocol/actions/lend/YieldProtocolLend';

export const MessageTranslator = ({ message }: { message: string }) => {
  const stringsAndWidgets = useParseMessage(message);
  return (
    <div className="flex flex-col gap-2">
      {stringsAndWidgets.map((item, i) => {
        return (
          <Fragment key={`i${i}`}>
            {
              // if it's a string, just return a TextResponse Component
              // otherwise, let's try to translate the widget
              typeof item === 'string' ? (
                item &&
                composeFromString(`[{"response":"TextResponse","props":{"text":"${item}"}}]`)
              ) : (
                <Widget widget={item} />
              )
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

const Widget = ({ widget }: { widget: Widget }) => {
  const { fnName: fn, args } = widget;
  const fnName = fn.toLowerCase().replace('display-', '');
  const parsedArgs = parseArgsStripQuotes(args);
  const inputString = `${fnName}(${args})`;

  const render = useMemo(() => {
    switch (fnName) {
      case 'uniswap':
        return (
          <Uniswap
            tokenInSymbol={parsedArgs[0]}
            tokenOutSymbol={parsedArgs[1]}
            inputAmount={parsedArgs[3]}
          />
        );
      case 'yield-protocol-lend':
        return (
          <YieldProtocolLend
            tokenInSymbol={parsedArgs[0]}
            inputAmount={parsedArgs[1]}
            action="lend"
            projectName="yield-protocol"
          />
        );

      default:
        return (
          <div className="inline-block bg-slate-500 p-5 text-white">
            Widget not implemented for <code>{inputString}</code>
          </div>
        );
    }
  }, [fnName, inputString, parsedArgs]);

  return <ConnectFirst>{render}</ConnectFirst>;
};
