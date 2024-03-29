import { FormEvent, ReactNode, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import React, { ButtonHTMLAttributes } from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import { ReadyState } from 'react-use-websocket';
import {
  ChatBubbleLeftRightIcon,
  PaperAirplaneIcon,
  PaperClipIcon,
} from '@heroicons/react/24/outline';
import { useAccount } from 'wagmi';
import { useChatContext } from '@/contexts/ChatContext';
import CustomConnectButton from './CustomConnectButton';
import InputWrap from './InputWrap';

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
  const inputRef = useRef<HTMLTextAreaElement>(null);
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

  const { isConnected: walletConnected } = useAccount();

  const { sendMessage, interactor, setInteractor, connectionStatus } = useChatContext();
  const [inputRef] = useFocus();
  const submit = useCallback(() => {
    if (messageInput.length > 0) {
      sendMessage(messageInput);
      setMessageInput('');
    }
  }, [messageInput, sendMessage]);

  const handleSendMessage = (e: FormEvent) => {
    e.preventDefault();
    submit();
  };

  const onKeyPress: React.KeyboardEventHandler = (e) => {
    if (e.code === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      submit();
    }
  };
  const toggleInteractionMode = (e: FormEvent) => {
    e.preventDefault();
    setInteractor(interactor === 'user' ? 'commenter' : 'user');
  };

  const botConnected = connectionStatus === ReadyState.OPEN;

  const isConnected = useMemo(() => {
    return walletConnected && botConnected;
  }, [botConnected, walletConnected]);

  return (
    <>
      {isConnected ? (
        <InputWrap className_="max-w-4xl">
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
          <form onSubmit={handleSendMessage} className="flex w-full grow items-center space-x-2">
            <TextareaAutosize
              onChange={(e) => setMessageInput(e.target.value)}
              placeholder={
                interactor === 'user' ? 'Enter your message...' : 'Enter your comment...'
              }
              tabIndex={0}
              value={messageInput}
              ref={inputRef}
              onKeyDown={isConnected && messageInput ? onKeyPress : undefined}
              className={`   
            grow
            resize-none
            bg-transparent
            tracking-wider text-white/30
            placeholder:text-white/30 focus:text-white/70 focus:outline-none
          `}
              maxRows={7}
            />
            <IconBtn onClick={handleSendMessage} disabled={!isConnected || !messageInput}>
              <PaperAirplaneIcon className="h-5 w-5" />
            </IconBtn>
          </form>
        </InputWrap>
      ) : botConnected ? (
        <div className="flex w-full justify-center">
          <CustomConnectButton />
        </div>
      ) : (
        <div className="flex w-full animate-pulse justify-center text-sm text-white/30">
          Waiting for Cacti connection ...
        </div>
      )}
    </>
  );
};

export default MessageInput;
