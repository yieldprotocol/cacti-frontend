import { UserIcon } from '@heroicons/react/20/solid';
import { CommandLineIcon } from '@heroicons/react/24/outline';

interface Props {
  actor: string;
}

const Avatar = ({ actor }: Props) => {
  const botAvatar =
    'https://user-images.githubusercontent.com/1568680/221064265-c6d3b2be-148b-4bec-b955-e6f59be9e0ef.png';

  return (
    <div className="rounded-md bg-gray-300 shadow-md">
      {actor === 'user' ? (
        <UserIcon className="h-8 w-8 text-gray-600" />
      ) : actor === 'system' ? (
        <CommandLineIcon className="h-8 w-8 text-black" />
      ) : (
        <img className="h-full w-[2.61rem] rounded-md" src={botAvatar} alt="bot avatar" />
      )}
    </div>
  );
};

export default Avatar;
