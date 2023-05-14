import { useEffect, useRef, useState } from 'react';
import { ChatBubbleLeftIcon, PencilIcon, PlayIcon, TrashIcon } from '@heroicons/react/24/outline';

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

  const inputRef = useRef<HTMLInputElement>(null);

  const isCommenter = actor === 'commenter';

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
      className={`
      flex justify-between ${
        isCommenter ? 'bg-yellow-300 bg-opacity-5 ' : 'bg-white bg-opacity-5 '
      } 
     hover:bg-gray-700/20 hover:ring-1
      hover:ring-gray-500/80 focus:text-gray-50
      focus:ring-gray-500/80
      ${isEditing ? 'ring-1 ring-gray-500/80' : ''}
      mt-[24px]
      items-center
      px-[24px]
   `}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div>
        {!isCommenter ? (
          <div className="h-[16px] w-[16px] rounded-full bg-teal-500" />
        ) : (
          <ChatBubbleLeftIcon className="h-[16px] w-[16px] text-teal-500" />
        )}
      </div>

      <input
        ref={inputRef}
        className={`
        flex h-full w-full flex-col 
        gap-3 bg-transparent
        p-3
         text-white/70
         focus:outline-none
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

      {isEditing ? (
        <div className="m-auto mr-2 flex gap-2">
          <span className="rounded-md bg-gray-500/25 p-1.5 text-xs uppercase text-gray-100">
            enter
          </span>
          <span className="rounded-md bg-gray-500/25 p-1.5 text-xs uppercase text-gray-100">
            esc
          </span>
        </div>
      ) : (
        <>
          <button className="flex p-2 text-white/70" onClick={() => setIsEditing(true)}>
            <PencilIcon className="h-4 w-4" />
          </button>

          <button className="flex p-2 text-white/70" onClick={submitDelete}>
            <TrashIcon className="h-4 w-4" />
          </button>

          {!isCommenter && (
            <button className="flex p-2 text-white/70" onClick={submitRegenerate}>
              <div className=" h-[20px] w-[20px] rounded-sm bg-[#8B0000] bg-teal-900 p-1 text-white/70">
                <PlayIcon />
              </div>
            </button>
          )}
        </>
      )}
    </div>
  );
};
