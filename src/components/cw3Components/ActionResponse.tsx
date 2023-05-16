import { ConnectButton } from '@rainbow-me/rainbowkit';
import tw from 'tailwind-styled-components';
import { useAccount, useContractWrite, usePrepareContractWrite } from 'wagmi';
import useSubmitTx from '@/hooks/useSubmitTx';

export enum ActionResponseState {
  PENDING = 'pending',
  SUCCESS = 'success',
  ERROR = 'error',
  DISABLED = 'disabled',
  LOADING = 'loading',
  DEFAULT = 'default',
}

const StyledButton = tw.button`
inline-flex items-center justify-center
height-[40px] w-[215px] w-max-[256px]
py-[8px] px-[24px]
rounded-[8px]
border-[1px] border-white border-opacity-10
bg-[#2E8C87]
text-sm text-white/90
`;

const stylingByState = {
  [ActionResponseState.PENDING]: 'cursor-not-allowed',
  [ActionResponseState.SUCCESS]: 'bg-green-800',
  [ActionResponseState.ERROR]: 'bg-red-800',
  [ActionResponseState.DISABLED]: 'bg-opacity-50 text-white text-opacity-50 cursor-not-allowed',
  [ActionResponseState.LOADING]: 'cursor-not-allowed',
  [ActionResponseState.DEFAULT]: '',
};

/**
 * Action Response
 * Includes: Label, action, state, preparedContractWrite
 **/
export const ActionResponse = (props: any) => {
  const { address } = useAccount();

  const styleClassName = stylingByState[props.state as ActionResponseState];
  const { config } = usePrepareContractWrite(props.preparedContractWrite);

  const { isSuccess, isError, isLoading, submitTx, isPrepared, error, hash, isPendingConfirm } =
    useSubmitTx(config.request);

  return (
    <div className="flex w-full justify-center">
      {address ? (
        <StyledButton className={`bg-teal-900 ${styleClassName}`} onClick={props.action}>
          {props.label}
        </StyledButton>
      ) : (
        <ConnectButton />
      )}
    </div>
  );
};
