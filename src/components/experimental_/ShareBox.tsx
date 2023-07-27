import React from 'react';
import { useRouter } from 'next/router';
import { useQuerySharedSession, useQueryShares } from '@/api/shares/queries';
import { Message, useChatContext } from '@/contexts/ChatContext';
import { Spinner } from '@/utils';
import { MessageItem } from './MessageItem_';

const ShareBox = () => {
  const router = useRouter();
  const { id } = router.query;

  const {showDebugMessages} = useChatContext();

  const { isLoading, isSuccess, settings } = useQuerySharedSession(id as string);

  console.log(settings?.messages);

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
    <div className="relative flex h-full w-full flex-col overflow-auto">
      <div className="flex h-full w-full items-center justify-center overflow-auto pt-5">
        {isLoading || !isSuccess ? <Spinner  /> : messageContentComponent}
      </div>
      {/* convert to chat button */}
      <div className="sticky top-[100vh] flex w-full items-center justify-center justify-items-center bg-gray-secondary px-2 py-4 lg:py-6">
        Convert to chat
      </div>
    </div>
  );
};

export default ShareBox;
