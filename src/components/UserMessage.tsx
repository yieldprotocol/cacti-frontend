import { useEffect, useRef, useState } from 'react';
import { ArrowPathIcon, PencilSquareIcon, TrashIcon } from '@heroicons/react/24/outline';
import ReactMarkdown from 'react-markdown';

export const UserMessage = ({
  actor,
  initialText,
  submitEdit,
  submitRegenerate,
  submitDelete,
}: {
  actor: string;
  initialText: string;
  submitEdit: (text: string) => void;
  submitRegenerate: () => void;
  submitDelete: () => void;
}) => {
  const [input, setInput] = useState(initialText);
  const [hovered, setHovered] = useState(true);
  const [isEditing, setIsEditing] = useState(false);

  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const handleKeys = (e: globalThis.KeyboardEvent) => {
      // cancel edit
      if (e.key === 'Escape') {
        setIsEditing(false);
        setInput(initialText);
      }

      // submit edit
      if (e.key === 'Enter' && (actor === 'user' || !e.shiftKey)) {
        if (input !== initialText) {
          submitEdit(input);
        }
        inputRef.current?.blur();
        setInput(input);
        setIsEditing(false);
      }
    };

    window.addEventListener('keydown', handleKeys);

    return () => window.removeEventListener('keydown', handleKeys);
  }, [initialText, input, submitEdit]);

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
      {actor === 'commenter' && !isEditing
      ?
      <ReactMarkdown>{input}</ReactMarkdown>
      :
      <textarea
        ref={inputRef}
        className={`
      flex h-full w-full flex-col gap-3 rounded-md bg-gray-700 p-3 hover:bg-gray-700/20 focus:outline-none
      `}
        value={input}
        onChange={(e) => {
          setIsEditing(true);
          setInput(e.target.value);
        }}
        onBlur={() => {
          setInput(initialText);
          setIsEditing(false);
        }}
        onFocus={() => setIsEditing(true)}
      />
      }
      {isEditing && (
        <div className="m-auto mr-2 flex">
          <span className="rounded-md bg-gray-500/25 p-1.5 text-xs uppercase text-gray-100">
            enter
          </span>
        </div>
      )}
      {hovered && !isEditing && (
        <>
          <button className="flex p-2" onClick={() => setIsEditing(true)}>
            <PencilSquareIcon className="h-4 w-4" />
          </button>
          {actor === 'user' && (
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
