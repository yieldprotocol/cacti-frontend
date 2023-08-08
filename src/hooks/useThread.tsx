import { useRouter } from 'next/router';
import { formatDistanceToNow } from 'date-fns';
import { useMutationUpdateChatSettings } from '@/api/chats/mutations';
import { useQueryChatSettings } from '@/api/chats/queries';
import { useMutationUpdateSharedSession } from '@/api/shares/mutations';
import { useQuerySharedSession } from '@/api/shares/queries';

/**
 * @param threadId? - optional threadId to use instead of the one from the router
 */
const useThread = (threadId?: string, isShare?: boolean) => {
  const { route, query } = useRouter();
  const threadId_ = threadId || query.id?.toString()!;

  const chatSessionId = isShare ? undefined : threadId_;
  const sharedSessionId = isShare ? threadId_ : undefined;
  const {
    isLoading: chatIsLoading,
    isSuccess: chatIsSuccess,
    settings: chatSettings,
  } = useQueryChatSettings(chatSessionId);
  const {
    isLoading: shareIsLoading,
    isSuccess: shareIsSuccess,
    settings: shareSettings,
  } = useQuerySharedSession(sharedSessionId);
  const chatSettingsMutation = useMutationUpdateChatSettings(chatSessionId);
  const shareSettingsMutation = useMutationUpdateSharedSession(sharedSessionId);

  const { threadName, updated } =
    isShare && shareIsSuccess
      ? {
          threadName: shareSettings?.name,
          updated: shareSettings?.updated,
        }
      : !isShare && chatIsSuccess
      ? {
          threadName: chatSettings?.name,
          updated: chatSettings?.updated,
        }
      : {
          threadName: null,
          updated: null,
        };
  const lastEdited = updated
    ? formatDistanceToNow(new Date(updated + 'Z'), { addSuffix: true })
    : 'unknown';
  const isLoading = isShare ? shareIsLoading : chatIsLoading;

  const setThreadName = (newName: string) => {
    if (isShare) {
      shareSettingsMutation.mutate({ metadata: { name: newName } });
    } else {
      chatSettingsMutation.mutate({ metadata: { name: newName } });
    }
  };

  return {
    threadId: threadId_,
    threadName: threadName || threadId_,
    setThreadName,
    isLoading,
    lastEdited,
  };
};

export default useThread;
