import { useEffect } from 'react';
import { ListItem, useSharedStateContext } from '@/contexts/SharedStateContext';
import ListContainer from './ListContainer_';

interface StreamingContainerProps {
  operation: string;
  item: ListItem | null;
  prefix: string | null;
  suffix: string | null;
  isThinking: boolean | null;
}

const StreamingContainer = ({
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
  }, []);
  if (operation === 'create') {
    return (
      <div className="p-3 text-white">
        <span className={`${isThinking ? 'after:animate-ellipse' : ''}`}>{prefix}</span>
        {/* <ListContainer /> */}
        <span>{suffix}</span>
      </div>
    );
  }
  return null;
};

export default StreamingContainer;
