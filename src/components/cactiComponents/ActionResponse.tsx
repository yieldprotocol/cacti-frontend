import { useEffect, useMemo, useState } from 'react';
import Skeleton from 'react-loading-skeleton';
import { TransactionReceipt } from '@ethersproject/abstract-provider';
import { AddressZero } from '@ethersproject/constants';
import { CheckCircleIcon, ExclamationTriangleIcon } from '@heroicons/react/24/outline';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { BigNumber, UnsignedTransaction } from 'ethers';
import { formatEther, formatUnits } from 'ethers/lib/utils.js';
import tw from 'tailwind-styled-components';
import { useAccount } from 'wagmi';
import useToken from '@/hooks/useToken';
import { cleanValue } from '@/utils';
import { ActionStepper } from './ActionStepper';
import useApproval, { ApprovalBasicParams } from './hooks/useApproval';
import useBalance from './hooks/useBalance';
import useSubmitTx, { TxBasicParams } from './hooks/useSubmitTx';

export enum ActionResponseState {
  LOADING = 'LOADING', // background async checks
  DISABLED = 'DISABLED', // button is disabled (eg. not enough balance, or error with building tx)
  WAITING_FOR_USER = 'WAITING', // waiting for user action on wallet,  likely confirmation
  READY = 'READY', // tx ready to go - not submitted.  (either approval or tx)
  TRANSACTING = 'TRANSACTING', // transaction taking place. (either approval or tx)
  SUCCESS = 'SUCCESS', // transaction successful
  ERROR = 'ERROR', // transaction failed
}

