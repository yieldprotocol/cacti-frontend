import { jsNumberForAddress } from 'react-jazzicon';
import Jazzicon from 'react-jazzicon/dist/Jazzicon';
import { ClipboardDocumentListIcon, CommandLineIcon } from '@heroicons/react/24/outline';
import { useAccount } from 'wagmi';
import useEnsAvatar from './cactiComponents/hooks/useEnsAvatar';
import CactusAvatar from './experimental_/CactiImages/CactusAvatar';

interface ActorProps {
  actor: string;
}

export const UserAvatar = ({ address }: { address: `0x${string}` | undefined }) => {
  const { data: ensImage } = useEnsAvatar();
  return ensImage ? (
    <img alt="avatar" src={ensImage} />
  ) : (
    <Jazzicon diameter={24} seed={address ? jsNumberForAddress(address) : 0} />
  );
};

const Avatar = ({ actor }: ActorProps) => {
  const { address } = useAccount();

  return (
    <div className="avatar h-[24px] w-[24px]">
      {actor === 'user' ? (
        <UserAvatar address={address!} />
      ) : actor === 'system' ? (
        <CommandLineIcon />
      ) : actor === 'commenter' ? (
        <ClipboardDocumentListIcon />
      ) : (
        <CactusAvatar color={'#ffffff70'} />
      )}
    </div>
  );
};

export default Avatar;
