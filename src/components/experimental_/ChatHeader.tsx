import { ReactNode, useCallback, useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import { EyeIcon, EyeSlashIcon, ShareIcon } from '@heroicons/react/24/outline';
import { useSession } from 'next-auth/react';
import { useMutationCloneSession, useMutationUpdateShareSettings } from '@/api/mutations';
import { useQueryShareSettings } from '@/api/queries';
import useThread from '@/hooks/useThread';

const PrimaryActions = ({ threadId }: { threadId: string }) => {
  const sessionId = threadId;
  const { status } = useSession();
  const { isSuccess, settings } = useQueryShareSettings(sessionId);
  const visibilityMutation = useMutationUpdateShareSettings(sessionId);
  const cloneMutation = useMutationCloneSession(sessionId);
  const visibilityToggle = () => {
    const targetVisibility = settings?.visibility == 'public' ? 'private' : 'public';
    visibilityMutation.mutate({ metadata: { visibility: targetVisibility } });
  };
  const visibilityIcon = settings?.visibility == 'public' ? <EyeIcon /> : <EyeSlashIcon />;
  const canEdit = isSuccess && settings?.canEdit;
  const canClone = status === 'authenticated';
  const cloneSession = () => {
    if (canClone) {
      cloneMutation.mutate({ metadata: {} });
    } else {
      alert('Please sign up to clone thread.');
    }
  };
  return (
    <div className="flex items-center gap-2">
      <button className="h-4 w-4" onClick={cloneSession}>
        <ShareIcon />
      </button>
      {isSuccess &&
        (canEdit ? (
          <button className="h-4 w-4" onClick={visibilityToggle}>
            {visibilityIcon}
          </button>
        ) : (
          <div className="h-4 w-4">{visibilityIcon}</div>
        ))}
    </div>
  );
};

const ChatHeader = () => {
  const { threadId, threadName, setThreadName } = useThread();

  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [inputText, setText] = useState<string>();

  const inputRef = useRef<HTMLInputElement>(null);

  console.log('THREAD name:', threadName);
  console.log('THREAD  id:', threadId);

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
    <div className={`flex flex-grow justify-between text-white/70 `}>
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          {isEditing ? (
            <span>
              <input
                ref={inputRef}
                className={`
                    flex h-full w-full
                    flex-col
                    bg-transparent
                    text-white/70
                    focus:outline-none
                    `}
                onClick={() => setIsEditing(true)}
                onChange={(e) => {
                  setIsEditing(true);
                  setText(e.target.value);
                }}
                onBlur={() => {
                  setText(threadName!);
                  setIsEditing(false);
                }}
                onFocus={() => setIsEditing(true)}
              />
            </span>
          ) : (
            <span onClick={handleTextClick}>{threadName}</span>
          )}

          {isEditing ? (
            <div className="m-auto mr-2 flex gap-2">
              <div
                className="rounded-md bg-gray-500/25 p-1.5 text-xs uppercase text-gray-100 hover:text-white"
                onClick={submitNameChange}
              >
                enter
              </div>
              <span className="rounded-md bg-gray-500/25 p-1.5 text-xs uppercase text-gray-100 hover:text-white">
                esc
              </span>
            </div>
          ) : (
            // <ShareButton />
            threadId && <PrimaryActions {...{ threadId }} />
          )}
        </div>
        <div className="text-xs text-white/30"> Last edit: yesterday </div>
      </div>
    </div>
  );
};

export default ChatHeader;
