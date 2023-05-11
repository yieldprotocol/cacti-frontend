import Image from 'next/image';
import { DocumentDuplicateIcon } from '@heroicons/react/24/outline';
import profilePic from '@/public/punk2042.png';
import { shortenAddress } from '@/utils';

/**
 * Inline Chips are Elements that represent an Icon that repre sents a service, app, contract, address or token a user interacts with.
 *
 * Includes:
 * Image
 * Label(will be shortened if address)
 * showCopyButton
 */
export const InlineChip = (props: any) => {
  return (
    <div
      className={`
      height-[32px] 
      inline-block 
      rounded-[8px] 
      bg-white
     bg-opacity-5 p-[8px]
      text-[12px]
      text-white
     text-opacity-70
     hover:shadow-lg 
     focus:shadow-lg
     focus:outline-none
     focus:ring-0
     `}
    >
      <div className="flex gap-[8px]">
        <div className="flex gap-[8px]">
          {props.image ? (
            <img src={props.image} className={`w-[16px] rounded-full`} alt="Avatar" />
          ) : (
            <Image
              src={profilePic}
              className={`w-[16px] rounded-full bg-slate-600 ${!props.image && 'p-1'}`}
              alt="Avatar"
            />
          )}
          {/* If the label is an address, shorten it */}
          <div>{props.label.slice(0, 2) !== '0x' ? props.label : shortenAddress(props.label)}</div>
        </div>
        {props.showCopyButton && (
          <div className="w-[16px]">
            <DocumentDuplicateIcon />
          </div>
        )}
      </div>
    </div>
  );
};
