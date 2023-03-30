import { useEffect, useState } from 'react';
import { Button } from '@/components/Button';
import useCachedState from '@/hooks/useCachedState';

export const ChangeForkId = () => {
  const [newUrl, setNewUrl] = useState<string>('');
  const [validUrl, setValidUrl] = useState<boolean>(false);
  const [, setForkUrl] = useCachedState('forkUrl');

  const rpcUrlFromProjectId = (id: string) => {
    return `https://rpc.tenderly.co/fork/${id}`;
  };

  const apply = async () => {
    /* if the input added is a valid url, use it as is. */
    if (newUrl.includes('https://')) {
      validUrl && setForkUrl(newUrl);
    } else {
      /* If the input appears to be a fork id, append it to the base tenderly url.*/
      validUrl && setForkUrl(rpcUrlFromProjectId(newUrl));
    }
    window.location.reload();
  };

  /* Check if the new url is valid - for now just if is */
  useEffect(() => {
    if (newUrl !== '') {
      setValidUrl(true);
    }
  }, [newUrl]);

  return (
    <div>
      <div className="border">
        <div className="p-2 text-xs">
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
            disabled={!validUrl}
          >
            Apply
          </Button>
          <div className="w-25">
            <Button
              onClick={() =>
                setNewUrl(rpcUrlFromProjectId(process.env.NEXT_PUBLIC_TENDERLY_FORK_ID))
              }
              className="text-xs disabled:bg-gray-400"
            >
              Default
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
