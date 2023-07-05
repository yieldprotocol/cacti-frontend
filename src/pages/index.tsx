import { useContext } from 'react';
import dynamic from 'next/dynamic';
import AppShell from '@/components/newUI/AppShell';
import SettingsContext from '@/contexts/SettingsContext';

const HeaderDynamic = dynamic(() => import('@/components/legacyUI/Header'), {
  ssr: false,
});
const ChatBoxDynamic = dynamic(() => import('@/components/legacyUI/ChatBox'), {
  ssr: false,
});

/* experimental imports */
const ExperimentalChatBox = dynamic(() => import('@/components/newUI/ChatBox'), {
  ssr: false,
});
const SideBarDynamic = dynamic(() => import('@/components/newUI/SideBar'), {
  ssr: false,
});
const ExperimentalHeader = dynamic(() => import('@/components/newUI/Header'), {
  ssr: false,
});

export const Home = () => {
  const {
    settings: { experimentalUi },
  } = useContext(SettingsContext);

  return (
    <>
      {experimentalUi ? (
        <AppShell SidebarContent={<SideBarDynamic />} HeaderContent={<ExperimentalHeader />}>
          <ExperimentalChatBox />
        </AppShell>
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
