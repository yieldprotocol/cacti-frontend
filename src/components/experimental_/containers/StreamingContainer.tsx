import { Fragment, useEffect } from 'react';
import { useSharedStateContext } from '@/contexts/SharedStateContext';
import { Widget } from '../MessageTranslator_';
import ListContainer from './ListContainer';
import { Spinner } from '@/utils';

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
        <div className="flex items-center ">
        {isThinking && <Spinner className='ml-2' />}
          <Widget widget={{ name: 'TextResponse', params: { text: prefix, isThinking } }} />
        </div>
        <div className="text-white">
          <ListContainer items={items} showcaseFirst={false} />
        </div>
        <span>{suffix}</span>
      </Fragment>
    );
  }
  return null;
};
