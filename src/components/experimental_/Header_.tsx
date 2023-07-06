import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import { CustomConnectButton } from './CustomConnectButton';
import { ChatHeader } from './ChatHeader';

const Header = () => {
  const router = useRouter();
  const { thread } = router.query;

  return (
    <div className="flex h-full w-full items-center justify-between gap-2 lg:pl-[15rem] mt-4 ">

      <div className="space-y-2 py-2 0">
        {thread ? <ChatHeader /> : null}
      </div>

      <div className="">
        <CustomConnectButton />
      </div>
    </div>
  );
};

export default Header;
