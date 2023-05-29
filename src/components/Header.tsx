import { ConnectButton } from '@rainbow-me/rainbowkit';
import SettingsDropdown from '@/components/SettingsDropdown';
import { useChatContext } from '@/contexts/ChatContext';

const Header = () => {
  const { connectionStatus } = useChatContext();
  const getStatusColor = (status: number): string => {
    if (status == 1) return 'text-green-500';
    if (status == 3) return 'text-red-500';
    return 'text-orange-500';
  };

  // TODO: add in a connection status tooltip when hovering over the dot
  return (
    <div className="fixed right-0 top-0 mr-4 mt-4 inline-flex gap-3">
      <ConnectButton />
      <SettingsDropdown />
      <div className={`fixed right-0 top-0 mr-1 mt-1 text-xs ${getStatusColor(connectionStatus)}`}>
        ●
      </div>
    </div>
  );
};

export default Header;
