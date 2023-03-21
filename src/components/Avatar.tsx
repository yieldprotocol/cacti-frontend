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
// <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
//   <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 7.5l3 2.25-3 2.25m4.5 0h3m-9 8.25h13.5A2.25 2.25 0 0021 18V6a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 6v12a2.25 2.25 0 002.25 2.25z" />
// </svg>
