import { Fragment } from 'react';
import useParseMessage from '@/hooks/useParseMessage';
import { composeFromString } from '../cactiComponents/tools/compose';
import DepositDSR from './widgets/dsr/DepositDSR';
import { ConnectFirst } from './widgets/helpers/ConnectFirst';
import Uniswap from './widgets/uniswap/Uniswap';

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
              typeof item === 'string'
                ? item &&
                  composeFromString(`[{"response":"TextResponse","props":{"text":"${item}"}}]`)
                : getWidget(item) // Widgetize(item)
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

const getWidget = (widget: Widget): JSX.Element => {
  const { fnName: fn, args } = widget;
  const fnName = fn.toLowerCase().replace('display-', '');
  const parsedArgs = parseArgsStripQuotes(args);

  const inputString = `${fnName}(${args})`;

  const widgets = new Map<string, () => JSX.Element>([
    [
      'uniswap',
      () => (
        <ConnectFirst>
          <Uniswap
            tokenInSymbol={parsedArgs[0]}
            tokenOutSymbol={parsedArgs[1]}
            inputAmount={parsedArgs[3]}
          />
        </ConnectFirst>
      ),
    ],
    [
      'dsr-deposit',
      () => (
        <ConnectFirst>
          <DepositDSR depositAmount={parsedArgs[0]} />
        </ConnectFirst>
      ),
    ],
    // ['transfer', <ConnectFirst><div/> </ConnectFirst>],
  ]);

  return (
    widgets?.get(fnName)!() || (
      <div className="inline-block bg-slate-500 p-5 text-white">
        Widget not implemented for <code>{inputString}</code>
      </div>
    )
  );
};
