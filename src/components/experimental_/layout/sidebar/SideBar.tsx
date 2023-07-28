import { useContext, useState } from 'react';
import SettingsContext, { Setting } from '@/contexts/SettingsContext';
import { DevToolsModal } from '../../../devTools/DevToolsModal';
import ChatList from '../../ChatList';
import CustomConnectButton from '../../CustomConnectButton';
import AccountStatus from './AccountStatus';
import MenuButton from './MenuButton';
import MoreItems from './MoreItems';
import NewChatButton from './NewChatButton';

const Sidebar = ({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}) => {
  const {
    settings: { developerTools },
    changeSetting,
  } = useContext(SettingsContext);

  return (
    <div className="flex h-screen w-full flex-1 flex-col p-1.5 text-gray-300">
      <DevToolsModal
        openState={developerTools}
        handleClose={() => changeSetting(Setting.DEVELOPER_TOOLS, false)}
      />
      <NewChatButton />
      <div className="h-full overflow-y-auto">
        <ChatList />
      </div>
      <div className="relative flex w-full flex-col self-end">
        <div className="p-1.5">
          <MoreItems />       
          {/* {process.env.NODE_ENV === 'development' && <AccountStatus />} */}
          <div className='p-2'><AccountStatus /></div>
          {/* <div className="text-xs text-white/50 border-[0.5px] rounded-xl p-1 ">App version: v{process.env.APP_VERSION}</div> */}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
