import { useContext, useState } from 'react';
import SettingsContext, { Setting } from '@/contexts/SettingsContext';
import { DevToolsModal } from '../../../devTools/DevToolsModal';
import ChatList from '../../ChatList';
import AccountStatus from './AccountStatus';
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
    <div className="flex h-screen w-full flex-col gap-2 p-2 text-gray-300">
      <DevToolsModal
        openState={developerTools}
        handleClose={() => changeSetting(Setting.DEVELOPER_TOOLS, false)}
      />
      <NewChatButton />
      <div className="h-full overflow-y-scroll ">
        <ChatList />
      </div>
      <div className="relative flex w-full flex-col self-end">
        <div className="p-2">
          <MoreItems />
          <div className="p-2">
            <AccountStatus />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
