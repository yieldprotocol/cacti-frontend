import { useMemo } from 'react';
import { parseMessage } from '@/utils/parse-message';

const useParseMessage = (message: string) => useMemo(() => parseMessage(message), [message]);

export default useParseMessage;
