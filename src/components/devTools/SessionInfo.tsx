import { useSession } from 'next-auth/react';

export const SessionInfo = () => {
  const { status } = useSession();

  return (
    <div>
      {/* { data?.user && <div  className='text-sm text-left'> user: {shortenAddress(user?.name || '')}</div> } */}
      <div className="text-left text-sm"> Auth status: {status} </div>
      {/* <div className='text-sm text-left'> token: </div> */}
    </div>
  );
};
