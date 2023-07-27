import Link from 'next/link';
import { useRouter } from 'next/router';
import { CheckIcon } from '@heroicons/react/24/outline';
import { ShareIcon, TrashIcon } from '@heroicons/react/24/outline';
import { useMutationDeleteChat } from '@/api/chats/mutations';
import { useQueryChats } from '@/api/chats/queries';
import { useQueryShares } from '@/api/shares/queries';
import { useChatContext } from '@/contexts/ChatContext';
import useThread from '@/hooks/useThread';
import { abbreviateHash } from '@/utils';

export type ChatItem = {
  id: string;
};

const ChatItem = ({ id }: ChatItem) => {
  const { setShowShareModal } = useChatContext();
  const { threadName } = useThread(id);
  const { query } = useRouter();
  const selected = query.id === id;

  const { mutate: deleteChat } = useMutationDeleteChat(id);
  const handleDelete = () => deleteChat();
  const handleShare = () => setShowShareModal(true);

  return (
    <Link href={`/chat/${id}`}>
      <div
        className={`
        group
        relative
        flex w-full cursor-pointer items-center gap-1 break-all rounded-md p-2.5
        text-gray-300 hover:bg-gray-800/50 ${
          selected ? 'bg-gray-800/50 pr-12' : 'hover:bg-white/10 hover:text-white'
        }`}
      >
        {selected ? <CheckIcon className="h-4 w-4 text-green-primary" />: <div className ='px-2'/>}

        <div className={`relative max-h-4 flex-1 overflow-hidden text-ellipsis break-all text-xs`}>
          {threadName !== id ? threadName : abbreviateHash(id, 8)}
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


const ShareItem = ({ id }: ChatItem) => { 
  
  const { query } = useRouter();
  const selected = query.id === id;
  
  const { mutate: deleteShare } = useMutationDeleteChat(id);
  const handleDelete = () => deleteShare();

  return (
    <Link href={`/share/${id}`}>
      <div
        className={`
        group
        relative
        flex w-full cursor-pointer items-center gap-2 break-all rounded-md p-2.5
        text-gray-300 hover:bg-gray-800/50 ${
          selected ? 'bg-gray-800/50 pr-12' : 'hover:bg-white/10 hover:text-white'
        }`}
      >
        {selected ? <CheckIcon className="h-4 w-4 text-green-primary" /> : <ShareIcon className="h-3 w-3" />}
        <div className={`relative max-h-4 flex-1 overflow-hidden text-ellipsis break-all text-xs`}>
        {abbreviateHash(id, 6)}
        </div>

        {selected && (
          <div className={`visible absolute right-1 z-10 flex text-gray-300`}>
            <button className="p-1" onClick={handleDelete}>
              <TrashIcon className="h-4 w-4 hover:text-white" />
            </button>
          </div>
        )}
      </div>
    </Link>
  );
}

const ChatList = () => {

  const { chats } = useQueryChats();
  const { shares } = useQueryShares();

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

      {shares?.shares?.length ? (
        <>
          <div className="text-ellipsis break-all px-3 pb-2 pt-5 text-xs font-medium text-gray-400">
            My Shares
          </div>
          {shares?.shares?.map((chat) => (
            <ShareItem key={chat.id} id={chat.id} />
          ))}
        </>
      ) : null}
    </div>
  );
};

export default ChatList;
