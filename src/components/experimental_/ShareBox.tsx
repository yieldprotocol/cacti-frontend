import React from 'react';
import { ReadyState } from 'react-use-websocket';
import { useRouter } from 'next/router';
import { useMutationChatImportSession } from '@/api/chats/mutations';
import { useQuerySharedSession } from '@/api/shares/queries';
import { useChatContext } from '@/contexts/ChatContext';
import { Spinner } from '@/utils';
import CustomConnectButton from './CustomConnectButton';
import { MessageItem } from './MessageItem_';
import { buttonStyle } from './layout/sidebar/NewChatButton';

const ShareBox = () => {
  const isWalletConnected = true;

  const router = useRouter();
  const { id } = router.query;

  const { showDebugMessages } = useChatContext();

  const { isLoading, isSuccess, settings } = useQuerySharedSession(id as string);
  const { mutate: continueChat, isLoading: isCreatingChat } = useMutationChatImportSession(
    id as string
  );

  const messageContentComponent = settings?.messages.length ? (
    <div className="h-full w-full pt-8">
      {settings.messages.map((message) => {
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
    <div>Empty chat session</div>
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
        className={`sticky top-[100vh] flex w-full items-center justify-center justify-items-center bg-gray-secondary px-2 py-4 lg:py-6`}
      >
        {isWalletConnected ? (
          <button onClick={() => continueChat({ metadata: {} })} className={buttonStyle}>
            <Spinner className={`text-gray-300 ${!isCreatingChat && 'hidden'}`} />
            <div> {isCreatingChat ? 'Converting to a new chat' : 'Continue Chatting'}</div>
          </button>
        ) : (
          <div>
            <CustomConnectButton />
          </div>
        )}
      </div>
    </div>
  );
};

export default ShareBox;
