import { ReadyState } from 'react-use-websocket';

const ConnectionStatus = ({ status, className }: { status: ReadyState; className: string }) =>
  status === ReadyState.OPEN ? null : (
    <div className={`fixed left-2 top-2 rounded-full text-xs ${className}`}>
      <div className="animate-pulse">●</div>
    </div>
  );

export default ConnectionStatus;
