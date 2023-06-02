import { ReadyState } from 'react-use-websocket';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import SettingsDropdown from '@/components/SettingsDropdown';
import { useChatContext } from '@/contexts/ChatContext';

const Header = () => {
  const { connectionStatus } = useChatContext();
  const getStatusColor = (status: ReadyState): string => {
    if (status === ReadyState.OPEN) return 'text-green-500';
    if (status === ReadyState.CLOSED) return 'text-red-500';
    return 'text-orange-500';
  };

  return (
    <div className="fixed right-0 top-0 z-10 mr-4 mt-4 inline-flex gap-3">
      <ConnectButton />
      <SettingsDropdown />
      <div
        className={`group fixed left-0 bottom-0 ml-1 mb-3 rounded-full text-xs ${getStatusColor(
          connectionStatus
        )}`}
      >
        <div className="flex gap-1">
          <span className="pointer-events-none absolute -top-7 left-0 w-max rounded-md bg-gray-400/50 p-1 text-xs text-gray-100 opacity-0 transition-opacity group-hover:opacity-100">
            Server connection status
          </span>
          <span className="animate-pulse">●</span>
          <span>
            {connectionStatus === ReadyState.OPEN
              ? 'Connected'
              : connectionStatus === ReadyState.CLOSED
              ? 'Disconnected'
              : 'Not Connected'}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Header;
