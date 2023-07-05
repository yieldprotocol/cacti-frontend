import { useEffect, useRef, useState } from 'react';
import * as React from 'react';
import {
  PaperAirplaneIcon,
  PaperClipIcon,
  PencilIcon,
  TrashIcon,
} from '@heroicons/react/24/outline';
import Avatar from '../shared/Avatar';

interface IconBtnProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}
const iconBtnBaseStyle = 'center rounded-lg overflow-hidden w-9 h-9 text-white/70';

const IconBtn = ({ children, ...rest }: IconBtnProps) => (
  <button className={iconBtnBaseStyle} {...rest}>
    {children}
  </button>
);

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
      flex 
      justify-between 
      ${
        isCommenter ? 'bg-white bg-opacity-[2%]' : 'bg-white bg-opacity-5 ' //bg-yellow-200 bg-opacity-50
      }
      focus-within:ring-gray-700/70
      hover:bg-gray-700/20
      focus:text-gray-50
      ${isEditing ? 'ring-1 ring-gray-500/30' : ''}
      grid-gap-2 
      group
      grid grid-cols-12 items-center
      overflow-hidden
      py-3
      `}
    >
      <div className="col-span-2">
        <div className="float-right">
          {!isCommenter ? (
            <Avatar actor="user" />
          ) : (
            // <div className="h-[16px] w-[16px] rounded-full bg-teal-500" />
            <PaperClipIcon className="h-[16px] w-[16px] text-teal-500" />
          )}
        </div>
      </div>

      <input
        ref={inputRef}
        className={`
        col-span-8 flex h-full w-full 
        flex-col
        bg-transparent
        p-2
        px-8
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
          <div
            className="rounded-md bg-gray-500/25 p-1.5 text-xs uppercase text-gray-100 hover:text-white"
            onClick={submitRegenerate}
          >
            enter
          </div>
          <span className="rounded-md bg-gray-500/25 p-1.5 text-xs uppercase text-gray-100 hover:text-white">
            esc
          </span>
        </div>
      ) : (
        <>
          <div className="durtaion-200 flex items-center gap-2 opacity-0 group-hover:opacity-100">
            <IconBtn
              onClick={() => setIsEditing(true)}
              className={`${iconBtnBaseStyle} hover:bg-teal-100/10`}
            >
              <PencilIcon className="h-4 w-4" />
            </IconBtn>
            <IconBtn className={`${iconBtnBaseStyle} hover:bg-red-800/60`} onClick={submitDelete}>
              <TrashIcon className="h-4 w-4" />
            </IconBtn>
            {!isCommenter && (
              <IconBtn
                onClick={submitRegenerate}
                className={`${iconBtnBaseStyle} hover:bg-teal-800/60`}
              >
                <PaperAirplaneIcon className="h-4 w-4" />
              </IconBtn>
            )}
          </div>
        </>
      )}
    </div>
  );
};
