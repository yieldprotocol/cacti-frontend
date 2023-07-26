import { useRouter } from 'next/router';
import { useMutationUpdateChatSettings } from '@/api/chats/mutations';
import { useQueryChatSettings } from '@/api/chats/queries';

/**
 * @param threadId? - optional threadId to use instead of the one from the router
 */
const useThread = (threadId?: string) => {
  const { query } = useRouter();
  const threadId_ = threadId || query.id?.toString()!;

  const { isSuccess, settings } = useQueryChatSettings(threadId_);
  const settingsMutation = useMutationUpdateChatSettings(threadId_);

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
