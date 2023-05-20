import type { Meta, StoryObj } from '@storybook/react';
import { composeFromString } from './compose';

const demoStr = `[{"response":"TextResponse", "props": {"text":"Hello World" } }]`;
const demoStrAlt = `[{"response":"HeaderResponse", "props": {"text":"Swap with Aave", "projectName": "aave-v2" }},
   [ {"response":"SingleLineResponse", "props": {"tokenSymbol":"USDC", "value":"10234"}},
    {"response":"IconResponse", "props": {"icon":"forward"}},
    {"response":"SingleLineResponse", "props": {"tokenSymbol":"USDC", "value":"10234"}}
   ],
  {"response":"TextResponse", "props": {"text":"Swapping with Aave"}}]`;

const ComposeFromString = (props: any) => {
  return (
    <div className="h-full">
      <div className="w-[75%] space-y-2">{composeFromString(props.inputString)}</div>
    </div>
  );
};

const meta: Meta = {
  title: 'cacti/tools/🔧 Compose from string',
  component: ComposeFromString,
  tags: ['autodocs'],
  argTypes: {
    inputString: {
      description: `The string item to compose: eg. \n\n${demoStr.toString()}\n\n or \n\n${demoStrAlt.toString()}`,
      default: demoStr,
      control: 'text',
    },
  },
};

export default meta;
type Story = StoryObj<typeof ComposeFromString>;

export const Primary: Story = {
  args: {
    inputString: demoStr,
  },
};

// Primary.parameters = {
//   design: {
//     type: 'figma',
//     url: 'https://www.figma.com/file/UraHvlIzwoXoOYjcIir9f7/Web3-GPT-UI-(Shared)?type=design&node-id=1-1169&t=kXokOLIsHPcqr2xK-4',
//   },
// };
