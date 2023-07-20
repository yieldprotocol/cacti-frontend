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
      <div className="p-1.5">
        <MoreItems />
        <AccountStatus />
      </div>
      {!isOpen && <MenuButton action={() => setIsOpen(!isOpen)} />}
    </div>
  );
};

export default Sidebar;
