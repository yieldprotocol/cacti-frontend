import React from 'react';
import { useRouter } from 'next/router';
import { useMutationChatImportSession } from '@/api/chats/mutations';
import { useQuerySharedSession, useQueryShares } from '@/api/shares/queries';
import { Message, useChatContext } from '@/contexts/ChatContext';
import { Spinner } from '@/utils';
import { MessageItem } from './MessageItem_';

const ShareBox = () => {
  const router = useRouter();
  const { id } = router.query;

  const { showDebugMessages } = useChatContext();

  const { isLoading, isSuccess, settings } = useQuerySharedSession(id as string);
  const { mutate: continueChat, isLoading: isCreatingChat } = useMutationChatImportSession(
    id as string
  );

  const messageContentComponent = true ? (
    <div className="h-full w-full pt-8">
      {isSuccess &&
        settings?.messages.map((message) => {
          if (!showDebugMessages && (message.actor === 'system' || message.actor === 'function')) {
            return <React.Fragment key={message.messageId} />;
          }
          return (
            <React.Fragment key={message.messageId}>
              <MessageItem message={message} isShare={true} />
            </React.Fragment>
          );
        })}
    </div>
  ) : (
    <div> Empty chat session </div>
  );

  return (
    <div className="relative flex h-full w-full flex-col overflow-auto ">
      <div
        className={`${
          isCreatingChat && 'blur'
        }  flex h-full w-full items-center justify-center overflow-auto pt-5`}
      >
        {isLoading || !isSuccess ? <Spinner /> : messageContentComponent}
      </div>
      <div
        className={` sticky top-[100vh] flex w-full items-center justify-center justify-items-center bg-gray-secondary px-2 py-4 lg:py-6`}
      >
        <button
          onClick={() => continueChat({ metadata: {} })}
          className="rounded-lg bg-green-primary px-2 py-1 hover:bg-green-primary/80 "
        >
          <div className="flex items-center gap-2 p-2 text-gray-300">
            {isCreatingChat ? (
              <>
                <Spinner className="text-gray-300" /> <div>Converting to a new chat</div>
              </>
            ) : (
              <div>Continue chatting</div>
            )}
          </div>
        </button>
      </div>
    </div>
  );
};

export default ShareBox;
