import { useCallback, useEffect, useRef, useState } from 'react';
import { ReactMarkdown } from 'react-markdown/lib/react-markdown';
import { ArrowPathIcon, TrashIcon } from '@heroicons/react/24/outline';
import InputTypeDropdown from '@/components/InputTypeDropdown';
import { Message, useChatContext } from '@/contexts/ChatContext';
import { ActionType, Actor, InputType } from '@/types/chat';

interface MessageInputProps {
  message?: Message; // if no message, then this is the bottom component when message has not been established
}

const MessageInput = ({ message }: MessageInputProps) => {
  const {
    interactor,
    sendAction,
    truncateUntilNextHumanMessage,
    setInsertBeforeMessageId,
    setInteractor,
    sendMessage,
  } = useChatContext();

  const actor = message?.actor || interactor;
  const messageId = message?.messageId;

  const inputRef = useRef<HTMLInputElement>(null);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  const initInput = message?.payload || '';
  const [input, setInput] = useState(initInput);
  const inputType = actor === Actor.USER ? InputType.CHAT : InputType.MARKDOWN;
  const [hovered, setHovered] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const submitEdit = useCallback(() => {
    if (!messageId) return;

    sendAction({ actionType: ActionType.EDIT, messageId, text: input }); // this also truncates message list on backend
    const beforeMessageId = truncateUntilNextHumanMessage(messageId, {
      updatedText: input,
      setBotThinking: actor === Actor.USER,
    });
    setInsertBeforeMessageId(beforeMessageId);
  }, [
    actor,
    input,
    messageId,
    sendAction,
    setInsertBeforeMessageId,
    truncateUntilNextHumanMessage,
  ]);

  const handleSubmit = useCallback(() => {
    // edit message
    if (message) {
      return submitEdit();
    }

    // no message yet
    if (input.length > 0) {
      sendMessage(input);
    }

    // update state to use the latest message payload or the initial input (ie: "")
    setInput(initInput);
  }, [initInput, input, message, sendMessage, submitEdit]);

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
      const { key } = e;
      if (key === 'Escape') {
        setInput(initInput);
      }

      if (key === 'Enter') {
        handleSubmit();
        inputRef.current?.blur();
      }

      if (key === 'I' && !message) {
        e.preventDefault();
        focusInput();
      }
    };

    window.addEventListener('keydown', handleKeys);

    return () => window.removeEventListener('keydown', handleKeys);
  }, [focusInput, handleSubmit, initInput, message]);

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
      {!isEditing && inputType === InputType.MARKDOWN && <ReactMarkdown>{input}</ReactMarkdown>}

      {actor === Actor.COMMENTER && (
        <textarea
          ref={textAreaRef}
          className={inputStyle}
          value={input}
          placeholder={!message ? 'Enter your comment...' : undefined}
          onChange={(e) => {
            setIsEditing(true);
            setInput(e.target.value);
          }}
          onBlur={() => {
            setInput(input);
            setIsEditing(false);
          }}
          onFocus={() => setIsEditing(true)}
        />
      )}

      {actor === Actor.USER && (
        <div className="flex h-full w-full">
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

          {isEditing && input !== '' && (
            <div className="m-auto mr-2 flex">
              <span className="rounded-md bg-gray-500/25 p-1.5 text-xs uppercase text-gray-100">
                enter
              </span>
            </div>
          )}
        </div>
      )}

      {hovered && !isEditing && message && (
        <div className="flex h-full gap-2 p-1 align-top">
          <InputTypeDropdown
            activeType={inputType}
            action={() => {
              setInteractor(actor === Actor.USER ? Actor.COMMENTER : Actor.USER); // TODO handle changing interactor for each message, not just the bottom component
            }}
          />
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
