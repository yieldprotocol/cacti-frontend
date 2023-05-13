import { useState } from 'react';
import { Disclosure } from '@headlessui/react';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/outline';

const ListRow = ({ dataRow }: { dataRow: string[] }) => {
  return (
    <div className="flex justify-between py-[4px] text-sm text-white/70 font-thin">
      <div>{dataRow[0]}</div>
      <div>{dataRow[1]}</div>
    </div>
  );
};

const ListTitle = ({ title }: { title: string }) => {
  return (
    <div className="text-sm text-white text-opacity-70 ">
      <div>{title}</div>
    </div>
  );
};

const listStyle = 'py-[8px] px-[24px] text-sm text-white text-opacity-70'

/**
 * List response element
 *
 * Includes:
 * Text
 */
export const ListResponse = ({
  data,
  title,
  collapsible = true,
}: {
  data: string[][];
  title: string;
  collapsible: boolean;
}) => {
  return (
    <div className="rounded-[8px] border-[1px] border-white border-opacity-10">
      {title && collapsible && (
        <Disclosure as="div" defaultOpen >
          {({ open }) => (
            <>
              <Disclosure.Button as="div" className="flex justify-between py-[8px] px-[24px] text-white text-opacity-70">
                <ListTitle title={title} />
                <div className="w-[16px] stroke-2">{open ? <ChevronUpIcon /> : <ChevronDownIcon />}</div>
              </Disclosure.Button>

              <Disclosure.Panel as="div" className="py-[8px] px-[24px]" >
                {data.map((dataRow) => (
                  <ListRow dataRow={dataRow} />
                ))}
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
      )}

      {title && !collapsible && (
        <div className="py-[8px] px-[24px] text-sm text-white text-opacity-70">
          <div className='py-[8px]'>
          <ListTitle title={title} />
          </div>
          {data.map((dataRow) => (
            <ListRow dataRow={dataRow} />
          ))}
          
        </div>
      )}

      {!title && (
        <div className="py-[8px] px-[24px] text-sm text-white text-opacity-70">
          {data.map((dataRow) => (
            <ListRow dataRow={dataRow} />
          ))}
        </div>
      )}
    </div>
  );
};
