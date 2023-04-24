import { ReactNode } from 'react';
import { TrashIcon } from '@heroicons/react/24/outline';
import Avatar from '@/components/Avatar';
import { FeedbackButton } from '@/components/FeedbackButton';
import { MessageTranslator } from '@/components/MessageTranslator';
import { SystemMessage } from '@/components/SystemMessage';
import { UserMessage } from '@/components/UserMessage';
import { Message, useChatContext } from '@/contexts/ChatContext';
import { ActionType, Actor } from '@/types/chat';

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
  const { sendAction, truncateUntilNextHumanMessage, setInsertBeforeMessageId } = useChatContext();

  const submitEdit = (text: string) => {
    sendAction({ actionType: ActionType.EDIT, messageId, text }); // this also truncates message list on backend
    const beforeMessageId = truncateUntilNextHumanMessage(messageId, {
      updatedText: text,
      setBotThinking: actor === Actor.USER,
    });
    setInsertBeforeMessageId(beforeMessageId);
  };

  const submitRegenerate = () => {
    sendAction({ actionType: ActionType.REGENERATE, messageId }); // this also truncates message list on backend
    const beforeMessageId = truncateUntilNextHumanMessage(messageId, { setBotThinking: true });
    setInsertBeforeMessageId(beforeMessageId);
  };

  const submitDelete = () => {
    sendAction({ actionType: ActionType.DELETE, messageId }); // this also truncates message list on backend
    const beforeMessageId = truncateUntilNextHumanMessage(messageId, { inclusive: true });
    setInsertBeforeMessageId(beforeMessageId);
  };

  return (
    <MessageItemWrap actor={actor}>
      <Avatar actor={actor} />
      <div className={`flex w-[100%] flex-col gap-1 md:gap-3 lg:w-[100%]`}>
        {actor === Actor.BOT ? (
          <MessageTranslator message={payload} />
        ) : actor === Actor.SYSTEM ? (
          <SystemMessage message={payload} />
        ) : (
          <UserMessage
            {...{
              actor,
              initialText: payload,
              submitEdit,
              submitRegenerate,
              submitDelete,
            }}
          />
        )}
      </div>
      {actor === Actor.BOT && <FeedbackButton message={message} />}
    </MessageItemWrap>
  );
};