const StyledButton = tw.button`
  inline-flex items-center justify-center
  height-[40px]
  p-2 rounded-lg
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

type Action = {
  name: string;
  fn: () => void;
};

export type ActionResponseProps = {
  txParams: TxBasicParams | undefined;
  approvalParams: ApprovalBasicParams | undefined;
  sendParams?: UnsignedTransaction | undefined;
  label?: string; // label to show on button
  description?: string; // tx description (for wallet )
  disabled?: boolean;
  skipBalanceCheck?: boolean;
  stepper?: boolean;
  onSuccess?: (receipt?: TransactionReceipt) => void;
  onError?: (receipt?: TransactionReceipt) => void;
};

/**
 * Action Response
 * Includes: Label, action, state, preparedContractWrite
 **/
export const ActionResponse = ({
  txParams,
  approvalParams,
  sendParams,
  label,
  description,
  disabled,
  stepper,
  skipBalanceCheck,
  onSuccess,
  onError,
}: ActionResponseProps) => {
  const { address } = useAccount();
  const _approvalParams = useMemo<ApprovalBasicParams>(
    () =>
      approvalParams || {
        tokenAddress: AddressZero,
        spender: AddressZero,
        approvalAmount: BigNumber.from(0),
        skipApproval: true, // NOTE: approval is skipped if no approval params are passed in
      },
    [approvalParams]
  );
  const { data: token } = useToken(undefined, _approvalParams.tokenAddress);
  const amountFmt = formatUnits(_approvalParams.approvalAmount, token?.decimals);

  /** Check for the approval. If no approvalParams, hasAllowance === true and approveTx == undefined  */
  const {
    write: approveTx,
    hasAllowance,
    isWaitingOnUser: approvalWaitingOnUser,
    isPending: approvalTransacting,
    isPrepareError: isPrepareApprovalError,
  } = useApproval(_approvalParams);

  const {
    write: submitTx,
    isWaitingOnUser,
    isPending,
    error,
    isSuccess,
    hash,
    isError,
    isPrepareError,
  } = useSubmitTx(
    hasAllowance ? txParams : undefined,
    hasAllowance ? sendParams : undefined,
    onSuccess,
    onError,
    description
  );

  const { data: ethBal } = useBalance();
  const { data: balance } = useBalance(_approvalParams.tokenAddress, undefined, undefined);

  // button state
  const [buttonLabel, setButtonLabel] = useState<string>();
  const [state, setState] = useState<ActionResponseState>(ActionResponseState.DISABLED);
  const [action, setAction] = useState<Action>();

  /**
   *
   * Check if the acount has enough balance for the transaction
   *
   *  */
  const [hasEnoughBalance, setHasEnoughBalance] = useState(false);

  useEffect(() => {
    if (_approvalParams.skipApproval || skipBalanceCheck) return setHasEnoughBalance(true);

    // explicitly showing approvalParams === undefined for clarity - as oppposed to !approvalParams
    if (_approvalParams === undefined) return setHasEnoughBalance(true);
    if (BigNumber.from(sendParams?.value || '0').gt(ethBal!)) return setHasEnoughBalance(false);

    // check approval token balance
    if (balance && _approvalParams?.approvalAmount) {
      setHasEnoughBalance(balance.gte(_approvalParams.approvalAmount));
    }
  }, [_approvalParams, balance, ethBal, sendParams?.value, skipBalanceCheck]);

  /**
   * BUTTON FLOW:
   * Update all the local states on tx/approval status changes.
   **/
  useEffect(() => {
    if (disabled) {
      setButtonLabel(label ?? 'Disabled');
      return setState(ActionResponseState.DISABLED);
    }

    // pre-approval and pre-tx state
    if (!hasEnoughBalance) {
      setButtonLabel('Insufficient Balance');
      return setState(ActionResponseState.DISABLED);
    }

    // tx status/state
    if (isSuccess) {
      console.log('TX SUCCESS');
      setButtonLabel('Transaction Complete');
      return setState(ActionResponseState.SUCCESS);
    }

    if (isError) {
      console.log('TX ERROR');
      setButtonLabel('Transaction Failed');
      return setState(ActionResponseState.ERROR);
    }

    if (isPending) {
      console.log('TX IN PROGRESS...');
      setButtonLabel('Transaction processing...');
      return setState(ActionResponseState.TRANSACTING);
    }

    if (isPrepareError) {
      setButtonLabel('Could not prepare transaction');
      return setState(ActionResponseState.ERROR);
    }

    if (isWaitingOnUser) {
      console.log('Waiting for TX confirmation...');
      setButtonLabel(`Please check your wallet...`);
      return setState(ActionResponseState.WAITING_FOR_USER);
    }

    // approval status/state
    if (!_approvalParams.skipApproval) {
      if (isPrepareApprovalError) {
        setButtonLabel('Could not prepare approval');
        return setState(ActionResponseState.ERROR);
      }

      if (approvalTransacting) {
        console.log('Waiting for approval transaction...');
        setButtonLabel(`Token approval pending...`);
        return setState(ActionResponseState.TRANSACTING);
      }

      if (approvalWaitingOnUser) {
        console.log('Waiting for approval confirmation...');
        setButtonLabel(`Please check your wallet...`);
        return setState(ActionResponseState.WAITING_FOR_USER);
      }

      if (!hasAllowance) {
        if (approveTx) {
          setButtonLabel(`Approve ${cleanValue(amountFmt, 2)} ${token?.symbol}`);
          setAction({ name: 'approval', fn: approveTx });
          return setState(ActionResponseState.READY);
        } else {
          setButtonLabel('Preparing Approval');
          return setState(ActionResponseState.LOADING);
        }
      }
    }

    // has balance and allowance, and ready to submit tx
    if (submitTx) {
      setButtonLabel(label || 'Submit Transaction');
      setAction({ name: 'submit', fn: submitTx });
      return setState(ActionResponseState.READY);
    } else {
      setButtonLabel('Preparing Transaction...');
      return setState(ActionResponseState.LOADING);
    }
  }, [
    _approvalParams.skipApproval,
    amountFmt,
    approvalTransacting,
    approvalWaitingOnUser,
    approveTx,
    label,
    hasAllowance,
    hasEnoughBalance,
    isError,
    isPending,
    isPrepareApprovalError,
    isPrepareError,
    isSuccess,
    isWaitingOnUser,
    submitTx,
    token?.symbol,
  ]);

  /* Set the styling based on the state (Note: always diasbled if 'disabled' from props) */
  const extraStyle = stylingByState[disabled ? ActionResponseState.DISABLED : state];

  const handleAction = async () => (action ? action.fn() : undefined);

  return (
    <div className="flex w-full justify-center">
      {address && stepper && <ActionStepper />}
      {address && !stepper && (
        <div className=" flex w-full items-center gap-4">
          <StyledButton
            className={`bg-teal-900 ${extraStyle}`}
            onClick={handleAction}
            disabled={isSuccess || disabled || state === ActionResponseState.DISABLED}
          >
            {buttonLabel || <Skeleton width={100} />}
          </StyledButton>

          {error && (
            <div className="group relative flex ">
              <div className="h-6 w-6 text-white/20">
                <ExclamationTriangleIcon />
              </div>
              <div
                className="absolute left-8 hidden rounded-md border  border-gray-700 bg-gray-900
                p-2 text-sm 
                text-white/70 group-hover:block
                "
              >
                {error.message}
              </div>
            </div>
          )}

          {hash && (
            <div className="group relative flex">
              <div className="h-6 w-6 text-white/20">
                <CheckCircleIcon />
              </div>
              <div
                className="absolute left-8 hidden rounded-md border  border-gray-700 bg-gray-900
                p-2 text-sm 
                text-white/70 group-hover:block
                "
              >
                {hash}
              </div>
            </div>
          )}
        </div>
      )}
      {!address && <ConnectButton />}
    </div>
  );
};
