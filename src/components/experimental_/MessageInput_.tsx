import { FormEvent, ReactNode, useCallback, useEffect, useRef, useState } from 'react';
import React, { ButtonHTMLAttributes } from 'react';
import { ReadyState } from 'react-use-websocket';
import {
  ChatBubbleLeftRightIcon,
  PaperAirplaneIcon,
  PaperClipIcon,
} from '@heroicons/react/24/outline';
import { useChatContext } from '@/contexts/ChatContext';

interface IconBtnProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}

const IconBtn = ({ children, ...rest }: IconBtnProps) => (
  <button
    className={`
        grid h-9
        w-9
        place-items-center rounded-lg
        bg-teal-400/30 text-gray-100
        duration-200 hover:cursor-pointer hover:bg-gray-800 hover:text-gray-200 disabled:cursor-not-allowed disabled:bg-teal-200/20
        disabled:text-teal-100/40
        `}
    {...rest}
  >
    {children}
  </button>
);
/**
 * used for focusing with crtl + k and auto focus on mount
 */
const useFocus = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const handleKeyPress = useCallback((e: KeyboardEvent) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
      e.preventDefault();
      focusInput();
    }
  }, []);

  const focusInput = () => {
    inputRef.current?.focus();
  };

  useEffect(() => {
    document.addEventListener('keydown', handleKeyPress);
    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, [handleKeyPress]);

  // /* set input focus on mount */
  useEffect(() => {
    focusInput();
  }, []);
  return [inputRef];
};

const MessageInput = () => {
  const [messageInput, setMessageInput] = useState<string>('');

  const { sendMessage, interactor, setInteractor, connectionStatus } = useChatContext();
  const [inputRef] = useFocus();

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

  const isConnected = connectionStatus === ReadyState.OPEN;

  return (
    <div className="mx-auto w-full max-w-4xl rounded-xl bg-black/30">
      <div className="flex items-center gap-1 rounded-xl border border-gray-300/10 p-1 duration-200 focus-within:border-teal-100/30 lg:gap-3 lg:p-2">
        <div className="text-end">
          <button
            className="grid h-9 w-9 cursor-pointer select-none place-items-center rounded-lg bg-teal-200/10 align-middle text-white/70 transition duration-100 ease-in-out hover:text-white/90"
            type="button"
            onClick={toggleInteractionMode}
          >
            {interactor === 'user' ? (
              <ChatBubbleLeftRightIcon className="h-5 w-5" />
            ) : (
              <PaperClipIcon className="h-5 w-5" />
            )}
          </button>
        </div>

        <form onSubmit={handleSendMessage} className="flex w-full grow items-center">
          <input
            type="text"
            onChange={(e) => setMessageInput(e.target.value)}
            placeholder={interactor === 'user' ? 'Enter your message...' : 'Enter your comment...'}
            tabIndex={0}
            value={messageInput}
            ref={inputRef}
            className={`   
            grow
            bg-transparent
            tracking-wider
            text-white/30 placeholder:text-white/30
            focus:text-white/70 focus:outline-none
          `}
          />
          <IconBtn onClick={handleSendMessage} disabled={!isConnected || !messageInput}>
            <PaperAirplaneIcon className="h-5 w-5" />
          </IconBtn>
        </form>
      </div>
    </div>
  );
};

export default MessageInput;
