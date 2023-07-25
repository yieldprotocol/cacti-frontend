import { Fragment } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { CheckIcon, ShareIcon } from '@heroicons/react/24/outline';
import { useQueryChats } from '@/api/chats/queries';
import { useChatContext } from '@/contexts/ChatContext';
import useThread from '@/hooks/useThread';
import { abbreviateHash } from '@/utils';

export type ChatItem = {
  id: string;
};

const ChatMenu = ({ id }: ChatItem) => {
  const { query } = useRouter();

  const { setShowShareModal } = useChatContext();
  const selected = query.id === id;

  return (
    <>
      {selected && (
        <div className="flex items-center gap-2">
          <button className="h-3 w-3" onClick={() => setShowShareModal(true)}>
            <ShareIcon />
          </button>
        </div>
      )}
    </>
  );
};

const ChatItem = ({ id }: ChatItem) => {
  const { threadName } = useThread(id);
  const { query } = useRouter();
  const selected = query.id === id;

  return (
    <div
      className={`flex w-full items-center gap-2 rounded-sm py-1 pr-2 ${
        selected ? 'bg-white/5' : 'hover:bg-white/10 hover:text-white'
      }`}
    >
      <Link
        className={`flex w-full cursor-pointer flex-row items-center gap-2 rounded-sm px-2 ${
          selected ? 'text-white' : ''
        } `}
        href={`/chat/${id}`}
      >
        <div className="h-4 w-4 text-green-600"> {selected ? <CheckIcon /> : <div />}</div>
        <div className="text-xs"> {threadName !== id ? threadName : abbreviateHash(id, 4)}</div>
      </Link>
      <ChatMenu id={id} />
    </div>
  );
};

const ChatList = () => {
  const { chats } = useQueryChats();
  return (
    <>
      <div className="pt-8 text-xs text-white/70 ">My Chats</div>
      <div className="py-4">
        {chats?.sessions?.map((chat) => (
          <ChatItem key={chat.id} id={chat.id} />
        ))}
      </div>
    </>
  );
};

export default ChatList;
