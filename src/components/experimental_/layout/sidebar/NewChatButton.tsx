import Link from 'next/link';

export const buttonStyle =
  'flex text-sm cursor-pointer select-none items-center rounded-[8px] border-[1px] border-teal-800 p-[8px] px-4 text-center text-white/70 hover:text-white transition ease-in-out hover:bg-teal-800/20 active:bg-transparent';

const NewChatButton = () => (
  <Link className={`${buttonStyle} mt-4`} href={`/`}>
    <div className="flex w-full justify-center text-xs">
      <div>New Chat</div>
    </div>
  </Link>
);

export default NewChatButton;
