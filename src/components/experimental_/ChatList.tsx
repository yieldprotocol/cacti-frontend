import { Fragment } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Popover, Transition } from '@headlessui/react';
import { CheckIcon, EllipsisVerticalIcon } from '@heroicons/react/24/outline';
import { useQueryChats } from '@/api/queries';
import useThread from '@/hooks/useThread';
import { abbreviateHash } from '@/utils';

export type ChatItem = {
  id: string;
  selected: boolean;
};

const ChatMenu = ({ id, selected }: ChatItem) => {
  return (
    <div className={`${selected ? 'opacity-100' : 'opacity-0'}`}>
      <Popover className="relative">
        {({ open }) => (
          <>
            <Popover.Button>
              <div className=" h-4 w-4 text-white/70">
                <EllipsisVerticalIcon />
              </div>
            </Popover.Button>

            <Transition
              as={Fragment}
              enter="transition ease-out duration-200"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1"
            >
              <Popover.Panel className="absolute z-[10000] ">
                {/* <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5"> */}
                <div className="relative grid lg:grid-cols-2">
                  <a href="/analytics">Analytics</a>
                  <a href="/engagement">Engagement</a>
                  <a href="/security">Security</a>
                  <a href="/integrations">Integrations</a>
                </div>
                {/* </div> */}
              </Popover.Panel>
            </Transition>
          </>
        )}
      </Popover>
    </div>
  );
};

const ChatItem = ({ id, selected }: ChatItem) => {
  const { threadName } = useThread(id);

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
        href={`/${id}`}
      >
        <div className="h-4 w-4 text-green-600"> {selected ? <CheckIcon /> : <div />}</div>
        <div className="text-xs"> {threadName !== id ? threadName : abbreviateHash(id, 4)}</div>
      </Link>
      <ChatMenu id={id} selected={selected} />
    </div>
  );
};

const ChatList = () => {
  const { chats } = useQueryChats();
  const router = useRouter();
  return (
    <>
      <div className="pt-8 text-xs ">My Chats</div>
      <div className="py-4">
        {chats?.sessions?.map((chat) => (
          <ChatItem key={chat.id} id={chat.id} selected={router.query.thread?.[0] === chat.id} />
        ))}
      </div>
    </>
  );
};

export default ChatList;
