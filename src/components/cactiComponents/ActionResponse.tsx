import { useCallback, useEffect, useState } from 'react';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { BigNumber, CallOverrides, Overrides, PayableOverrides } from 'ethers';
import tw from 'tailwind-styled-components';
import { useAccount, usePrepareContractWrite } from 'wagmi';
import useSubmitTx, { TxBasicParams } from './hooks/useSubmitTx';
import useApproval, { ApprovalBasicParams } from './hooks/useApproval';

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
  height-[40px]
  py-[8px] px-[24px]
  rounded-[8px]
  border-[1px] border-white border-opacity-10
  bg-[#2E8C87]
  text-sm text-white/90
  active:bg-[#2E8C8700]
`;

const stylingByState = {
  [ActionResponseState.PENDING]: 'cursor-not-allowed',
  [ActionResponseState.SUCCESS]: 'bg-green-800',
  [ActionResponseState.ERROR]: 'text-white/30 bg-red-600/50 cursor-not-allowed',
  [ActionResponseState.DISABLED]: 'bg-opacity-20 text-white/20 cursor-not-allowed',
  [ActionResponseState.LOADING]: 'cursor-not-allowed',
  [ActionResponseState.DEFAULT]: '',
};

/**
 * Action Response
 * Includes: Label, action, state, preparedContractWrite
 **/
export const ActionResponse = ({
  txParams,
  approvalParams,
  // assertCallParams
  altAction,
  label: label_,
  disabled,
}: {
  txParams?: TxBasicParams;
  approvalParams?: ApprovalBasicParams;
  // assertCallParams?: AssertCallBasicParams;
  altAction?: () => Promise<any>;
  label?: string;
  disabled?: boolean;
}) => {
  const defaultLabel = label_ || 'Submit';
  const { address } = useAccount();

  const [label, setLabel] = useState<string>(defaultLabel);
  const [state, setState] = useState(ActionResponseState.DEFAULT);
  const [txToPrepare, setTxToPrepare] = useState<TxBasicParams>();

  const [action, setAction] = useState<() => Promise<void | undefined>>(async () =>
    console.log('Action not defined')
  );

  /* ALWAYS pass though useTokenApproval - mainly to catch any balance deficiencies ie. act as built in balance check */
  const { approve, hasBalance, hasAllowance } = useApproval({
    amount: approvalParams?.amount || BigNumber.from(0),
    address: approvalParams?.address,
    spender: approvalParams?.spender,
  });

  /**
   * Set the signer address to 'undefined' until hasBalance and hasAllowance are both true.
   **/
  useEffect(() => {
    hasBalance && hasAllowance ? setTxToPrepare(txParams) : setTxToPrepare(undefined);
  }, [hasBalance, hasAllowance]);

  const { isSuccess, isError, isLoading, submitTx, error, hash, isPendingConfirm } =
    useSubmitTx(txToPrepare);

  /**
   * Update all the local states on tx/approval status changes
   **/

  /* Set the button styling for APPROVAL/TRANSACTION processes */
  useEffect(() => {
    /* case: tx/approval success */
    if (!hasBalance) {
      console.log('NOT READY: Balance not sufficient for transaction.');
      setLabel('Insufficient Balance');
      setState(ActionResponseState.DISABLED);
    }
    if (!hasAllowance && hasBalance) {
      setAction(() => approve);
      console.log('READY FOR APPROVAL: Has balance.');
      setLabel(`A token approval is required`);
    }
    if (hasAllowance && hasBalance) {
      console.log('READY FOR TX: Has balance and allowance.');
      // setAction(() => submitTx);
    }
  }, [hasBalance, hasAllowance]);

  /* Set the button styling for TRANSACTION process */
  useEffect(() => {
    /* case: approval/balance checks passing*/
    if (hasBalance && hasAllowance) {
      /* case: pending user confirmation */
      if (isPendingConfirm) {
        setLabel('Waiting for confirmation...');
        setState(ActionResponseState.DISABLED);
      } else {
        setLabel(defaultLabel);
        setState(ActionResponseState.DEFAULT);
      }
    }
  }, [hasBalance, hasAllowance, isPendingConfirm]);

  /* Set the styling based on the state (Note: always diasbled if 'disabled' from props) */
  const extraStyle = stylingByState[disabled ? ActionResponseState.DISABLED : state];

  return (
    <div className="flex w-full justify-center">
      {address ? (
        <StyledButton className={`bg-teal-900 ${extraStyle}`} onClick={() => action()}>
          {label}
        </StyledButton>
      ) : (
        <ConnectButton />
      )}
    </div>
  );
};
