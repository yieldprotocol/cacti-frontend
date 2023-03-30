import { useEffect, useState } from 'react';
import {
  ArrowTopRightOnSquareIcon,
  CheckCircleIcon,
  DocumentDuplicateIcon,
} from '@heroicons/react/24/outline';
import copy from 'copy-to-clipboard';
import { Button } from '@/components/Button';
import useCachedState from '@/hooks/useCachedState';

export const CurrentForkInfo = () => {
  const [url] = useCachedState('forkUrl');
  const [tenderlyUrl, setTenderlyUrl] = useState<string>(url);
  const [copied, setCopied] = useState<boolean>(false);

  /* set a timer controlling it has been copied */
  useEffect(() => {
    copied && (async () => setTimeout(() => setCopied(false), 2000))();
  }, [copied]);

  /* Monitor rpc url and update link to tenderly TODO: increase robustness here */
  useEffect(() => {
    if (url) {
      const forkId = url.split('/')[4];
      setTenderlyUrl(
        `https://dashboard.tenderly.co/${process.env.NEXT_PUBLIC_TENDERLY_USER}/${process.env.NEXT_PUBLIC_TENDERLY_PROJECT}/fork/${forkId}`
      );
    }
  }, [url]);

  const copyUrl = () => {
    setCopied(true);
    copy(url);
  };

  const goToTenderly = () => {
    window.open(tenderlyUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div>
      <div className="border">
        <div className="p-4 font-mono text-xs">{url}</div>
        <div className="flex gap-2 p-2 text-xs">
          <Button onClick={copyUrl} disabled={copied}>
            <div className="flex gap-2 text-xs">
              <div className="w-4">{copied ? <CheckCircleIcon /> : <DocumentDuplicateIcon />} </div>
              Copy RPC
            </div>
          </Button>
          <Button onClick={goToTenderly} disabled={!url}>
            <div className="flex gap-2 text-xs">
              <div className="w-4">
                <ArrowTopRightOnSquareIcon />
              </div>
              Tenderly
            </div>
          </Button>
        </div>
      </div>
    </div>
  );
};
