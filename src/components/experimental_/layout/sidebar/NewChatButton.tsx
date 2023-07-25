import Link from 'next/link';

const NewChatButton = () => (
  <Link
    className="flex w-full cursor-pointer select-none items-center rounded-[8px] border-[1px] border-teal-800 p-[8px] text-center text-white transition ease-in-out hover:bg-teal-800/20 active:bg-transparent"
    href={`/`}
  >
    <div className="flex w-full justify-center text-xs">
      <div>New Chat</div>
    </div>
  </Link>
);

export default NewChatButton;
