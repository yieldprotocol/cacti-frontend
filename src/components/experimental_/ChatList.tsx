import Link from 'next/link';
import { useRouter } from 'next/router';
import { CheckIcon } from '@heroicons/react/24/outline';
import { ShareIcon, TrashIcon } from '@heroicons/react/24/outline';
import { useQueryChats } from '@/api/queries';
import useThread from '@/hooks/useThread';
import { abbreviateHash } from '@/utils';

export type ChatItem = {
  id: string;
};

const ChatItem = ({ id }: ChatItem) => {
  const { threadName } = useThread(id);
  const { query } = useRouter();
  const selected = query.id === id;

  const handleDelete = () => console.log('deleting');
  const handleShare = () => console.log('sharing');

  return (
    <Link href={`/chat/${id}`}>
      <div
        className={`
        group
        relative
        flex w-full cursor-pointer items-center gap-2 break-all rounded-md p-2.5
        text-gray-300 hover:bg-gray-800/50 ${
          selected ? 'bg-gray-800/50 pr-12' : 'hover:bg-white/10 hover:text-white'
        }`}
      >
      {selected ? <CheckIcon className="h-4 w-4 text-green-500" /> : <div />}
        <div className={`relative max-h-4 flex-1 overflow-hidden text-ellipsis break-all text-xs`}>
          {threadName !== id ? threadName : abbreviateHash(id, 8)}
          <div
            className={`absolute inset-y-0 right-0 z-10 w-8 bg-gradient-to-l ${
              selected ? 'from-gray-800/50' : 'from-[#031016] group-hover:from-gray-800/50'
            } `}
          ></div>
        </div>
        {selected && (
          <div className={`visible absolute right-1 z-10 flex text-gray-300`}>
            <button className="p-1" onClick={handleShare}>
              <ShareIcon className="h-4 w-4 hover:text-white" />
            </button>
            <button className="p-1" onClick={handleDelete}>
              <TrashIcon className="h-4 w-4 hover:text-white" />
            </button>
          </div>
        )}
      </div>
    </Link>
  );
};

const ChatList = () => {
  const { chats } = useQueryChats();
  return (
    <div>
      <div className="text-ellipsis break-all px-3 pb-2 pt-5 text-xs font-medium text-gray-400">
        My Chats
      </div>
      <div className="flex-1 flex-col transition-opacity duration-500">
        {chats?.sessions?.map((chat) => (
          <ChatItem key={chat.id} id={chat.id} />
        ))}
      </div>
    </div>
  );
};

export default ChatList;
