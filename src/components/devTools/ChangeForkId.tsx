import { useContext, useEffect, useState } from 'react';
import { XCircleIcon } from '@heroicons/react/24/outline';
import axios from 'axios';
import { Button } from '@/components/Button';
import SettingsContext, { Setting } from '@/contexts/SettingsContext';
import useForkTools from '@/hooks/useForkTools';

export const ChangeForkId = () => {
  const [newUrl, setNewUrl] = useState<string>('');
  const [validUrl, setValidUrl] = useState<boolean>();

  const { createNewFork } = useForkTools();
  const { changeSetting } = useContext(SettingsContext);

  /* Get the project id from a valid RPC URL. TODO make this more robust*/
  const parseIdfromUrl = (url: string): string => url.split('/')[4];

  /* Parse the url from either a projectId or a url itself */
  const parseRpcUrl = (urlOrId: string): string => {
    if (urlOrId.includes('https://rpc.tenderly.co/')) return urlOrId;
    return `https://rpc.tenderly.co/fork/${urlOrId}`;
  };

  const isValidFork = async (forkId: string): Promise<boolean> => {
    const forkAPI = `https://api.tenderly.co/api/v1/account/${process.env.NEXT_PUBLIC_TENDERLY_USER}/project/${process.env.NEXT_PUBLIC_TENDERLY_PROJECT}/fork/${forkId}`;
    const resp = await axios
      .get(forkAPI, {
        headers: {
          'X-Access-Key': process.env.NEXT_PUBLIC_TENDERLY_ACCESS_KEY as string,
        },
      })
      .catch((e) => {
        return e;
      });
    return resp.status === 201;
  };

  const handleApply = async () => {
    /* get the input value as a url, if it isn't already */
    const parsedUrl = parseRpcUrl(newUrl);
    /* Check if we can get a valid response from fork at the parsed Url */
    const isValid = await isValidFork(parseIdfromUrl(parsedUrl));

    /* if valid, set the state to true and reload the page */
    if (isValid) {
      setValidUrl(true);
      changeSetting(Setting.FORK_ENV_URL, parsedUrl);
      // eslint-disable-next-line no-restricted-globals
      window.location.reload();
    }
    /* if not valid, set the validUrl state to false */
    setValidUrl(false);
  };

  const handleCreateFork = async () => {
    const newForkUrl = await createNewFork();
    changeSetting(Setting.FORK_ENV_URL, parseRpcUrl(newForkUrl));
    // eslint-disable-next-line no-restricted-globals
    window.location.reload();
  };

  /* When the newURL changes, check if the parse url is a valid fork */
  useEffect(() => {
    if (newUrl.length > 1) {
      const _parsedUrl = parseRpcUrl(newUrl);
      const _id = parseIdfromUrl(_parsedUrl);
      isValidFork(_id).then((res: boolean) => setValidUrl(res));
    }
  }, [newUrl]);

  return (
    <div>
      <div className="border">
        <div className="flex gap-1 p-2 text-xs">
          <input
            value={newUrl}
            onChange={(e: any) => setNewUrl(e.target.value)}
            className="focus:shadow-outline w-full appearance-none rounded border py-2 px-3 leading-tight text-gray-700 shadow focus:outline-none"
            id="customPrompt"
            type="text"
            placeholder="New fork ID or RPC URL"
          />
          <div className="w-8 text-red-500">
            {validUrl || newUrl === '' ? null : (
              <div className="w-8">
                <XCircleIcon />
              </div>
            )}
          </div>
        </div>

        <div className="flex gap-2 p-2 text-xs">
          <Button
            onClick={handleApply}
            className={`first-line:text-xs disabled:bg-gray-400 ${validUrl && 'bg-green-500'} `}
            disabled={!validUrl}
          >
            Apply Fork RPC URL
          </Button>
          <div className="w-50">
            <Button
              onClick={() => {
                const url = parseRpcUrl(process.env.NEXT_PUBLIC_TENDERLY_FORK_ID!);
                setNewUrl(url);
              }}
              className="text-xs disabled:bg-gray-400"
            >
              <div className="text-[1em]">Default Fork</div>
            </Button>
          </div>
        </div>

        <div className="flex gap-2 p-2 text-xs">
          <Button
            onClick={handleCreateFork}
            className="text-xs disabled:bg-gray-400"
            // disabled={true}
          >
            <div>Create and Use New Fork</div>
          </Button>
        </div>
      </div>
    </div>
  );
};
