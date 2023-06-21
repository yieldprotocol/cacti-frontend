import { Fragment, useEffect } from 'react';
import { composeFromString } from '@/components/cactiComponents/tools/compose';
import { useSharedStateContext } from '@/contexts/SharedStateContext';
import { BotThinking } from '../BotThinking';
import MessageTranslator, { Widget } from '../MessageTranslator_';
import ListContainer from './ListContainer';

export interface StreamingContainerProps {
  operation: string;
  item: Widget | null;
  prefix: string | null;
  suffix: string | null;
  isThinking: boolean | null;
}

export const StreamingContainer = ({
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (operation === 'create') {
    return (
      <Fragment>
        <div className="flex flex-row">
          {composeFromString(`[{"response":"TextResponse","props":{"text":"${prefix}"}}]`)}
        </div>
        <div className="text-white">
          <ListContainer items={items} showCase={false} />
          {/* {items.map((item: any, i: number) => (
            <Widget key={`i${i}`} widget={{ name: item.name, args: item.params }} />
          )) || null} */}
        </div>
        <span>{suffix}</span>
      </Fragment>
    );
  }
  return null;
};
