import { CheckCircleIcon, XCircleIcon } from '@heroicons/react/20/solid';
import { Spinner } from '@/utils';

const SubmitButton = ({
  label,
  onClick,
  isPendingConfirm,
  isLoading,
  isSuccess,
  isError,
  disabled,
  styleProps,
}: {
  label: string;
  onClick: () => void;
  isPendingConfirm?: boolean;
  isLoading?: boolean;
  isSuccess?: boolean;
  isError?: boolean;
  disabled?: boolean;
  styleProps?: string;
}) => (
  <button
    className={`${styleProps} 
    flex rounded-sm border border-gray-200/25 bg-gray-900/80 p-3.5 hover:cursor-pointer hover:bg-gray-900 disabled:cursor-not-allowed
    ${isError ? 'border border-red-500/25' : ''}
    ${isSuccess ? 'border border-green-500/25' : ''}
    ${isPendingConfirm ? 'border border-yellow-500/25' : ''}
    `}
    onClick={onClick}
    disabled={isLoading || isPendingConfirm || isSuccess || isError || disabled}
  >
    <div className="mx-auto flex gap-2">
      <div className="flex items-center">
        {(isLoading || isPendingConfirm) && <Spinner className="h-5 w-5 text-gray-100" />}
        {isSuccess && <CheckCircleIcon className="h-5 w-5 text-green-500/50" />}
        {isError && <XCircleIcon className="h-5 w-5 text-red-500/50" />}
      </div>
      <div className="flex items-center text-xl">{label}</div>
    </div>
  </button>
);

export default SubmitButton;
