import { useCallback, useEffect, useRef, useState } from 'react';
import { ReactMarkdown } from 'react-markdown/lib/react-markdown';
import { ArrowPathIcon, TrashIcon } from '@heroicons/react/24/outline';
import { Message, useChatContext } from '@/contexts/ChatContext';
import { Actor, InputType } from '@/types/chat';

interface MessageInputProps {
  message?: Message; // if no message, then this is the bottom component when message has not been established
}

const KeyStrokePill = ({ label }: { label: string }) => (
  <div className="m-auto mr-2 flex">
    <span className="rounded-md bg-gray-500/25 p-1.5 text-xs uppercase text-gray-100">{label}</span>
  </div>
);

const MessageInput = ({ message }: MessageInputProps) => {
  const { interactor, sendMessage, editMessage, regenerateMessage, deleteMessage } =
    useChatContext();

  const actor = message ? message.actor : interactor;

  const inputRef = useRef<HTMLInputElement>(null);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  const initInput = message?.payload || '';
  const [input, setInput] = useState(initInput);
  const inputType = actor === Actor.USER ? InputType.CHAT : InputType.MARKDOWN;
  const refToUse = inputType === InputType.CHAT ? inputRef : textAreaRef;
  const [hovered, setHovered] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const handleSubmit = useCallback(() => {
    // no message yet
    if (input.length > 0 && !message) {
      sendMessage(input);
      setInput('');
    }

    // edit message
    if (message && initInput !== input) {
      editMessage(message, input);
    }

    setIsEditing(false);
  }, [editMessage, initInput, input, message, sendMessage]);

  const handleCancel = useCallback(() => {
    setIsEditing(false);
    message && setInput(initInput); // keep input if no message yet
    refToUse.current?.blur();
  }, [initInput, message, refToUse]);

  const focusInput = useCallback(() => {
    (inputType === InputType.CHAT ? inputRef : textAreaRef).current?.focus();
  }, [inputType]);

  // focus input on mount if bottom component
  useEffect(() => {
    !message && focusInput();
  }, [focusInput, message]);

  // handle keyboard shortcuts from window
  useEffect(() => {
    const handleKeys = (e: globalThis.KeyboardEvent) => {
      const { key, shiftKey } = e;
      if (key === 'Escape') {
        setIsEditing(false);
        setInput(initInput);
      }

      if (inputType === InputType.CHAT && key === 'Enter') {
        handleSubmit();
        inputRef.current?.blur();
      }

      if (inputType === InputType.MARKDOWN && shiftKey) {
        if (key === 'Enter') {
          handleSubmit();
          textAreaRef.current?.blur();
        }
      }

      if (key === 'I' && !message) {
        e.preventDefault();
        focusInput();
      }
    };

    window.addEventListener('keydown', handleKeys);

    return () => window.removeEventListener('keydown', handleKeys);
  }, [focusInput, handleSubmit, initInput, inputType, message]);

  // update input on message changes
  useEffect(() => {
    message && message.payload !== input && !isEditing && setInput(message.payload);
  }, [input, isEditing, message]);

  // focus input on interactor change
  useEffect(() => {
    focusInput();
  }, [focusInput, interactor]);

  // shared style between textarea and input
  const inputStyle = `flex h-full w-full flex-col gap-3 rounded-md bg-gray-700 p-3 hover:bg-gray-700/20 focus:outline-none`;

  return (
    <div
      className={`
      flex h-full justify-between rounded-md bg-gray-700
      text-gray-50 caret-white  hover:bg-gray-700/20 hover:ring-1 
      hover:ring-gray-500/80 focus:text-gray-50 focus:ring-gray-500/80
       ${isEditing || !message ? 'ring-1 ring-gray-400/80' : ''}
   `}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="flex h-full w-full">
        {actor === Actor.COMMENTER && (
          <div
            className="flex h-full w-full hover:cursor-text"
            onClick={() => {
              setIsEditing(true);
              textAreaRef.current?.focus();
            }}
            onBlur={handleCancel}
          >
            {!isEditing && message ? (
              <ReactMarkdown className={inputStyle}>{input}</ReactMarkdown>
            ) : (
              <textarea
                ref={textAreaRef}
                className={inputStyle}
                value={input}
                placeholder={!message ? 'Enter your comment in markdown...' : undefined}
                onChange={(e) => {
                  setIsEditing(true);
                  setInput(e.target.value);
                }}
                onBlur={handleCancel}
                onFocus={() => setIsEditing(true)}
              />
            )}
          </div>
        )}

        {actor === Actor.USER && (
          <input
            ref={inputRef}
            className={inputStyle}
            value={input}
            placeholder={!message ? 'Enter your message...' : undefined}
            onChange={(e) => {
              setIsEditing(true);
              setInput(e.target.value);
            }}
            onBlur={handleCancel}
            onFocus={() => setIsEditing(true)}
          />
        )}
      </div>
      {isEditing && input !== '' && (
        <KeyStrokePill label={inputType === InputType.CHAT ? 'enter' : 'shift+enter'} />
      )}

      {hovered && !isEditing && message && (
        <div className="flex h-full gap-2 p-2 align-top">
          {actor === Actor.USER && (
            <button onClick={() => regenerateMessage(message)}>
              <ArrowPathIcon className="h-4 w-4" />
            </button>
          )}
          <button onClick={() => deleteMessage(message)}>
            <TrashIcon className="h-4 w-4" />
          </button>
        </div>
      )}
    </div>
  );
};

export default MessageInput;
