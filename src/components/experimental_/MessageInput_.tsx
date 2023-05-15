import { FormEvent, useCallback, useEffect, useRef, useState } from 'react';
import { ChatBubbleLeftEllipsisIcon, ClipboardDocumentListIcon } from '@heroicons/react/24/outline';
import { useChatContext } from '@/contexts/ChatContext';

export const MessageInput = ({}) => {
  const [messageInput, setMessageInput] = useState<string>('');
  const inputRef = useRef<HTMLInputElement>(null);

  const { sendMessage, interactor, setInteractor } = useChatContext();

  useEffect(() => {
    /* set input focus on mount */
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
    <form onSubmit={handleSendMessage}>
      <div className="flex bg-red-600">
        <input
          type="text"
          onChange={(e) => setMessageInput(e.target.value)}
          className="mr-4 block w-full rounded-sm border border-solid border-gray-500 bg-gray-600 bg-clip-padding px-3 py-1.5 pr-10 text-base font-normal text-white transition ease-in-out focus:border-gray-400 focus:text-white focus:outline-none"
          placeholder={interactor === 'user' ? 'Enter your message...' : 'Enter your comment...'}
          tabIndex={0}
          value={messageInput}
          ref={inputRef}
        />
        <button
          className="-ml-14 w-10 cursor-pointer select-none text-center text-white transition ease-in-out"
          onClick={handleSendMessage}
        >
          <div className="flex justify-center">{sendButtonIcon}</div>
        </button>
        <button
          className="mx-4 w-6 cursor-pointer select-none text-center text-white transition ease-in-out"
          onClick={toggleInteractionMode}
        >
          {interactor === 'user' ? <ChatBubbleLeftEllipsisIcon /> : <ClipboardDocumentListIcon />}
        </button>
      </div>
    </form>
  );
};
