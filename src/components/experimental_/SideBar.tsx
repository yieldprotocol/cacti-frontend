import { useState } from 'react';
import { ReadyState } from 'react-use-websocket';
import {
  Bars3Icon,
  Cog8ToothIcon,
  DocumentIcon,
  HomeIcon,
  QueueListIcon,
} from '@heroicons/react/24/outline';
import { useChatContext } from '@/contexts/ChatContext';
import ChatList from './ChatList';

const MoreItem = ({ icon, link, label }: { icon: any; link: string; label: string }) => {
  return (
    <div className="flex cursor-pointer flex-row items-center gap-2 py-1 text-xs">
      <div className="h-4 w-4 text-white/50">{icon}</div>
      <div className="text-xs text-white/50 hover:text-white"> {label}</div>
    </div>
  );
};

const MenuButton = ({ icon, label }: { icon: any; label: string }) => {
  return;
};

const Sidebar = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const { connectionStatus } = useChatContext();

  const getStatusColor = (status: ReadyState): string => {
    if (status === ReadyState.OPEN) return 'text-green-500';
    if (status === ReadyState.CLOSED) return 'text-red-500';
    return 'text-orange-500';
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const reset = () => {
    const q = window.location.search;
    const params = new URLSearchParams(q);
    params.delete('s');
    const paramString = params.toString();
    window.location.assign(paramString ? `/?${paramString}` : '/');
  };

  const MenuButton = () => {
    return (
      <div
        className="
        flex
        cursor-pointer 
        select-none 
        justify-center 
        rounded-[8px] p-2
         text-xs 
         text-white/70
         hover:bg-white
         hover:bg-opacity-20"
        onClick={toggleSidebar}
      >
        <div className="h-4 w-4">
          <QueueListIcon />
        </div>
      </div>
    );
  };

  return (
    <>
      {sidebarOpen && (
        <div
          className="
      border-r-1 
      flex  
      h-full  
      w-full 
      transform 
      flex-col 
      items-start
      justify-between
      border-[1px] 
       border-white  
       border-opacity-10 
       bg-[#031016] 
       text-white/70
        transition duration-500 ease-in-out sm:w-64 xl:translate-x-0
        p-2
        "
        >
          <div className="w-full p-4">

            <div className="flex w-full items-center gap-2">
              <MenuButton />

              <div
                className=" w-full cursor-pointer select-none rounded-[8px] bg-teal-900 p-[8px] text-center text-white transition ease-in-out active:bg-transparent"
                onClick={() => reset()}
              >
                <div className="flex w-full justify-center text-xs text-white/70 ">
                  <div>New Chat</div>
                </div>
              </div>
            </div>

            
            <ChatList />
    
            <div className="mt-8 text-xs ">More</div>
            <div className="py-4">
              <MoreItem icon={<HomeIcon />} label="Home" link="/" />
              <MoreItem icon={<Cog8ToothIcon />} label="Settings" link="/" />
              <MoreItem icon={<Cog8ToothIcon />} label="Status" link="/" />
              <MoreItem icon={<DocumentIcon />} label="Documentation" link="/" />
              <MoreItem icon={<GithubIcon />} label="Github" link="/" />
              <MoreItem icon={<DiscordIcon />} label="Discord" link="/" />
              <MoreItem icon={<TwitterIcon />} label="Twitter" link="/" />
            </div>
          </div>

          <div
            className={`group fixed bottom-4 left-4 mb-2 ml-2 rounded-full text-xs ${getStatusColor(
              connectionStatus
            )}`}
          >
            <div className="flex gap-1">
              <span className="animate-pulse">●</span>
              <span>
                {connectionStatus === ReadyState.OPEN
                  ? 'Ready'
                  : connectionStatus === ReadyState.CLOSED
                  ? 'Disconnected'
                  : 'Wallet Not Connected'}
              </span>
            </div>
          </div>
        </div>
      )}

      {!sidebarOpen && (
        <div className="absolute left-4 top-4 p-2">
          <MenuButton />
          {connectionStatus === ReadyState.OPEN ? null : (
            <div
              className={`fixed left-2 top-2 rounded-full text-xs ${getStatusColor(
                connectionStatus
              )}`}
            >
                <div className="animate-pulse">●</div>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default Sidebar;

const DiscordIcon = () => (
  <svg
    className="h-4 w-4"
    fill="currentColor"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    fillRule="evenodd"
    clipRule="evenodd"
  >
    <path d="M19.54 0c1.356 0 2.46 1.104 2.46 2.472v21.528l-2.58-2.28-1.452-1.344-1.536-1.428.636 2.22h-13.608c-1.356 0-2.46-1.104-2.46-2.472v-16.224c0-1.368 1.104-2.472 2.46-2.472h16.08zm-4.632 15.672c2.652-.084 3.672-1.824 3.672-1.824 0-3.864-1.728-6.996-1.728-6.996-1.728-1.296-3.372-1.26-3.372-1.26l-.168.192c2.04.624 2.988 1.524 2.988 1.524-1.248-.684-2.472-1.02-3.612-1.152-.864-.096-1.692-.072-2.424.024l-.204.024c-.42.036-1.44.192-2.724.756-.444.204-.708.348-.708.348s.996-.948 3.156-1.572l-.12-.144s-1.644-.036-3.372 1.26c0 0-1.728 3.132-1.728 6.996 0 0 1.008 1.74 3.66 1.824 0 0 .444-.54.804-.996-1.524-.456-2.1-1.416-2.1-1.416l.336.204.048.036.047.027.014.006.047.027c.3.168.6.3.876.408.492.192 1.08.384 1.764.516.9.168 1.956.228 3.108.012.564-.096 1.14-.264 1.74-.516.42-.156.888-.384 1.38-.708 0 0-.6.984-2.172 1.428.36.456.792.972.792.972zm-5.58-5.604c-.684 0-1.224.6-1.224 1.332 0 .732.552 1.332 1.224 1.332.684 0 1.224-.6 1.224-1.332.012-.732-.54-1.332-1.224-1.332zm4.38 0c-.684 0-1.224.6-1.224 1.332 0 .732.552 1.332 1.224 1.332.684 0 1.224-.6 1.224-1.332 0-.732-.54-1.332-1.224-1.332z" />
  </svg>
);

const TwitterIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-4 w-4"
    fill="currentColor"
    viewBox="0 0 24 24"
  >
    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
  </svg>
);

const GithubIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-4 w-4"
    fill="currentColor"
    viewBox="0 0 24 24"
  >
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
  </svg>
);
