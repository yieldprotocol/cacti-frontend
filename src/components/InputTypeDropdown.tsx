import { Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { InputType } from '@/types/chat';

const InputTypeDropdown = ({
  activeType,
  action,
}: {
  activeType: InputType;
  action: () => void;
}) => (
  <Menu as="div" className="relative">
    <Menu.Button className="rounded-sm bg-gray-800 p-1 align-middle text-xs uppercase text-gray-100 hover:bg-gray-500/25">
      {activeType}
    </Menu.Button>
    <Transition
      as={Fragment}
      enter="transition ease-out duration-100"
      enterFrom="transform opacity-0 scale-95"
      enterTo="transform opacity-100 scale-100"
      leave="transition ease-in duration-75"
      leaveFrom="transform opacity-100 scale-100"
      leaveTo="transform opacity-0 scale-95"
    >
      <Menu.Items className="absolute z-10 mt-0.5 origin-center focus:outline-none">
        {Object.values(InputType).map((t, i) =>
          t === activeType ? null : (
            <Menu.Item key={i}>
              <button
                className="text-md flex w-full items-center gap-2 rounded-sm bg-gray-800 p-1 align-middle text-xs uppercase text-gray-100 hover:bg-gray-700 hover:bg-gray-500/25"
                onClick={action}
              >
                <div className="flex w-full justify-between">
                  <span>{t}</span>
                </div>
              </button>
            </Menu.Item>
          )
        )}
      </Menu.Items>
    </Transition>
  </Menu>
);

export default InputTypeDropdown;
