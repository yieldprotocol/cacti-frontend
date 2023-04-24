import { useCallback, useEffect, useRef, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { ArrowPathIcon, TrashIcon } from '@heroicons/react/24/outline';
import { Message, useChatContext } from '@/contexts/ChatContext';
import { ActionType, Actor, InputType } from '@/types/chat';
import InputTypeDropdown from './InputTypeDropdown';

export const UserMessage = ({ message }: { message: Message }) => {
  const { sendAction, truncateUntilNextHumanMessage, setInsertBeforeMessageId, setInteractor } =
    useChatContext();
  const { actor, payload, messageId } = message;

  const [input, setInput] = useState(payload);
  const [hovered, setHovered] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [inputType, setInputType] = useState<InputType>(InputType.CHAT);

  const inputRef = useRef<HTMLInputElement>(null);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  const submitEdit = useCallback(
    (text: string) => {
      sendAction({ actionType: ActionType.EDIT, messageId, text }); // this also truncates message list on backend
      const beforeMessageId = truncateUntilNextHumanMessage(messageId, {
        updatedText: text,
        setBotThinking: actor === Actor.USER,
      });
      setInsertBeforeMessageId(beforeMessageId);
    },
    [actor, messageId, sendAction, setInsertBeforeMessageId, truncateUntilNextHumanMessage]
  );

  const submitRegenerate = useCallback(() => {
    sendAction({ actionType: ActionType.REGENERATE, messageId }); // this also truncates message list on backend
    const beforeMessageId = truncateUntilNextHumanMessage(messageId, { setBotThinking: true });
    setInsertBeforeMessageId(beforeMessageId);
  }, [messageId, sendAction, setInsertBeforeMessageId, truncateUntilNextHumanMessage]);

  const submitDelete = useCallback(() => {
    sendAction({ actionType: ActionType.DELETE, messageId }); // this also truncates message list on backend
    const beforeMessageId = truncateUntilNextHumanMessage(messageId, { inclusive: true });
    setInsertBeforeMessageId(beforeMessageId);
  }, [messageId, sendAction, setInsertBeforeMessageId, truncateUntilNextHumanMessage]);

  // handle keyboard shortcuts
  useEffect(() => {
    const handleKeys = (e: globalThis.KeyboardEvent) => {
      // cancel edit
      if (e.key === 'Escape') {
        setIsEditing(false);
        setInput(payload);
      }

      // submit edit
      if (e.key === 'Enter' && (actor === Actor.USER || !e.shiftKey)) {
        if (input !== payload) {
          submitEdit(input);
        }
        inputRef.current?.blur();
        setInput(input);
        setIsEditing(false);
      }
    };

    window.addEventListener('keydown', handleKeys);

    return () => window.removeEventListener('keydown', handleKeys);
  }, [actor, input, payload, submitEdit]);

  return (
    <div
      className={`flex justify-between rounded-md bg-gray-700
    hover:bg-gray-700/20 hover:ring-1
      hover:ring-gray-500/80 focus:text-gray-50
      focus:ring-gray-500/80
   ${isEditing ? 'ring-1 ring-gray-500/80' : ''}
   `}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {actor === Actor.COMMENTER && !isEditing && inputType === InputType.MARKDOWN && (
        <ReactMarkdown>{input}</ReactMarkdown>
      )}

      {actor === Actor.COMMENTER ? (
        <textarea
          ref={textAreaRef}
          className={`flex h-full w-full flex-col gap-3 rounded-md bg-gray-700 p-3 hover:bg-gray-700/20 focus:outline-none`}
          value={input}
          onChange={(e) => {
            setIsEditing(true);
            setInput(e.target.value);
          }}
          onBlur={() => {
            setInput(payload);
            setIsEditing(false);
          }}
          onFocus={() => setIsEditing(true)}
        />
      ) : (
        <>
          <input
            ref={inputRef}
            className={`flex h-full w-full flex-col gap-3 rounded-md bg-gray-700 p-3 hover:bg-gray-700/20 focus:outline-none`}
            value={input}
            onChange={(e) => {
              setIsEditing(true);
              setInput(e.target.value);
            }}
            onBlur={() => {
              setInput(payload);
              setIsEditing(false);
            }}
            onFocus={() => setIsEditing(true)}
          />

          {isEditing && (
            <div className="m-auto mr-2 flex">
              <span className="rounded-md bg-gray-500/25 p-1.5 text-xs uppercase text-gray-100">
                enter
              </span>
            </div>
          )}
        </>
      )}

      {hovered && !isEditing && (
        <>
          {actor === Actor.USER && (
            <InputTypeDropdown
              activeType={inputType}
              action={() => {
                setInteractor(actor === Actor.USER ? Actor.COMMENTER : Actor.USER);
                setInputType(inputType === InputType.CHAT ? InputType.MARKDOWN : InputType.CHAT);
              }}
            />
          )}
          {actor === Actor.USER && (
            <button className="flex p-2" onClick={submitRegenerate}>
              <ArrowPathIcon className="h-4 w-4" />
            </button>
          )}
          <button className="flex p-2" onClick={submitDelete}>
            <TrashIcon className="h-4 w-4" />
          </button>
        </>
      )}
    </div>
  );
};
