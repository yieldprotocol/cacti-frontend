import { useContext, useEffect, useState } from 'react';
import { CheckCircleIcon, CheckIcon } from '@heroicons/react/24/outline';
import { useQueryChats } from '@/api/queries';
import ChatContext from '@/contexts/ChatContext';
import { abbreviateHash, shortenAddress } from '@/utils';
import { useRouter } from 'next/router';

export type ChatItem = {
  id: string;
  selected: boolean;
};

const ChatItem = ({ id, selected }: ChatItem) => {
  const router = useRouter();

  const onClick = selected
    ? undefined
    : () => router.push(id, undefined, { shallow: true })

  return (
    <div
      className={`flex cursor-pointer flex-row items-center gap-2 rounded-sm py-2 text-white/70 ${
        selected ? 'bg-white/5' : 'hover:bg-white/10 hover:text-white'
      } `}
      onClick={onClick}
    >
      <div className="h-4 w-4 text-green-600"> {selected ? <CheckIcon /> : <div />}</div>
      <div className="text-xs"> {abbreviateHash(id, 4)}</div>
    </div>
  );
};

const ChatList = () => {
  const { isSuccess, chats } = useQueryChats();
  const router = useRouter();
  return (
    <>
      <div className="pt-8 text-xs ">My Chats</div>
      <div className="py-4">
        {isSuccess &&
          chats?.sessions?.map((chat: any) => {
            return <ChatItem key={chat.id} id={chat.id} selected={ router.query.thread?.[0] === chat.id} />;
          }, [])}
      </div>
    </>
  );
};

export default ChatList;
