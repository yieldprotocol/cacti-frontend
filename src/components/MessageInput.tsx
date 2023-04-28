import { useCallback, useEffect, useRef, useState } from 'react';
import { ReactMarkdown } from 'react-markdown/lib/react-markdown';
import { ArrowPathIcon, TrashIcon } from '@heroicons/react/24/outline';
import { Message, useChatContext } from '@/contexts/ChatContext';
import { ActionType, Actor, InputType } from '@/types/chat';

interface MessageInputProps {
  message?: Message; // if no message, then this is the bottom component when message has not been established
}

const KeyStrokePill = ({ label }: { label: string }) => (
  <div className="m-auto mr-2 flex">
    <span className="rounded-md bg-gray-500/25 p-1.5 text-xs uppercase text-gray-100">{label}</span>
  </div>
);

const MessageInput = ({ message }: MessageInputProps) => {
  const {
    sendAction,
    truncateUntilNextHumanMessage,
    setInsertBeforeMessageId,
    sendMessage,
    interactor,
    editMessage,
  } = useChatContext();

  const actor = message ? message.actor : interactor;
  const messageId = message?.messageId;

  const inputRef = useRef<HTMLInputElement>(null);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  const initInput = message?.payload || '';
  const [input, setInput] = useState(initInput);
  const inputType = actor === Actor.USER ? InputType.CHAT : InputType.MARKDOWN;
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

  const submitRegenerate = useCallback(() => {
    if (!messageId) return;

    sendAction({ actionType: ActionType.REGENERATE, messageId }); // this also truncates message list on backend
    const beforeMessageId = truncateUntilNextHumanMessage(messageId, { setBotThinking: true });
    setInsertBeforeMessageId(beforeMessageId);
  }, [messageId, sendAction, setInsertBeforeMessageId, truncateUntilNextHumanMessage]);

  const submitDelete = useCallback(() => {
    if (!messageId) return;

    sendAction({ actionType: ActionType.DELETE, messageId }); // this also truncates message list on backend
    const beforeMessageId = truncateUntilNextHumanMessage(messageId, { inclusive: true });
    setInsertBeforeMessageId(beforeMessageId);
  }, [messageId, sendAction, setInsertBeforeMessageId, truncateUntilNextHumanMessage]);

  const focusInput = useCallback(() => {
    inputRef.current?.focus();
  }, []);

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
            onBlur={() => {
              setIsEditing(false);
              setInput(initInput);
              textAreaRef.current?.blur();
            }}
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
                onBlur={() => {
                  setIsEditing(false);
                  setInput(initInput);
                }}
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
            onBlur={() => {
              setInput(initInput);
              setIsEditing(false);
            }}
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
            <button onClick={submitRegenerate}>
              <ArrowPathIcon className="h-4 w-4" />
            </button>
          )}
          <button onClick={submitDelete}>
            <TrashIcon className="h-4 w-4" />
          </button>
        </div>
      )}
    </div>
  );
};

export default MessageInput;
