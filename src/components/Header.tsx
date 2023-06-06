import { ReadyState } from 'react-use-websocket';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import SettingsDropdown from '@/components/SettingsDropdown';
import { useChatContext } from '@/contexts/ChatContext';

const Header = () => {
  // const { connectionStatus } = useChatContext();
  // const getStatusColor = (status: ReadyState): string => {
  //   if (status === ReadyState.OPEN) return 'text-green-500';
  //   if (status === ReadyState.CLOSED) return 'text-red-500';
  //   return 'text-orange-500';
  // };

  return (
    <div className="fixed right-0 top-0 z-10 mr-4 mt-4 inline-flex gap-3">
      <ConnectButton />
      <SettingsDropdown />
      {/* {connectionStatus === ReadyState.OPEN ? null : (
        <div
          className={`fixed  bottom-4 right-4 top-4 mb-2 ml-2 rounded-full text-xs ${getStatusColor(
            connectionStatus
          )}`}
        >
          <div className="flex gap-1">
            <span className="animate-pulse">●</span>
          </div>
        </div>
      )} */}
    </div>
  );
};

export default Header;
