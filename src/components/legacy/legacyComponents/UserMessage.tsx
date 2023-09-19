import { useEffect, useRef, useState } from 'react';
import { ArrowPathIcon, PencilSquareIcon, TrashIcon } from '@heroicons/react/24/outline';
import { IconBtn } from '../../shared/IconButton';

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
  const [isEditing, setIsEditing] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleKeys = (e: globalThis.KeyboardEvent) => {
      // cancel edit
      if (e.key === 'Escape') {
        setIsEditing(false);
        setInput(initialText);
      }

      // submit edit
      if (e.key === 'Enter') {
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
      className={`flex items-center justify-between rounded-md bg-gray-700
    pr-1 hover:bg-gray-700/20
      hover:ring-1 hover:ring-gray-500/80
      focus:text-gray-50 focus:ring-gray-500/80
   ${isEditing ? 'ring-1 ring-gray-500/80' : ''}
   `}
    >
      <input
        ref={inputRef}
        className={`
      flex h-full w-full flex-col gap-3 rounded-md bg-gray-700 p-3 hover:bg-gray-700/20 focus:outline-none
      `}
        value={input}
        onClick={() => setIsEditing(true)}
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
      {isEditing && (
        <div className="m-auto mr-2 flex">
          <span className="rounded-md bg-gray-500/25 p-1.5 text-xs uppercase text-gray-100">
            enter
          </span>
        </div>
      )}
      <div
        className={`flex gap-1 opacity-0 duration-200 group-hover:opacity-100 ${
          isEditing && 'hidden'
        }`}
      >
        <IconBtn onClick={() => setIsEditing(true)}>
          <PencilSquareIcon className="h-4 w-4" />
        </IconBtn>
        {actor === 'user' && (
          <IconBtn onClick={submitRegenerate}>
            <ArrowPathIcon className="h-4 w-4" />
          </IconBtn>
        )}
        <IconBtn onClick={submitDelete}>
          <TrashIcon className="h-4 w-4" />
        </IconBtn>
      </div>
    </div>
  );
};
