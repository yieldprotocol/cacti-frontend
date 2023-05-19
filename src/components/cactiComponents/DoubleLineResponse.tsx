import { useMemo, useState } from 'react';
import Skeleton from '@/components/SkeletonWrap';
import { findTokenBySymbol } from '@/utils';
import { InlineChip } from './InlineChip';
import { ResponseWrap } from './helpers/cactiLayout';

/**
* Dual Line Response Elements are generally used for swap, trading etc. interfaces where user wants to get addtional information about a market, or token.  
Includes:
Chip
Price of Token in $
User Amount
User Amount in $

 **/
export const DoubleLineResponse = (props: any) => {
  const [token, setToken] = useState<any>();

  const [tokenValueInUsd, setTokenValueInUsd] = useState<number>(props.tokenUsd);
  const [amount, setAmount] = useState<number>(props.amount);
  const [amountValueInUsd, setAmountValueInUsd] = useState<number>(props.amountUsd);

  useMemo(() => {
    if (props.tokenSymbol) {
      try {
        const token = findTokenBySymbol(props.tokenSymbol, 1);
        setToken(token);
      } catch (e) {
        // console.error(e);
        setToken(undefined);
      }
    }
    setAmount(props.amount);
    setAmountValueInUsd(props.amountValueInUsd);
    setTokenValueInUsd(props.tokenValueInUsd);
  }, [props]);

  return (
    <ResponseWrap>
      <div>
        {token && (
          <div className="flex items-center justify-between p-2">
            <div className="text-start">
              <div>
                <InlineChip label={token?.symbol} image={token?.logoURI} />
              </div>
              <div className="p-2">
                $ {tokenValueInUsd ? tokenValueInUsd : <Skeleton width={50} />}
              </div>
            </div>

            <div className="text-end">
              <div className="text-xl ">{amount ? amount : <Skeleton width={50} />}</div>
              <div className="p-2">
                $ {amountValueInUsd ? amountValueInUsd : <Skeleton width={50} />}
              </div>
            </div>
          </div>
        )}
      </div>
    </ResponseWrap>
  );
};
