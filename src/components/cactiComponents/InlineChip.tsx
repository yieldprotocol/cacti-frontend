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
      rounded-lg
      bg-white bg-opacity-5 
      py-[6px] pl-2 pr-4
      text-sm text-white text-opacity-75
      hover:shadow-lg focus:shadow-lg focus:outline-none
     `}
    >
      <div className="flex items-center gap-2 p-1">
        <div className="flex items-center gap-2">
          <div>
            <img src={props?.image || profilePic} alt="Avatar" width={20} height={20} />
          </div>
          {/* If the label is an address, shorten it */}
          <div>{props.label.slice(0, 2) !== '0x' ? props.label : shortenAddress(props.label)}</div>
        </div>
        <div>
          {props.showCopyButton && (
            <div className="center h-4 w-4">
              <DocumentDuplicateIcon />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
