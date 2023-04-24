import { ReactNode } from 'react';
import Avatar from '@/components/Avatar';
import { FeedbackButton } from '@/components/FeedbackButton';
import { MessageTranslator } from '@/components/MessageTranslator';
import { SystemMessage } from '@/components/SystemMessage';
import { Message } from '@/contexts/ChatContext';
import { Actor } from '@/types/chat';
import MessageInput from './MessageInput';

export const MessageItemWrap = ({ actor, children }: { actor: string; children: ReactNode }) => {
  return (
    <div
      className={`
      m-auto flex items-start gap-4 p-4 px-4 py-4 text-base md:gap-6 md:px-40 lg:px-64
       ${actor !== Actor.USER ? 'bg-gray-600 text-white' : 'bg-gray-700 text-white'}`}
    >
      {children}
    </div>
  );
};

export const MessageItem = ({ message }: { message: Message }) => {
  const { actor, payload } = message;

  return (
    <MessageItemWrap actor={actor}>
      <Avatar actor={actor} />
      <div className={`flex w-[100%] flex-col gap-1 md:gap-3 lg:w-[100%]`}>
        {actor === Actor.BOT ? (
          <MessageTranslator message={payload} />
        ) : actor === Actor.SYSTEM ? (
          <SystemMessage message={payload} />
        ) : (
          <MessageInput message={message} />
        )}
      </div>
      {actor === Actor.BOT && <FeedbackButton message={message} />}
    </MessageItemWrap>
  );
};
