import { useContext, useEffect, useState } from 'react';
import {
  ArrowTopRightOnSquareIcon,
  CheckCircleIcon,
  DocumentDuplicateIcon,
} from '@heroicons/react/24/outline';
import copy from 'copy-to-clipboard';
import SettingsContext from '@/contexts/SettingsContext';
import { Button } from '../shared/Button';

export const CurrentForkInfo = () => {
  const {
    settings: { isForkedEnv, forkEnvUrl },
  } = useContext(SettingsContext);
  const [tenderlyUrl, setTenderlyUrl] = useState<string>(forkEnvUrl);
  const [copied, setCopied] = useState<boolean>(false);

  /* set a timer controlling it has been copied */
  useEffect(() => {
    copied && (async () => setTimeout(() => setCopied(false), 2000))();
  }, [copied]);

  /* Monitor rpc url and update link to tenderly TODO: increase robustness here */
  useEffect(() => {
    if (forkEnvUrl) {
      const forkId = forkEnvUrl.split('/')[4];
      setTenderlyUrl(
        `https://dashboard.tenderly.co/${process.env.NEXT_PUBLIC_TENDERLY_USER}/${process.env.NEXT_PUBLIC_TENDERLY_PROJECT}/fork/${forkId}`
      );
    }
  }, [forkEnvUrl]);

  const copyUrl = () => {
    setCopied(true);
    copy(forkEnvUrl);
  };

  const goToTenderly = () => {
    window.open(tenderlyUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div>
      <div className="border">
        <div
          className={`p-2 text-left text-xs ${
            isForkedEnv ? 'bg-green-300' : 'bg-red-300'
          } bg-red-300`}
        >
          {isForkedEnv ? 'Current forked environment' : 'Default fork'}
        </div>
        <div className="overflow-x-scroll p-4 font-mono text-xs">{forkEnvUrl}</div>
        <div className="flex gap-2 p-2 text-xs ">
          <Button onClick={copyUrl} disabled={copied}>
            <div className="flex gap-2 text-[0.75em]">
              <div className="w-4">{copied ? <CheckCircleIcon /> : <DocumentDuplicateIcon />} </div>
              Copy url
            </div>
          </Button>
          <Button onClick={goToTenderly} disabled={!forkEnvUrl}>
            <div className="flex gap-2 text-[0.75em]">
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
