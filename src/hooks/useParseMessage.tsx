import { useMemo } from 'react';
import { parseMessage } from '@/utils/parse-message';

const useParseMessage = (message: string) => {
  return useMemo(() => {
    return parseMessage(message);
  }, [message]);
};

export default useParseMessage;
