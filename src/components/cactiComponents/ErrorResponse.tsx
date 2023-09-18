import { Disclosure } from '@headlessui/react';
import {
  ChevronDownIcon,
  ChevronUpIcon,
  ExclamationTriangleIcon,
} from '@heroicons/react/24/outline';
import { useAccount } from 'wagmi';
import { Markdown } from '../current/Markdown';
import { buttonStyle } from '../current/layout/sidebar/NewChatButton';
import { ResponseTitle, ResponseWrap } from './helpers/layout';

const textStyle = 'text-base text-white text-opacity-70 gap-1 ';

export interface ErrorResponseProps {
  text: string;
  error: string;
}

/**
 * Error response element
 *
 * Includes:
 * Text
 */

export const ErrorResponse = (props: ErrorResponseProps): JSX.Element => {
  const { address } = useAccount();

  return (
    <ResponseWrap>
      <Disclosure as="div" defaultOpen={false}>
        {({ open }) => (
          <>
            <Disclosure.Button as="div">
              <ResponseTitle>
                <div className="flex items-center gap-4 text-base">
                  <div className="w-[16px]">
                    <ExclamationTriangleIcon />
                  </div>
                  {props.text}
                </div>
                <div className="w-[16px]">{open ? <ChevronUpIcon /> : <ChevronDownIcon />}</div>
              </ResponseTitle>
            </Disclosure.Button>

            <Disclosure.Panel as="div" className={`${textStyle} gap-4`}>
              <div className="p-4 font-mono text-xs">
                <Markdown>{props.error}</Markdown>
              </div>
              <div className="flex w-full justify-center gap-2 ">
                {/* <form name="bug-report" method="POST" data-netlify="true">
                  <input type="hidden" name="form-name" value="bug-report" />
                  <input type="hidden" name="name" id="yourname" value={address} />
                  <input type="hidden" name="message" id="yourmessage" value={props.error} />
                  <button className={buttonStyle} type="submit">
                    Submit Bug Report
                  </button>
                </form> */}

                <a
                  className={buttonStyle}
                  href={`https://discord.gg/hu8zVcBty6`}
                  target="_blank"
                  rel="noreferrer"
                >
                  Get help on Discord
                </a>
              </div>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
    </ResponseWrap>
  );
};
