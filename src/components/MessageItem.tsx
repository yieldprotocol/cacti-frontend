import { ReactNode } from 'react';
import Avatar from '@/components/Avatar';
import { FeedbackButton } from '@/components/FeedbackButton';
import { MessageTranslator } from '@/components/MessageTranslator';
import { SystemMessage } from '@/components/SystemMessage';
import { UserMessage } from '@/components/UserMessage';
import { Message, useChatContext } from '@/contexts/ChatContext';

export const MessageItemWrap = ({ actor, children }: { actor: string; children: ReactNode }) => {
  return (
    <div
      className={`
      m-auto flex items-start gap-4 p-4 px-4 py-4 text-base md:gap-6 md:px-40 lg:px-64
       ${actor != 'user' ? 'bg-gray-600 text-white' : 'bg-gray-700 text-white'}`}
    >
      {children}
    </div>
  );
};

export const MessageItem = ({ message }: { message: Message }) => {
  const { actor, payload, messageId } = message;
  const {
    sendAction,
    truncateAndSendMessage,
    truncateUntilNextUserMessage,
    setInsertBeforeMessageId,
  } = useChatContext();

  const submitEdit = (text: string) => {
    sendAction({ actionType: 'edit', messageId }); // this truncates message list on backend
    truncateAndSendMessage(messageId, text);
  };

  const submitRegenerate = () => {
    sendAction({ actionType: 'regenerate', messageId });
    const beforeMessageId = truncateUntilNextUserMessage(messageId);
    setInsertBeforeMessageId(beforeMessageId);
  };

  return (
    <MessageItemWrap actor={actor}>
      <Avatar actor={actor} />
      <div className={`relative flex w-[100%] flex-col gap-1 md:gap-3 lg:w-[100%]`}>
        {actor === 'bot' ? (
          <MessageTranslator message={payload} />
        ) : actor === 'system' ? (
          <SystemMessage message={payload} />
        ) : (
          <UserMessage
            {...{
              initialText: payload,
              submitEdit,
              submitRegenerate,
            }}
          />
        )}
      </div>
      {actor === 'bot' && <FeedbackButton message={message} />}
    </MessageItemWrap>
  );
};
