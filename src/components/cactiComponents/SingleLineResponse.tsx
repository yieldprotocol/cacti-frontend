import { useMemo, useState } from 'react';
import Skeleton from '@/components/shared/SkeletonWrap';
import { findTokenBySymbol } from '@/utils';
import { InlineChip } from './InlineChip';
import { ResponseWrap } from './helpers/layout';

/**
 * Header Response Elements are indicating with what app, service, or contract a user is about to interact. User have the option to leave the service and open in a new window a direct link to the app or service if they want to interact through their UI rather through our interface.
 * Includes: Text, ProjectId, Image, Button (Go to Service)
 **/
export const SingleLineResponse = (props: any) => {
  const [token, setToken] = useState<any>();
  const [amount, setAmount] = useState<any>(props.value);

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
    setAmount(props.value);
  }, [props]);

  return (
    <ResponseWrap>
      <div>
        {token && (
          <div className="flex items-center justify-between p-2">
            <InlineChip label={token?.symbol} image={token?.logoURI} />
            <div className="text-xl">
              {amount !== '<pending>' ? amount : <Skeleton width={50} />}
            </div>
          </div>
        )}
      </div>
    </ResponseWrap>
  );
};
