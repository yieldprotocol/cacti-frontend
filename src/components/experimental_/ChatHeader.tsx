import { ReactNode } from 'react';
import { PencilIcon, ShareIcon, TrashIcon } from '@heroicons/react/24/outline';
import { Message, useChatContext } from '@/contexts/ChatContext';
import { FeedbackButton } from './FeedbackButton_';
import { MessageTranslator } from './MessageTranslator_';
import { SystemMessage } from './SystemMessage_';
import { UserMessage } from './UserMessage_';

export const ChatHeader = ({ threadId }: { threadId: String | String[] }) => {



  const ShareButton = () => {
    return (
      <div
      className=" w-full cursor-pointer select-none rounded-[8px] bg-teal-900 p-[8px] text-center text-white transition ease-in-out active:bg-transparent"

        onClick={()=> console.log('share')}
      >
       Share
      </div>
    );
  };
  
  return (
    <div className="w-full items-center bg-white bg-opacity-5 p-2 py-[24px]">
      <div className={`mb-4 flex justify-between px-4 py-2 text-white/70 `}>
        <div className='space-y-2'>
          <div className="flex gap-2">{threadId} 
          <div className='w-4 h-4'> <PencilIcon/> </div>
            </div>
          <div className="text-xs text-white/30"> Last edit: yesterday </div>
        </div>

        <div className={`flex flex-row items-center  gap-2`}>
          <div> <ShareButton /> </div>
          <div className="h-4 w-4">
            <TrashIcon />
          </div>
        </div>
      </div>
    </div>
  );
};
