import { ConnectButton } from '@rainbow-me/rainbowkit';
import tw from 'tailwind-styled-components';
import { useAccount, usePrepareContractWrite } from 'wagmi';

import { useEffect, useMemo, useState } from 'react';
import { BigNumber, PayableOverrides, Overrides, CallOverrides } from 'ethers';

import useTokenApproval from './helpers/useTokenApproval';
import useSubmitTx from './hooks/useSubmitTx';

export enum ActionResponseState {
  PENDING = 'pending',
  SUCCESS = 'success',
  ERROR = 'error',
  DISABLED = 'disabled',
  LOADING = 'loading',
  DEFAULT = 'default',
}

export type TxActionType = {
  address: `0x${string}`; 
  abi: any;
  functionName: string
  args: any[];
  overrides?: PayableOverrides | Overrides | CallOverrides
}

export type ApproveActionType = {
  address: `0x${string}`;
  amount: BigNumber;
  spender: `0x${string}`;
};

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
  [ActionResponseState.DISABLED]: 'bg-opacity-20 text-white/10 cursor-not-allowed',
  [ActionResponseState.LOADING]: 'cursor-not-allowed',
  [ActionResponseState.DEFAULT]: '',
};

/**
 * Action Response
 * Includes: Label, action, state, preparedContractWrite
 **/
export const ActionResponse = ({
  txAction,
  approveAction,
  altAction,
  label: defaultLabel,
  disabled,
}: {
  txAction?: TxActionType;
  approveAction?: ApproveActionType;
  altAction?: () => Promise<any>;
  label?: string;
  disabled?: boolean;
}) => {
  const { address } = useAccount();
  const [ label, setLabel ] = useState<string>(defaultLabel || 'Submit');
  const [ state, setState ] = useState(ActionResponseState.DEFAULT);
  const [ action, setAction ] = useState<Promise<any>>(async () => console.log('no action set'));

  // if ( approveAction ) {
  //   const { approve, hasBalance, hasAllowance } = useTokenApproval(approveAction.address, approveAction.amount, approveAction.spender)
  //   // setAction(approve)
  // }

  /* ALWAYS pass though useTokenApproval - mainly to catch any balance deficiencies  ie. built in balance check*/
  const { approve, hasBalance, hasAllowance } = useTokenApproval(approveAction.address, approveAction.amount, approveAction.spender);

  const { config } = usePrepareContractWrite(txAction);
  const { isSuccess, isError, isLoading, submitTx, isPrepared, error, hash, isPendingConfirm } = useSubmitTx(config.request);


  /**
   * Update all the local states on tx/approval status changes 
   * */
  
  /* Set the button to submit tx if all ready */
  useEffect(()=>{
    if (hasBalance && hasAllowance && isPrepared ) { setAction(submitTx) }
  }, [hasBalance, hasAllowance] )

  /* Set the button state based on the approval or tx status */
  useEffect(()=>{
    error ? setState(ActionResponseState.ERROR): setState(ActionResponseState.DEFAULT)
  },[ error ])

  /* Set the styling based on the state (Note: always diasbled if 'disabled' from props) */
  const extraStyle = stylingByState[disabled ? ActionResponseState.DISABLED : state];

  return (
    <div className="flex w-full justify-center">
      {address ? (
        <StyledButton className={`bg-teal-900 ${extraStyle}`} onClick={()=>action} >
          {label}
        </StyledButton>
      ) : (
        <ConnectButton />
      )}
    </div>
  );
};
