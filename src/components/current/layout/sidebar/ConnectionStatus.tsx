import { ReadyState } from 'react-use-websocket';

const ConnectionStatus = ({ status, className }: { status: ReadyState; className: string }) =>
  status === ReadyState.OPEN ? null : (
    <div className={`fixed bottom-2 right-2 rounded-full text-xs ${className}`}>
      <div className="animate-pulse">●</div>
    </div>
  );

export default ConnectionStatus;
