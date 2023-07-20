import { useContext, useState } from 'react';
import SettingsContext, { Setting } from '@/contexts/SettingsContext';
import { DevToolsModal } from '../../../devTools/DevToolsModal';
import ChatList from '../../ChatList';
import AccountStatus from './AccountStatus';
import MenuButton from './MenuButton';
import MoreItems from './MoreItems';
import NewChatButton from './NewChatButton';

const Sidebar = () => {
  // this is different state then the one in the sidebar container because this only handles desktop
  const [isOpen, setIsOpen] = useState(true);
  const {
    settings: { developerTools },
    changeSetting,
  } = useContext(SettingsContext);

  return (
    <div className="flex h-screen flex-1 flex-col overflow-y-auto p-1.5 text-gray-300">
      <DevToolsModal
        openState={developerTools}
        handleClose={() => changeSetting(Setting.DEVELOPER_TOOLS, false)}
      />
      <NewChatButton />
      <ChatList />
      <div className="group relative">
        <div className="flex w-full items-center gap-2.5 rounded-md bg-gray-800 px-3 py-3 text-sm transition-colors duration-200 hover:bg-gray-800">
          <MoreItems />
          <AccountStatus />
        </div>
      </div>
      {!isOpen && <MenuButton action={() => setIsOpen(!isOpen)} />}
    </div>
  );
};

export default Sidebar;
