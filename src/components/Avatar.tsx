import { jsNumberForAddress } from 'react-jazzicon';
import Jazzicon from 'react-jazzicon/dist/Jazzicon';
import { ClipboardDocumentListIcon, CommandLineIcon } from '@heroicons/react/24/outline';
import { useAccount, useEnsAvatar } from 'wagmi';

interface ActorProps {
  actor: string;
}

export const UserAvatar = ({ address }: { address: `0x${string}` | undefined }) => {
  const { data: ensImage } = useEnsAvatar({ address: address as `0x${string}` });
  return ensImage ? (
    <img alt="avatar" src={ensImage} />
  ) : (
    <Jazzicon diameter={24} seed={address ? jsNumberForAddress(address) : 0} />
  );
};

const Avatar = ({ actor }: ActorProps) => {
  const { address } = useAccount();
  const botAvatar =
    'https://user-images.githubusercontent.com/1568680/221064265-c6d3b2be-148b-4bec-b955-e6f59be9e0ef.png';

  return (
    <div className="avatar">
      {actor === 'user' ? (
        <UserAvatar address={address!} />
      ) : actor === 'system' ? (
        <div className="center h-full w-full border bg-gray-100 text-teal-900 ">
          <CommandLineIcon className="h-4 w-4" />
        </div>
      ) : actor === 'commenter' ? (
        <div className="center h-full w-full border bg-gray-100 text-gray-700">
          <ClipboardDocumentListIcon className="h-4 w-4" />
        </div>
      ) : (
        <img src={botAvatar} alt="bot avatar" />
      )}
    </div>
  );
};

export default Avatar;
