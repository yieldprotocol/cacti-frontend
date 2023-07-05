import Link from 'next/link';
import { useRouter } from 'next/router';
import { CheckIcon } from '@heroicons/react/24/outline';
import { useQueryChats } from '@/api/queries';
import { abbreviateHash } from '@/utils';

export type ChatItem = {
  id: string;
  selected: boolean;
};

const ChatItem = ({ id, selected }: ChatItem) => {
  return (
    <Link
      className={`flex cursor-pointer flex-row items-center gap-2 rounded-sm py-2 text-white/70 ${
        selected ? 'bg-white/5' : 'hover:bg-white/10 hover:text-white'
      } `}
      href={`/${id}`}
    >
      <div className="h-4 w-4 text-green-600"> {selected ? <CheckIcon /> : <div />}</div>
      <div className="text-xs"> {abbreviateHash(id, 4)}</div>
    </Link>
  );
};

const ChatList = () => {
  const {
    chats: { sessions },
  } = useQueryChats();
  const router = useRouter();
  return (
    <>
      <div className="pt-8 text-xs ">My Chats</div>
      <div className="py-4">
        {sessions.map((chat) => (
          <ChatItem key={chat.id} id={chat.id} selected={router.query.thread?.[0] === chat.id} />
        ))}
      </div>
    </>
  );
};

export default ChatList;
