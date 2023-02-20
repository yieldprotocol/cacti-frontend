import { CheckCircleIcon } from '@heroicons/react/24/outline';
import { useWaitForTransaction } from 'wagmi';
import { Button } from '@/components/Button';
import { WidgetError } from '@/components/widgets/helpers';
import { Spinner } from '@/utils';

interface Props {
  hash: `0x${string}`;
}

export const TxStatus = ({ hash }: Props) => {
  const { isLoading, isSuccess, isError, error } = useWaitForTransaction({ hash });

  return (
    <div>
      {isLoading && (
        <Button className="flex items-center" disabled>
          <Spinner /> Pending...
        </Button>
      )}
      {isSuccess && !isError && (
        <div className="flex items-center disabled:border-0 disabled:bg-green-700">
          <CheckCircleIcon className="h-5 text-green-600" />
          <div className="p-1 text-green-600">Success</div>
        </div>
      )}
      {isError && <WidgetError>Transaction failed: {error}</WidgetError>}
    </div>
  );
};
