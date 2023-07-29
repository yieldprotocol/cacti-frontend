import { useEffect, useRef, useState } from 'react';
import * as React from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import {
  PaperAirplaneIcon,
  PaperClipIcon,
  PencilIcon,
  TrashIcon,
} from '@heroicons/react/24/outline';
import { VoidExpression } from 'typescript';
import Avatar from '../Avatar';
import { Markdown } from './Markdown';

interface IconBtnProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}
const iconBtnBaseStyle = 'center rounded-lg p-2 text-white/70';

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
  isShare = false,
}: {
  actor: string;
  initialText: string;
  submitEdit: (text: string) => void;
  submitRegenerate: () => void;
  submitDelete: () => void;
  isShare?: boolean;
}) => {
  const [input, setInput] = useState(initialText);
  const [isEditing, setIsEditing] = useState(false);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const isCommenter = actor === 'commenter';

  const setEditing = (val: boolean) => {
    !isShare && setIsEditing(val);
  };

  useEffect(() => {
    const handleKeys = (e: globalThis.KeyboardEvent) => {
      // cancel edit
      if (e.key === 'Escape') {
        !isShare && setIsEditing(false);
        setInput(initialText);
      }

      // submit edit
      if (e.key === 'Enter') {
        if (input !== initialText) {
          submitEdit(input);
        }
        inputRef.current?.blur();
        setInput(input);
        !isShare && setIsEditing(false);
      }
    };

    window.addEventListener('keydown', handleKeys);

    return () => window.removeEventListener('keydown', handleKeys);
  }, [initialText, input, submitEdit]);

  return (
    <div
      className={`
      flex
      justify-center text-white/70
      ${
        isCommenter ? 'bg-white bg-opacity-[2%]' : 'bg-white bg-opacity-5 ' //bg-yellow-200 bg-opacity-50
      }
      focus-within:ring-gray-700/70
      hover:bg-gray-700/20
      focus:text-gray-50
      ${isEditing ? 'ring-1 ring-gray-500/30' : ''}
      grid-gap-2 group overflow-hidden py-3
      `}
    >
      <div className="flex w-full max-w-3xl items-center justify-start gap-2">
        <div className="w-6">
          {!isCommenter ? (
            <Avatar actor="user" />
          ) : (
            <PaperClipIcon className="h-[16px] w-[16px] text-teal-500" />
          )}
        </div>
        {isEditing ? (
          <>
            <TextareaAutosize
              ref={inputRef}
              className="h-full w-full resize-none rounded border-gray-800 bg-inherit p-2 text-white/70 focus:border focus:outline-none"
              min-rows={1}
              value={input}
              onChange={(e) => {
                !isShare && setInput(e.target.value);
              }}
              onBlur={() => {
                setInput(initialText);
                setIsEditing(false);
              }}
            />
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
          </>
        ) : (
          <>
            <div className="-mt-1 w-full" onClick={() => setIsEditing(true)}>
              <Markdown>{input}</Markdown>
            </div>
            <div className="flex items-center gap-2 opacity-0 duration-200 group-hover:opacity-100">
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
    </div>
  );
};
