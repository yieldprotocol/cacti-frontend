import { FormEvent, useEffect, useRef, useState } from 'react';
import React, { ButtonHTMLAttributes } from 'react';
import {
  ChatBubbleLeftRightIcon,
  PaperAirplaneIcon,
  PaperClipIcon,
} from '@heroicons/react/24/outline';
import { useChatContext } from '@/contexts/ChatContext';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

const IconBtn: React.FC<ButtonProps> = ({ children, ...rest }) => (
  <button
    className={`
        grid h-10
        w-10
        place-items-center rounded-lg
        bg-teal-400/30 text-gray-100
        hover:cursor-pointer hover:bg-gray-800 hover:text-gray-200 disabled:cursor-not-allowed disabled:bg-teal-200/20 disabled:text-gray-400
        `}
    {...rest}
  >
    {children}
  </button>
);

export const MessageInput = ({}) => {
  const [messageInput, setMessageInput] = useState<string>('');
  const inputRef = useRef<HTMLInputElement>(null);

  const { sendMessage, interactor, setInteractor, connectionStatus } = useChatContext();

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
  const isConnected = connectionStatus === 1;
  return (
    <div className="flex w-[90%] max-w-4xl items-center gap-3 rounded-lg border border-gray-300/10 p-2 duration-200 focus-within:border-teal-100/30">
      <div className="text-end">
        <button
          className="grid h-10 w-10 cursor-pointer select-none place-items-center rounded-lg bg-teal-200/10 align-middle text-white/70 transition duration-100 ease-in-out hover:text-white/90"
          type="button"
          onClick={toggleInteractionMode}
        >
          {interactor === 'user' ? (
            <ChatBubbleLeftRightIcon className="h-6 w-6" />
          ) : (
            <PaperClipIcon className="h-6 w-6" />
          )}
        </button>
      </div>

      <form onSubmit={handleSendMessage} className="flex w-full grow items-center">
        <input
          type="text"
          onChange={(e) => setMessageInput(e.target.value)}
          placeholder={
            interactor === 'user' ? 'Enter your chat message...' : 'Enter your comment...'
          }
          tabIndex={0}
          value={messageInput}
          ref={inputRef}
          className={`   
            grow
            bg-transparent text-lg
            tracking-wider
            text-gray-400 placeholder:text-gray-500
            focus:text-gray-100 focus:outline-none
          `}
        />
        <IconBtn onClick={handleSendMessage} disabled={!isConnected || !messageInput}>
          <PaperAirplaneIcon className="h-5 w-5" />
        </IconBtn>
      </form>
    </div>
  );
};
