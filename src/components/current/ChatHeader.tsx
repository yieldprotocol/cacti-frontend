import { ReactNode, useCallback, useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import { PencilIcon, ShareIcon, TrashIcon } from '@heroicons/react/24/outline';
import { useMutationDeleteChat } from '@/api/chats/mutations';
import { useMutationDeleteSharedSession } from '@/api/shares/mutations';
import { useChatContext } from '@/contexts/ChatContext';
import useThread from '@/hooks/useThread';
import InputWrap from './InputWrap';
import SkeletonWrap from '../shared/SkeletonWrap';

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

const PrimaryActions = ({ threadId, isShare }: { threadId: string; isShare: boolean }) => {
  const { setShowShareModal } = useChatContext();

  const { mutate: deleteChat } = useMutationDeleteChat(threadId);
  const { mutate: deleteShare } = useMutationDeleteSharedSession(threadId);
  const handleDelete = async () => (isShare ? deleteShare() : deleteChat());

  return (
    <div className="flex items-center gap-2">
      {!isShare ? (
        <button
          onClick={() => setShowShareModal(true)}
          className="flex items-center gap-1 rounded-md bg-green-primary p-2 hover:bg-green-primary/80"
        >
          <ShareIcon className="hover:text-green/10 h-3 w-3" />
          <span className="text-sm">Share</span>
        </button>
      ) : null}

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
  const { route } = useRouter();
  const isShare = route === '/share/[id]';
  const { isLoading, threadId, threadName, setThreadName, lastEdited } = useThread(
    undefined,
    isShare
  );

  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [inputText, setText] = useState<string>();

  const inputRef = useRef<HTMLInputElement>(null);

  const submitNameChange = useCallback(() => {
    console.log('submitNameChange', inputText);
    inputText && inputText !== '' && setThreadName(inputText);
    inputText === '' && setThreadName(threadName!);
  }, [inputText, setThreadName, threadName]);

  const handleTextClick = isShare
    ? undefined
    : () => {
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
        setIsEditing(false);
      }
    };
    window.addEventListener('keydown', handleKeys);
    return () => window.removeEventListener('keydown', handleKeys);
  }, [threadName, inputText, submitNameChange]);

  return (
    <div className="flex flex-col justify-between gap-2">
      <div className="flex w-full">
        {isEditing ? (
          <InputWrap submitFunction={() => submitNameChange()}>
            <input
              ref={inputRef}
              className={`w-full bg-transparent text-white/70 focus:outline-none`}
              onClick={() => setIsEditing(true)}
              onChange={(e) => {
                setIsEditing(true);
                setText(e.target.value);
              }}
              value={inputText}
              onBlur={() => {
                setIsEditing(false);
              }}
              onFocus={() => setIsEditing(true)}
              placeholder={threadName}
            />
          </InputWrap>
        ) : (
          <div className="flex items-center gap-4 p-2">
            <span onClick={handleTextClick}>
              {isLoading || !threadId ? <SkeletonWrap width={300} height={20} /> : threadName}
            </span>
            {threadId && <PrimaryActions threadId={threadId} isShare={isShare} />}
          </div>
        )}
      </div>

      <div className="flex w-full justify-items-start px-2 text-xs text-white/30">
        <span>
          {isLoading || !threadId ? (
            <SkeletonWrap height={10} width={50} />
          ) : (
            `Last edit: ${lastEdited}`
          )}
        </span>
      </div>

      {/* </div> */}
    </div>
  );
};

export default ChatHeader;
