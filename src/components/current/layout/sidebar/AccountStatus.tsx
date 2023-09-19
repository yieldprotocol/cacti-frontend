import { ReadyState } from 'react-use-websocket';
import { useChatContext } from '@/contexts/ChatContext';
import ConnectionStatus from './ConnectionStatus';

const AccountStatus = () => {
  const { connectionStatus } = useChatContext();
  const getStatusColor = (status: ReadyState): string => {
    if (status === ReadyState.OPEN) return 'text-green-500';
    if (status === ReadyState.CLOSED) return 'text-red-500';
    return 'text-orange-500';
  };
  const statusColor = getStatusColor(connectionStatus);

  return (
    <div>
      <div className={`flex flex-col text-xs ${statusColor} justify-between`}>
        <div />
        <div className="flex gap-2">
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
      <ConnectionStatus className={statusColor} status={connectionStatus} />
    </div>
  );
};

export default AccountStatus;
