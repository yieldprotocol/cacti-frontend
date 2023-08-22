import Avatar from '../shared/Avatar';
import { MessageWrap } from './MessageWrap';

export const SystemMessage = ({ message }: { message: string }) => {
  return (
    <MessageWrap
      avatar={<Avatar actor="system" />}
      className_="font-mono text-xs text-white text-opacity-70"
    >
      {message}
    </MessageWrap>
  );
};
