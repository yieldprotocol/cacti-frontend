import { ReactNode } from 'react';
import Skeleton from '@/components/SkeletonWrap';
import useToken from '@/hooks/useToken';
import { Token } from '@/types';
import { InlineChip } from './InlineChip';
import { ResponseWrap } from './helpers/layout';

/**
 * Header Response Elements are indicating with what app, service, or contract a user is about to interact. User have the option to leave the service and open in a new window a direct link to the app or service if they want to interact through their UI rather through our interface.
 * Includes: Text, ProjectId, Image, Button (Go to Service)
 **/
interface SingleLineResponseProps {
  token?: Token;
  tokenSymbol?: string;
  value?: string;
  className?: string;
  children?: ReactNode;
}
export const SingleLineResponse = (props: SingleLineResponseProps) => {
  const { data: token } = useToken(props.tokenSymbol);

  return (
    <ResponseWrap>
      <div className={props.className ?? ''}>
        {token && (
          <div className="flex items-center justify-between p-2">
            <InlineChip label={token?.symbol} image={token?.logoURI} />
            <div className="text-xl">
              {props.value !== '<pending>' ? props.value : <Skeleton width={50} />}
            </div>
          </div>
        )}
        {props.children}
      </div>
    </ResponseWrap>
  );
};
