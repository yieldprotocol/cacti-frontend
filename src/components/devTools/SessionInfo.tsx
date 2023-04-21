import { shortenAddress } from '@/utils';
import { useSession } from 'next-auth/react';

export const SessionInfo = () => {

  const { data, status } = useSession();

  return (
    <div>
      { data?.user && <div  className='text-sm text-left'> user: {shortenAddress(data?.user?.name || '')}</div> }
      <div className='text-sm text-left'> status: {status } </div>
    </div>
  );
};
