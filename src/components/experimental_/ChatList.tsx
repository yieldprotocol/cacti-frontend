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
    <div className="flex cursor-pointer flex-row items-center gap-2 py-1 ">
      <div className="h-4 w-4 text-green-600"> {selected ? <CheckIcon /> : <div />}</div>
      <div className='text-sm text-white/70 hover:text-white'> { abbreviateHash(id, 4)}</div>
    </div>
  );
}

const ChatList = () => {

  const chatList = [{ id: '9e6bd877-d76f-4379-95b3-7df36c9cc8d0' }, { id: '6bd877-d76f-4379-95b3-7df36c9c' }, { id: 'd76f-4379-95b3-7df36' }];
  const [selectedId, setSelectedId] = useState<string>();
  
  useEffect(()=>{
    const q = window.location.search;
    const params = new URLSearchParams(q);
    if (params.get('s')) {  setSelectedId(params.get('s') as string);}
  },[window.location])

  return (
    <div className=" py-8 ">
      <div className=" text-sm p-2 ">My Chats</div>
      <div className=" p-2 ">
        {chatList.map((chat: any) => {
          return <ChatItem key={chat.id} id={chat.id} selected={selectedId === chat.id} />;
        }, [])}
      </div>
    </div>
  );
};

export default ChatList;
