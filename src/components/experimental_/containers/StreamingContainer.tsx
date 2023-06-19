import { Fragment, useEffect } from 'react';
import { composeFromString } from '@/components/cactiComponents/tools/compose';
import { useSharedStateContext } from '@/contexts/SharedStateContext';
import { Widget } from '../MessageTranslator_';

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

  console.log(items);

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
      <Fragment>
        <span className={`${isThinking ? 'after:animate-ellipse' : ''}`}>        
          {composeFromString(`[{"response":"TextResponse","props":{"text":"${prefix}"}}]`)}
        </span>
        <div className="text-white">
          {items.map((item: { name: string; args: any }, i: number) => (
            <Fragment key={`i${i}`}>
              <Widget key={item.name} widget={{ name: item.name, args: item.args }} />
            </Fragment>
          )) || null}
        </div>
        <span>{suffix}</span>
      </Fragment>
    );
  }
  return null;
};
