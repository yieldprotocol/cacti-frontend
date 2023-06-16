import { useState } from 'react';
import Skeleton from 'react-loading-skeleton';
import { CheckCircleIcon, InformationCircleIcon } from '@heroicons/react/24/outline';
import tw from 'tailwind-styled-components';
import { ActionResponseState } from '../../../cactiComponents/ActionResponse';

const StyledButton = tw.button`
  inline-flex items-center justify-center
  height-[40px]
  py-2 rounded-lg
  border-[1px] border-white/10
  bg-[#2E8C87]
  text-white/70 w-full duration-200
`;

const disabledStyle = 'cursor-not-allowed bg-teal-800/10 text-white/30';

const stylingByState = {
  [ActionResponseState.WAITING_FOR_USER]: disabledStyle, // waiting for user action:  likely a confirmation
  [ActionResponseState.LOADING]: disabledStyle, // system working in background : async calls/checks
  [ActionResponseState.DISABLED]: disabledStyle, // user interaction not allowed (eg. not enough balance, or error with building tx)
  [ActionResponseState.READY]: 'bg-transparent hover:bg-teal-900', // tx ready to go, but not submitted.
  [ActionResponseState.TRANSACTING]: disabledStyle, // tx submitting and is transacting.
  [ActionResponseState.SUCCESS]: 'bg-teal-900/70', // tx completed successfully.
  [ActionResponseState.ERROR]: 'cursor-not-allowed text-white/30 bg-red-600/50', // tx completed, but failed.
};

interface ZKSyncActionResponseProps {
  onClick: () => void;
  label: string | null;
  txHash: string | null;
  isSuccess: boolean;
  error: string | null;
  disabled: boolean;
}

const ZKSyncActionResponse = ({
  onClick,
  label,
  txHash,
  isSuccess,
  error,
  disabled,
}: ZKSyncActionResponseProps) => {
  const [state, setState] = useState(ActionResponseState.READY);

  const extraStyle = stylingByState[disabled ? ActionResponseState.DISABLED : state];

  return (
    <div className=" flex w-full items-center gap-4">
      <StyledButton className={`bg-teal-900 ${extraStyle}`} onClick={onClick}>
        {label || <Skeleton width={100} />}
      </StyledButton>

      {error && (
        <div className="group relative flex">
          <div className="h-6 w-6 text-white/20">
            <InformationCircleIcon />
          </div>
          <div
            className="absolute left-8 rounded-md border border-gray-700  bg-gray-900 p-2
              text-sm text-white/70 opacity-0 transition-opacity group-hover:opacity-100"
          >
            {error}
          </div>
        </div>
      )}

      {isSuccess && (
        <div className="group relative flex">
          <div className="h-6 w-6 text-white/20">
            <CheckCircleIcon />
          </div>
          <div
            className="absolute left-8 rounded-md border border-gray-700  bg-gray-900 p-2
              text-sm text-white/70 opacity-0 transition-opacity group-hover:opacity-100"
          >
            {/* TODO: Show a link to the chain-specific block explorer to allow user to see the details of tx */}
            {txHash}
          </div>
        </div>
      )}
    </div>
  );
};

export default ZKSyncActionResponse;
