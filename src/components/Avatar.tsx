import Image from 'next/image';
import { UserIcon } from '@heroicons/react/20/solid';
import { CommandLineIcon } from '@heroicons/react/24/outline';
import profilePic from '@/public/punk2042.png';

interface Props {
  actor: string;
}

const Avatar = ({ actor }: Props) => {
  const botAvatar =
    'https://user-images.githubusercontent.com/1568680/221064265-c6d3b2be-148b-4bec-b955-e6f59be9e0ef.png';

  return (
    <div className="rounded-md bg-gray-300 shadow-md">
      {actor === 'user' ? (
        <Image
          width={32}
          height={32}
          className="h-full w-8 max-w-none rounded-md"
          src={profilePic}
          alt="bot avatar"
        />
      ) : actor === 'system' ? (
        <CommandLineIcon className="h-8 w-8 text-black" />
      ) : (
        <img className="h-full w-8 max-w-none rounded-md" src={botAvatar} alt="bot avatar" />
      )}
    </div>
  );
};

export default Avatar;
