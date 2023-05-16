import { Fragment, createElement, useMemo, useState } from 'react';
import { parseUnits } from 'ethers/lib/utils.js';
import * as cw3Components from '@/components/cw3Components';
import { Cw3Component } from '@/components/cw3Components';
import useParseMessage from '@/hooks/useParseMessage';
import useToken from '@/hooks/useToken';
import { cleanValue, findProjectByName, shortenAddress } from '@/utils';
import Uniswap from './widgets/Uniswap';
import { ConnectFirst } from './widgets/helpers/ConnectFirst';

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
                  WidgetFromString(`[{"componentType":"TextResponse","props":{"text":"${item}"}}]`)
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

/**
 * Create a bundled set of react components from a string describing the components.
 * @param input string `[{"componentType":"TextResponses", "props": {"text":"Hello World" } }]`
 * @returns React.ReactElement
 */
export const WidgetFromString = (input: string): React.ReactElement => {
  
  // Testing demo exmaple item input (array of cw3Components)
  const demoInput = `[{"componentType":"HeaderResponse", "props": {"text":"Swap with Aave", "projectName": "aave-v2" }}, 
    [{"componentType":"SingleLineResponse", "props": {"tokenSymbol":"USDC", "value":"10234"}},
      {"componentType":"IconResponse", "props": {"icon":"forward"}},
      {"componentType":"SingleLineResponse", "props": {"tokenSymbol":"USDC", "value":"10234"}}],
    {"componentType":"TextResponse", "props": {"text":"Swapping with Aave"}}]`;

  // Parse the array of strings describing each component.
  const parsedItems = JSON.parse(input) as {
    componentType: Cw3Component;
    props?: any;
    children?: any;
  }[];

  // Create a component for each component desciption in the array
  const components = parsedItems.map((parsedItem) => {
    // Case 1: If we have a component that matches a cw3Component type, create a component with it
    if (cw3Components[parsedItem.componentType]) {
      return createElement(cw3Components[parsedItem.componentType], parsedItem.props);
    }

    // Case 2: If we have a nested array of components, create single line of components including all those elements
    if (Array.isArray(parsedItem)) {
      const singleLineOfComponents = parsedItem.map((item) => {
        return createElement(cw3Components[item.componentType as Cw3Component], { ...item.props });
      });
      return (
        <div className="flex items-center gap-2" key="listKey">
          {singleLineOfComponents}
        </div>
      );
    }

    // Case 3: If not a cw3Component resort to default: a text response with the item as the input
    return createElement(cw3Components[Cw3Component.TextResponse], { text: input });

    // TODO also can handle an error here
  });

  // Returns the list of compiled components
  return <>{components}</>;
};

const getWidget = (widget: Widget): JSX.Element => {
  const { fnName: fn, args } = widget;
  const fnName = fn.toLowerCase().replace('display-', '');
  const inputString = `${fnName}(${args})`;
  const parsedArgs = parseArgsStripQuotes(args);

  const widgets = new Map<string, JSX.Element>([
    [
      'uniswap',
      <ConnectFirst>
        <Uniswap
          tokenInSymbol={parsedArgs[0]}
          tokenOutSymbol={parsedArgs[1]}
          inputAmount={parsedArgs[3]}
        />
      </ConnectFirst>,
    ],
    // ['transfer', <ConnectFirst><div/> </ConnectFirst>],
  ]);

  return (
    widgets.get(fnName) || (
      <div className="inline-block bg-slate-500 p-5 text-white">
        Widget not implemented for <code>{inputString}</code>
      </div>
    )
  );
};
