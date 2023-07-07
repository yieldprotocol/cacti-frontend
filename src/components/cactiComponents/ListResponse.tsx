import { Disclosure, Transition } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import { ResponseTitle, ResponseWrap } from './helpers/layout';

const ListRow = ({ dataRow }: { dataRow: string[] }) => {
  return (
    <div className="flex justify-between py-[2px] text-sm font-extralight text-white/70">
      <div>{dataRow[0]}</div>
      <div>{dataRow[1]}</div>
    </div>
  );
};

/**
 * List response element
 *
 * Includes:
 * Text
 */
export const ListResponse = (props: any) => {
  const rows = props.data.map((dataRow: any, i: number) => (
    <ListRow dataRow={dataRow} key={i + dataRow[0]} />
  ));
  return (
    <ResponseWrap>
      {props.title && props.collapsible && (
        <Disclosure as="div" defaultOpen>
          {({ open }) => (
            <>
              <Disclosure.Button
                as="div"
                className="flex items-center justify-between rounded-lg pr-2 hover:bg-white hover:bg-opacity-5"
              >
                <ResponseTitle>{props.title}</ResponseTitle>
                <ChevronDownIcon
                  className={`${open ? '' : '-rotate-90'} w-4 duration-500 ease-out`}
                />
              </Disclosure.Button>
              <Transition
                show={open}
                enter="transition-all duration-500 ease-in overflow-hidden"
                enterFrom="h-0"
                enterTo="h-auto"
                leave="transition-all duration-500 ease-in overflow-hidden"
                leaveFrom="h-auto"
                leaveTo="h-0"
              >
                <Disclosure.Panel as="div" className="p-2">
                  {rows}
                </Disclosure.Panel>
              </Transition>
            </>
          )}
        </Disclosure>
      )}

      {props.title && !props.collapsible && (
        <>
          <ResponseTitle>{props.title}</ResponseTitle>
          <div className="p-2 text-sm text-white text-opacity-70">{rows}</div>
        </>
      )}

      {!props.title && <div className="p-2 text-sm text-white text-opacity-70">{rows}</div>}
    </ResponseWrap>
  );
};
