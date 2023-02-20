import { CheckCircleIcon } from '@heroicons/react/24/outline';
import { useNetwork, useWaitForTransaction } from 'wagmi';
import { Spinner } from '@/utils';
import { Button } from './Button';

interface Props {
  hash: `0x${string}`;
}

export const TxState = ({ hash }: Props) => {
  const { isLoading, isSuccess } = useWaitForTransaction({ hash });
  const { chain } = useNetwork();
  const showLink = chain.id === 5;

  return (
    <div>
      {isLoading && (
        <Button className="flex items-center" disabled>
          <Spinner /> Pending...
        </Button>
      )}
      {isSuccess && (
        <div className="flex items-center disabled:border-0 disabled:bg-green-700">
          <CheckCircleIcon className="h-5 text-green-600" />
          <div className="p-1 text-green-600">Success</div>
        </div>
      )}
      {hash && showLink && (
        <div>
          <a
            className="text-blue-200 underline"
            href={`https://goerli.etherscan.io/tx/${hash}`}
            target="_blank"
            rel="noreferrer"
          >
            View on Etherscan
          </a>
        </div>
      )}
    </div>
  );
};
