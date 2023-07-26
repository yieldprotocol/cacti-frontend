import { ReactNode, useCallback, useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import {
  EyeIcon,
  EyeSlashIcon,
  PencilIcon,
  ShareIcon,
  TrashIcon,
} from '@heroicons/react/24/outline';
import { useSession } from 'next-auth/react';
import { useMutationDeleteChat, useMutationUpdateChatSettings } from '@/api/chats/mutations';
import { useQueryChatSettings } from '@/api/chats/queries';
import { useMutationCreateSharedSession } from '@/api/shares/mutations';
import { useChatContext } from '@/contexts/ChatContext';
import useThread from '@/hooks/useThread';

interface TooltipProps {
  children: ReactNode;
  text: string;
}
const Tooltip = ({ text, children }: TooltipProps) => (
  <div className="group relative">
    {children}
    <span className="pointer-events-none absolute -bottom-8 right-0 w-max rounded-md bg-gray-800/50 p-1 text-xs opacity-0 transition-opacity group-hover:opacity-100">
      {text}
    </span>
  </div>
);

const PrimaryActions = ({ threadId }: { threadId: string }) => {
  const { setShowShareModal } = useChatContext();

  const { mutate } = useMutationDeleteChat(threadId);
  const handleDelete = async () => mutate();

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={() => setShowShareModal(true)}
        className="rounded-md bg-green-primary px-2 py-1 hover:bg-green-primary/80"
      >
        Share
      </button>

      <button
        className="rounded-md bg-white/10 p-2 hover:text-white hover:ring-[1px] hover:ring-red-500/50"
        onClick={handleDelete}
      >
        <TrashIcon className="hover:text-red/10 h-4 w-4" />
      </button>
    </div>
  );
};

const ChatHeader = () => {
  const { threadId, threadName, setThreadName } = useThread();

  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [inputText, setText] = useState<string>();

  const inputRef = useRef<HTMLInputElement>(null);

  const submitNameChange = useCallback(() => {
    console.log('submitNameChange', inputText);
    inputText && inputText !== '' && setThreadName(inputText);
    inputText === '' && setThreadName(threadId!);
  }, [inputText, setThreadName, threadId]);

  const handleTextClick = () => {
    setText('');
    setIsEditing(true);
    inputRef.current?.focus();
  };

  useEffect(() => {
    const handleKeys = (e: globalThis.KeyboardEvent) => {
      // cancel edit
      if (e.key === 'Escape') {
        setIsEditing(false);
        setText(threadName!);
      }
      // submit edit
      if (e.key === 'Enter') {
        if (inputText !== threadName) {
          submitNameChange();
        }
        inputRef.current?.blur();
        // setText(threadName);
        setIsEditing(false);
      }
    };
    window.addEventListener('keydown', handleKeys);
    return () => window.removeEventListener('keydown', handleKeys);
  }, [threadName, inputText, submitNameChange]);

  return (
    <div
      className="flex items-center justify-between
    gap-2"
    >
      <div className="flex flex-col items-center justify-start gap-2">
        {isEditing ? (
          <span className="flex items-center gap-2">
            <input
              ref={inputRef}
              className={`h-full bg-transparent text-white/70 focus:outline-none`}
              onClick={() => setIsEditing(true)}
              onChange={(e) => {
                setIsEditing(true);
                setText(e.target.value);
              }}
              onBlur={() => {
                setText(threadName ?? threadId);
                setIsEditing(false);
              }}
              onFocus={() => setIsEditing(true)}
              placeholder={threadName ?? threadId}
            />
            <div className="mr-2 flex gap-2">
              {inputRef.current?.value ? (
                <div
                  className="rounded-md bg-gray-500/25 p-1.5 text-xs uppercase text-gray-100 hover:text-white"
                  onClick={submitNameChange}
                >
                  enter
                </div>
              ) : (
                <div className="rounded-md bg-gray-500/25 p-1.5 text-xs uppercase text-gray-100 hover:text-white">
                  esc
                </div>
              )}
            </div>
          </span>
        ) : (
          <div className="flex items-center gap-4">
            <span onClick={handleTextClick}> {threadName} </span>
            <div className="h-4 w-4 hover:text-white" onClick={() => setIsEditing(true)}>
              <PencilIcon />{' '}
            </div>
          </div>
        )}

        <div className="flex w-full justify-items-start text-xs text-white/30">
          <span>Last edit: recently</span>
        </div>
      </div>
      {threadId && <PrimaryActions threadId={threadId} />}
    </div>
  );
};

export default ChatHeader;
