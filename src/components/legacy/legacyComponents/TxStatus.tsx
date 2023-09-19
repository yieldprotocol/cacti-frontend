import { useEffect } from 'react';
import { CheckCircleIcon } from '@heroicons/react/24/outline';
import { useWaitForTransaction } from 'wagmi';
import { WidgetError } from '@/components/legacy/legacyWidgets/helpers';
import { Button } from '@/components/shared/Button';
import { useChatContext } from '@/contexts/ChatContext';
import { Spinner } from '@/utils';

interface Props {
  hash: `0x${string}`;
}

export const TxStatus = ({ hash }: Props) => {
  const { isLoading, isSuccess, isError, error } = useWaitForTransaction({ hash });
  const { sendAction } = useChatContext();

  useEffect(() => {
    if (isSuccess) {
      sendAction({ actionType: 'transaction', hash, success: true });
    } else if (isError) {
      sendAction({ actionType: 'transaction', hash, success: false, error: JSON.stringify(error) });
    }
  }, [isSuccess, isError, error, hash, sendAction]);

  return (
    <div>
      {isLoading && (
        <Button className="flex items-center" disabled>
          <Spinner className="h-4 w-4" /> Pending...
        </Button>
      )}
      {isSuccess && (
        <Button className="flex gap-2 border border-green-600" disabled>
          <CheckCircleIcon className="h-5 text-green-600" />
          <div className="text-green-600">Success</div>
        </Button>
      )}
      {isError && error && <WidgetError>Transaction failed: {error.message}</WidgetError>}
    </div>
  );
};
