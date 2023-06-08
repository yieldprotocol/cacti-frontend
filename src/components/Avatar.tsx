import { jsNumberForAddress } from 'react-jazzicon';
import Jazzicon from 'react-jazzicon/dist/Jazzicon';
import { ClipboardDocumentListIcon, CommandLineIcon } from '@heroicons/react/24/outline';
import { useAccount, useEnsAvatar } from 'wagmi';

interface ActorProps {
  actor: string;
  size?: number;
}

export const UserAvatar = ({
  address,
  size,
}: {
  address: `0x${string}` | undefined;
  size: number;
}) => {
  const { data: ensImage } = useEnsAvatar({ address: address as `0x${string}` });
  return ensImage ? (
    <img
      alt="avatar"
      src={ensImage}
      className={`h-[${size}px] w-[${size}px] max-w-none rounded-full`}
      width={size}
      height={size}
    />
  ) : (
    <Jazzicon diameter={size} seed={address ? jsNumberForAddress(address) : 0} />
  );
};

const Avatar = ({ actor, size }: ActorProps) => {
  const { address } = useAccount();
  const defaultSize = 40;
  const avatarSize = size || defaultSize;
  const avatarSizeStyle = size
    ? `h-[${size}px] w-[${size}px]`
    : `h-[${defaultSize}px] w-[${defaultSize}px]`;
  const botAvatar =
    'https://user-images.githubusercontent.com/1568680/221064265-c6d3b2be-148b-4bec-b955-e6f59be9e0ef.png';

  return (
    <div>
      {actor === 'user' ? (
        <div className={avatarSizeStyle}>
          <UserAvatar address={address!} size={avatarSize} />
        </div>
      ) : actor === 'system' ? (
        <CommandLineIcon
          className={`${avatarSizeStyle} max-w-none rounded-md bg-gray-300 text-black`}
        />
      ) : actor === 'commenter' ? (
        <ClipboardDocumentListIcon
          className={`${avatarSizeStyle} max-w-none rounded-md bg-gray-300 text-black`}
        />
      ) : (
        <div className={avatarSizeStyle}>
          <img
            className={`${avatarSizeStyle} max-w-none rounded-full`}
            src={botAvatar}
            alt="bot avatar"
            width={avatarSize}
            height={avatarSize}
          />
        </div>
      )}
    </div>
  );
};

export default Avatar;
