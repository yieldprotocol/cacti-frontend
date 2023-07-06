import { useRouter } from 'next/router';
import useCachedState from './useCachedState';

/**
 * @param threadId? - optional threadId to use instead of the one from the router
 */
const useThread = (threadId?: string) => {
  
    const router = useRouter();
  const { thread } = router.query;
  const threadId_ = threadId || thread?.[0];

  const threadName = window.localStorage.getItem(`thread-${threadId_}`);
  const setThreadName = (newName: string) => newName && window.localStorage.setItem(`thread-${threadId_}`, newName);

  return {
    threadId: threadId_,
    threadName: threadName || threadId_,
    setThreadName,
  };
};

export default useThread;
