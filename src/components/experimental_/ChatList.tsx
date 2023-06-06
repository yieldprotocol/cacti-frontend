import { useContext, useEffect, useState } from 'react';
import { CheckCircleIcon, CheckIcon } from '@heroicons/react/24/outline';
import ChatContext from '@/contexts/ChatContext';
import { abbreviateHash, shortenAddress } from '@/utils';

export type ChatItem = {
  id: string;
  selected: boolean;
};

const ChatItem = ({ id, selected }: ChatItem) => {
  return (
    <div className={`flex cursor-pointer flex-row items-center gap-2 py-2 rounded-sm ${selected ? 'bg-white/5': ''} `}>
      <div className="h-4 w-4 text-green-600"> {selected ? <CheckIcon /> : <div />}</div>
      <div className="text-xs text-white/70 hover:text-white"> {abbreviateHash(id, 4)}</div>
    </div>
  );
};

const ChatList = () => {
  const chatList = [
    { id: '9e6bd877-d76f-4379-95b3-7df36c9cc8d0' },
    { id: 'e0cfadee-4baf-43e2-a589-f2f70ca87201' },
    { id: 'd76f-4379-95b3-7df36' },
  ];
  const [selectedId, setSelectedId] = useState<string>();

  useEffect(() => {
    const q = window.location.search;
    const params = new URLSearchParams(q);
    if (params.get('s')) {
      setSelectedId(params.get('s') as string);
    }
  }, [window.location]);

  return (
    <>
      <div className="pt-8 text-xs ">My Chats</div>
      <div className="py-4">
        {chatList.map((chat: any) => {
          return <ChatItem key={chat.id} id={chat.id} selected={selectedId === chat.id} />;
        }, [])}
      </div>
    </>
  );
};

export default ChatList;
