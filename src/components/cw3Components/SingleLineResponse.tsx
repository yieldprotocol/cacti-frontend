import { useEffect, useState } from 'react';
import { findProjectByName, findTokenBySymbol, shortenAddress } from '@/utils';
import { InlineChip } from './InlineChip';

/**
 * Header Response Elements are indicating with what app, service, or contract a user is about to interact. User have the option to leave the service and open in a new window a direct link to the app or service if they want to interact through their UI rather through our interface.
 * Includes: Text, ProjectId, Image, Button (Go to Service)
 **/
export const SingleLineResponse = (props: any) => {
  const [token, setToken] = useState<any>();

  useEffect(() => {
    if (props.tokenSymbol) {
      try {
        const token = findTokenBySymbol(props.tokenSymbol, 1);
        setToken(token);
      } catch (e) {
        // console.error(e);
        setToken(undefined);
      }
    }
  }, [props.tokenSymbol]);

  return (
    <div
      className={`
    height-[32px]    
    rounded-[8px]
    border-[1px]
   border-white
   border-opacity-10 
   p-[20px]
   text-[12px]
   text-white
   text-opacity-50
   `}
    >
      <div >
          {token && (
            <div className="flex justify-between gap-[8px] items-center">
              <InlineChip label={token?.symbol} image={token?.logoURI}/>
              <div  className="text-[16px]">{props.value}</div>
            </div>
          )}
      </div>
    </div>
  );
};
