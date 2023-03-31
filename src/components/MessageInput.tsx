import { FormEvent, useEffect, useRef, useState } from 'react';
import { useChatContext } from '@/contexts/ChatContext';
import AutoRequestBuilder from './AutoRequestBuilder';

export const MessageInput = ({}) => {
  const [messageInput, setMessageInput] = useState<string>('');
  const inputRef = useRef<HTMLInputElement>(null);

  const { sendMessage } = useChatContext();

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
    <>
      <form onSubmit={handleSendMessage}>
        <div className="flex">
          <input
            type="text"
            onChange={(e) => setMessageInput(e.target.value)}
            className="form-control mr-4 block w-full rounded-sm border border-solid border-gray-500 bg-gray-600 bg-clip-padding px-3 py-1.5 pr-10 text-base font-normal text-white transition ease-in-out focus:border-gray-400 focus:text-white focus:outline-none"
            placeholder="Enter your message..."
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
        </div>
      </form>
      <AutoRequestBuilder
        input={messageInput}
        setInput={setMessageInput}
        handleSendMessage={handleSendMessage}
      />
    </>
  );
};
