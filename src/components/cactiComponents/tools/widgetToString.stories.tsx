import { useEffect, useState } from 'react';
import reactElementToJSXString from 'react-element-to-jsx-string';
import type { Meta, StoryObj } from '@storybook/react';
import { ActionResponse } from '../ActionResponse';
import { composeFromString } from './compose';

const componentsList = [
  {
    id: 1000,
    name: ' --- component Row --- ',
    cols: 3,
    rows: 1,
  },

  // {
  //   id: 1001,
  //   name: ' --- component Grid --- ',
  //   cols: 2,
  //   rows: 2,
  // },

  {
    id: 1,
    name: 'Header Response',
    str: '{"response":"HeaderResponse", "props": {"text":"Swap with Aave", "projectName": "aave-v2" }}',
  },
  {
    id: 2,
    name: 'Text Response',
    str: '{"response":"TextResponse", "props": {"text":"Swapping with Aave"}}',
  },
  {
    id: 3,
    name: 'Single Line Response',
    str: '{"response":"SingleLineResponse", "props": {"tokenSymbol":"USDC", "value":"10234"}}',
  },
  {
    id: 4,
    name: 'Double Line Response',
    str: '{"response":"DoubleLineResponse", "props": {"amount":"100.67","amountValueInUsd":"99.03","tokenSymbol":"DAI","tokenValueInUsd":"1.01"}}',
  },
  {
    id: 5,
    name: 'Image Response',
    str: '{"response":"ImageResponse", "props": { "actionLabel":"Price","actionValue":"0.5 ETH","description":"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.", "image":"https://picsum.photos/200","imageTags":["some tag", "Another tag"], "title":"Some Title"}}',
  },
  {
    id: 6,
    name: 'List Response',
    str: '{"response":"ListResponse", "props": {"collapsible": "true", "data": [["Transaction details", "0.0"], ["Transaction details", "0.0"], ["Transaction details", "0.0"]], "title": "Breakdown"}}',
  },
  {
    id: 7,
    name: 'Action Response',
    str: '',
    component: <ActionResponse label="Submit" txParams={undefined} approvalParams={undefined} />,
  },

  // { id: 8, name: 'Table Response',  str: '', component: <TableResponse /> },
];

const WidgetToString = () => {
  const [output, setOutput] = useState<string>('some output');
  const [selectedComponent, setSelectedComponent] = useState<any>();
  const [components, setComponents] = useState<any[]>([]);

  /* hanndle adding a row of components */
  const [rowComponents, setRowComponents] = useState<any[]>([]);
  const [cols, setCols] = useState<number>(0);
  const [rows, setRows] = useState<number>(0);

  const removeComponent = (id: number) => {
    const filtered = components.filter((c) => c.id !== id);
    setComponents(filtered);
  };

  const addComponent = () => {
    if (!selectedComponent) return;

    if (cols > 0 && rowComponents.length <= cols) {
      setRowComponents([...rowComponents, selectedComponent.str]); // add the component to the row
      setComponents([...components, `[${rowComponents}]`]);
      if (rowComponents.length === cols) {
        // then if we have reached the end of the row
        setRowComponents([]);
      }
    } else {
      setComponents([...components, selectedComponent]);
    }
  };

  const selectComponent = (id: number) => {
    if (id === 1000) {
      // if we are adding a row of components
      setRowComponents([]); // start a new row of components
      setCols(3); // set the cols value to 3 as default
      return;
    }
    const component = componentsList.find((c) => c.id == id);
    component && setSelectedComponent(component);
  };

  /* update the output when components change */
  useEffect(() => {
    setOutput(`[${components.map((comp_) => comp_.str).join(',')}]`);
  }, [components]);

  return (
    <div className="h-full space-y-[24px] text-white/70">
      <div className="flex flex-row gap-2 p-2 ">
        <select
          id="components"
          className="block w-[30%] rounded-md border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
          onChange={(e) => selectComponent(+e.target.value)}
        >
          <option selected>Choose a component</option>
          {componentsList.map((component) => (
            <option value={component.id} key={component.id}>
              {component.name}
            </option>
          ))}
        </select>

        <button
          className={`rounded-md p-1 text-xs ${
            !selectedComponent ? 'bg-teal-600/10' : 'bg-teal-600/70'
          }`}
          onClick={() => addComponent()}
          disabled={!selectedComponent}
        >
          <div className={`${!selectedComponent ? 'text-white/10' : ''}`}> ADD </div>
        </button>

        {selectedComponent?.id === 1000 && (
          <input
            type="number"
            onChange={(e) => setRows(+e.target.value)}
            disabled={!selectedComponent}
          >
            <div className={`${!selectedComponent ? 'text-white/10' : ''}`}> Rows</div>
          </input>
        )}
      </div>
      <div className="flex w-full justify-center space-y-2 border border-dotted border-white/20 p-4 ">
        <div className="w-[80%] space-y-2">
          {components.map((comp_: any) => (
            <div className="flex gap-2" key={comp_.id}>
              <div className="flex-grow "> {composeFromString(`[${comp_.str || comp_}]`)}</div>
              <button className="flex-shrink" onClick={() => removeComponent(comp_.id)}>
                x
              </button>
            </div>
          ))}
        </div>
      </div>
      <div className="space-y-[12px] p-2 text-sm">
        <div className="flex items-center gap-4">
          Output:
          <div>
            <button className="rounded-md bg-teal-600/70 p-1" onClick={() => console.log('copied')}>
              Copy
            </button>
          </div>
        </div>
        <div className="font-mono"> {output}</div>
      </div>
      Experimental React code:
      <div className="font-mono">
        {reactElementToJSXString(<>{components.map((c) => composeFromString(`[${c.str}]`))}</>)}
      </div>
    </div>
  );
};

const meta: Meta = {
  title: 'cacti/tools/🔧 Widget to string',
  component: WidgetToString,
  tags: ['autodocs'],
  // argTypes: {},
};

export default meta;

type Story = StoryObj<typeof WidgetToString>;
export const Primary: Story = { args: {} };
