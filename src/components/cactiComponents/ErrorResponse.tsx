import { Disclosure } from '@headlessui/react';
import {
  ChevronDownIcon,
  ChevronUpIcon,
  ExclamationTriangleIcon,
} from '@heroicons/react/24/outline';
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
              <div className="flex w-full justify-center">
                <a
                  className={buttonStyle}
                  href={`https://discord.gg/hu8zVcBty6`}
                  target="_blank"
                  rel="noreferrer"
                >
                  Submit Bug Report on Discord
                </a>
              </div>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
    </ResponseWrap>
  );
};
