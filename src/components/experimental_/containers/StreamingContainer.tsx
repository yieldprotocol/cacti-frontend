import { useSharedStateContext } from "@/contexts/SharedStateContext";
import { useEffect } from "react";

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
        <div className="p-3 text-white">
          <span className={`${isThinking ? 'after:animate-ellipse' : ''}`}>here</span>
           <div className='text-white'> here </div>
          <span>{suffix}</span>
        </div>
      );
    }
    return null;
  };