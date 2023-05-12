import { ReactNode } from 'react';
import { FeedbackButton } from '@/components/FeedbackButton';
import { SystemMessage } from '@/components/SystemMessage';
import { UserMessage } from '@/components/UserMessage';
import { Message, useChatContext } from '@/contexts/ChatContext';
import { MessageTranslator } from './MessageTranslator_';

export const BotThinking = () => {
  return (
    <div className={`border-white border-[1px] w-full border-opacity-10 rounded-[8px] overflow-hidden p-[8px]`}> 
        <div className="relative h-[32px] overflow-hidden " >   
            <div className="botLight" />
        </div>
    </div>
  );
};