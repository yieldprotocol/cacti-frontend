import { CommandLineIcon } from '@heroicons/react/24/outline';
import Avatar from '../Avatar';
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
