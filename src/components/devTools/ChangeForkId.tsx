import { useEffect, useState } from 'react';
import { Button } from '@/components/Button';
import useCachedState from '@/hooks/useCachedState';
import { ArrowPathIcon } from '@heroicons/react/24/outline';

export const ChangeForkId = () => {
  const [newUrl, setNewUrl] = useState<string>('');
  const [validUrl, setValidUrl] = useState<boolean>(false);
  const [, setForkUrl] = useCachedState('forkUrl');

  const rpcUrlFromProjectId = (id: string) => {
    return `https://rpc.tenderly.co/fork/${id}`;
  };

  const apply = async () => {

    /**
     * if the input added is a valid url, use it as is. 
    Else, If the input appears to be a fork id, append it to the base tenderly url.
    */
    const parsedUrl = (newUrl.includes('https://')) ? newUrl : rpcUrlFromProjectId(newUrl);

    /* Check if we can get a response from the parsed Url */
    const forkId = parsedUrl.split('/')[4];

    const res = await fetch(`https://api.tenderly.co/api/v2/${process.env.NEXT_PUBLIC_TENDERLY_PROJECT}/forks/${forkId}`)

    console.log(res);

    setForkUrl(parsedUrl)
    // isValidFork && window.location.reload();

  };

  return (
    <div>
      <div className="border">
        <div className="flex p-2 text-xs gap-1">
          <input
            value={newUrl}
            onChange={(e: any) => setNewUrl(e.target.value)}
            className="focus:shadow-outline w-full appearance-none rounded border py-2 px-3 leading-tight text-gray-700 shadow focus:outline-none"
            id="customPrompt"
            type="text"
            placeholder="New fork ID or RPC URL"
          /> 
        </div>

        <div className="flex gap-2 p-2 text-xs">
          <Button
            onClick={apply}
            className="first-line:text-xs disabled:bg-gray-400"
            disabled={newUrl === ''}
          >
            Apply New Fork URL
          </Button>
          <div className=' w-1/5'>
            <Button
              onClick={() =>
                setNewUrl(rpcUrlFromProjectId(process.env.NEXT_PUBLIC_TENDERLY_FORK_ID))
              }
              className="text-xs disabled:bg-gray-400"
            >
             <div className='w-4'> <ArrowPathIcon /> </div> 
            </Button>
          </div>

        </div>
      </div>
    </div>
  );
};
