import { useState } from 'react';
import { Listbox } from '@headlessui/react';
import type { Meta, StoryObj } from '@storybook/react';
import { ActionResponse } from '../ActionResponse';
import { DoubleLineResponse } from '../DoubleLineResponse';
import { HeaderResponse } from '../HeaderResponse';
import { ImageResponse } from '../ImageResponse';
import { ListResponse } from '../ListResponse';
import { SingleLineResponse } from '../SingleLineResponse';
import { TextResponse } from '../TextResponse';

const componentsList = [
  {
    id: 1,
    name: 'Header Response',
    str: '',
    component: <HeaderResponse projectName="Compound" text="Borrow with Compound" />,
  },
  {
    id: 2,
    name: 'Text Response',
    str: '',
    component: (
      <TextResponse
        text="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
        title="Some Title"
      />
    ),
  },
  {
    id: 3,
    name: 'Single Line Response',
    str: '',
    component: <SingleLineResponse tokenSymbol="DAI" value={100.67} />,
  },
  {
    id: 4,
    name: 'Double Line Response',
    str: '',
    component: (
      <DoubleLineResponse
        amount={100.67}
        amountValueInUsd={99.03}
        tokenSymbol="DAI"
        tokenValueInUsd={1.01}
      />
    ),
  },
  {
    id: 5,
    name: 'Image Response',
    str: '',
    component: (
      <ImageResponse
        actionLabel="Price"
        actionValue="0.5 ETH"
        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
        image="https://picsum.photos/200"
        imageTags={['some tag', 'Another tag']}
        title="Some Title"
      />
    ),
  },
  {
    id: 6,
    name: 'List Response',
    str: '',
    component: (
      <ListResponse
        collapsible
        data={[
          ['Transaction details', '0.0'],
          ['Transaction details', '0.0'],
          ['Transaction details', '0.0'],
        ]}
        title="Breakdown"
      />
    ),
  },
  {
    id: 7,
    name: 'Action Response',
    str: '',
    component: <ActionResponse action={() => {}} label="Submit" state="default" />,
  },
  // { id: 8, name: 'Table Response',  str: '', component: <TableResponse /> },
];

const WidgetToString = () => {
  const [output, setOutput] = useState<string>('some output');
  const [selectedComponent, setSelectedComponent] = useState(componentsList[2]);
  const [components, setComponents] = useState<any[]>([]);

  const removeItem = (id: number) => {
    const filtered = components.filter((c) => c.id !== id);
    setComponents(filtered);
  };

  const selectComponent = (id: number) => {
    const component = componentsList.find((c) => c.id == id);
    component && setSelectedComponent(component);
  };

  return (
    <div className="h-full space-y-[24px] text-white/70">
      <div className="flex flex-row gap-2 p-2 ">
        <select
          id="countries"
          className="block w-[30%] rounded-md border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
          onChange={(e) => selectComponent(+e.target.value)}
        >
          <option selected>Choose a component</option>
          {componentsList.map((component) => (
            <option value={component.id}>{component.name}</option>
          ))}
        </select>

        <button
          className="rounded-md bg-teal-600/70 p-1"
          onClick={() => {
            setComponents([...components, selectedComponent]);
          }}
        >
          <div className="text-xs"> ADD </div>
        </button>
      </div>

      <div className="flex w-full justify-center space-y-2 border border-dotted border-white/20 p-4 ">
        <div className="w-[80%] space-y-2">
          {components.map((comp_: any) => (
            <div className="flex gap-2">
              <div className="flex-grow ">{comp_.component}</div>
              <button className="flex-shrink" onClick={() => removeItem(comp_.id)}>
                x
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="p-2 text-sm">
        <div>Output: </div>
        <div className="font-mono">{output}</div>
      </div>
    </div>
  );
};

const meta: Meta = {
  title: 'cacti/tools/🔧 Widget to string',
  component: WidgetToString,
  tags: ['autodocs'],
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof WidgetToString>;
export const Primary: Story = { args: {} };
