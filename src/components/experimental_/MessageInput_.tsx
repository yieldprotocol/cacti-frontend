import { FormEvent, useCallback, useEffect, useRef, useState } from 'react';
import { ChatBubbleBottomCenterIcon, ChatBubbleBottomCenterTextIcon, ChatBubbleLeftEllipsisIcon, ChatBubbleLeftRightIcon, ClipboardDocumentListIcon, PaperAirplaneIcon, PaperClipIcon } from '@heroicons/react/24/outline';
import { useChatContext } from '@/contexts/ChatContext';

export const MessageInput = ({}) => {
  const [messageInput, setMessageInput] = useState<string>('');
  const inputRef = useRef<HTMLInputElement>(null);

  const { sendMessage, interactor, setInteractor } = useChatContext();

  /* set input focus on mount */
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleSendMessage = (e: FormEvent) => {
    e.preventDefault();
    if (messageInput.length > 0) {
      sendMessage(messageInput);
      setMessageInput('');
    }
  };

  const toggleInteractionMode = (e: FormEvent) => {
    e.preventDefault();
    setInteractor(interactor === 'user' ? 'commenter' : 'user');
  };

  const sendButtonIcon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="h-5 w-5 focus:bg-gray-800"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
      />
    </svg>
  );

  return (
    <div
      className={`w-[90%] bg-white bg-opacity-5 p-[8px] grid grid-cols-12 items-center gap-3`}
    >
      <div className='col-span-1 text-end'>
      <button
          className="w-[24px] align-middle cursor-pointer select-none text-white/70 hover:text-white transition ease-in-out"
          onClick={toggleInteractionMode}
        >
          {interactor === 'user' ? <ChatBubbleLeftRightIcon  /> : <PaperClipIcon />}
        </button>
      </div>
      
      <div className='col-span-9'>
        <form onSubmit={handleSendMessage}>
          <input
            type="text"
            onChange={(e) => setMessageInput(e.target.value)}
            placeholder={interactor === 'user' ? 'Enter your chat message...' : 'Enter your comment...'}
            tabIndex={0}
            value={messageInput}
            ref={inputRef}
            
            className={`   
            w-full
            rounded-[8px] 
            p-2
            text-white/70
            bg-transparent
            hover:bg-gray-700/20
            hover:ring-1
            focus:ring-1
            
            hover:ring-gray-500/80
            focus:text-gray-50
            focus:outline-none
            focus:ring-gray-500/80
          `}
          />
        </form>
      </div>

      <div className='col-span-2' >
        <button
          className="p-[8px] cursor-pointer select-none text-center text-white transition ease-in-out bg-teal-600 rounded-[8px]"
          onClick={handleSendMessage}
        >
          {/* <div className="flex justify-center">{sendButtonIcon}</div> */}
          <div className="flex justify-center text-white/70"> Submit </div>
        </button>

      </div>
    </div>
  );
};
