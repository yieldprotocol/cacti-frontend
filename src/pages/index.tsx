import { useContext } from 'react';
import dynamic from 'next/dynamic';
import AppShell from '@/components/experimental_/AppShell';
import Sidebar from '@/components/experimental_/SideBar';
import SettingsContext from '@/contexts/SettingsContext';

const HeaderDynamic = dynamic(() => import('@/components/Header'), {
  ssr: false,
});
const ChatBoxDynamic = dynamic(() => import('@/components/ChatBox'), {
  ssr: false,
});

/* experimental imports */
const ExperimentalChatBox = dynamic(() => import('@/components/experimental_/ChatBox_'), {
  ssr: false,
});
const SideBarDynamic = dynamic(() => import('@/components/experimental_/SideBar'), {
  ssr: false,
});
const ExperimentalHeader = dynamic(() => import('@/components/experimental_/Header_'), {
  ssr: false,
});

export const Home = () => {
  const {
    settings: { experimentalUi },
  } = useContext(SettingsContext);

  return (
    <>
      {experimentalUi ? (
        <AppShell
          SidebarContent={<SideBarDynamic />}
          HeaderContent={<ExperimentalHeader />}
        >
          <ExperimentalChatBox />
        </AppShell >
      ) : (
        <div className={`flex h-screen bg-gray-700`}>
          <HeaderDynamic />
        <div className="w-full">
              <ChatBoxDynamic />
        </div>
      </div>
      )}
    </>
  );
};

export default Home;
