import { useRouter } from 'next/router';
import { useMutationUpdateShareSettings } from '@/api/mutations';
import { useQueryShareSettings } from '@/api/queries';

/**
 * @param threadId? - optional threadId to use instead of the one from the router
 */
const useThread = (threadId?: string) => {
  const { query } = useRouter();
  const threadId_ = threadId || query.id?.toString()!;

  const { isSuccess, settings } = useQueryShareSettings(threadId_);
  const settingsMutation = useMutationUpdateShareSettings(threadId_);

  const threadName = (isSuccess && settings?.name) || null;
  const setThreadName = (newName: string) => {
    settingsMutation.mutate({ metadata: { name: newName } });
  };
  //const threadName = window.localStorage.getItem(`thread-${threadId_}`);
  //const setThreadName = (newName: string) =>
  //  newName && window.localStorage.setItem(`thread-${threadId_}`, newName);

  return {
    threadId: threadId_,
    threadName: threadName || threadId_,
    setThreadName,
  };
};

export default useThread;
