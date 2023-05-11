import type { Meta, StoryObj } from '@storybook/react';
import { SingleLineResponse } from './SingleLineResponse';

const meta: Meta<typeof SingleLineResponse> = {
  title: 'Example/SingleLineResponse',
  component: SingleLineResponse,
  tags: ['autodocs'],
  argTypes: {
    tokenSymbol: {
      description: 'Token associated with this component.',
      default: 'ETH',
      control: 'text',
    },
    value: {
      description: 'Numeric Value to display.',
      default: undefined,
      control: 'number',
    },
    altImageUrl: {
      description: 'Custom Image to display instead of the one associated with the project name.',
      default: undefined,
      control: 'file',
    },
    altUrl: {
      description: 'Custom Url to use instead of the one associated with the project name.',
      default: undefined,
      control: 'text',
    },
  },
};

export default meta;
type Story = StoryObj<typeof SingleLineResponse>;

export const Primary: Story = {
  args: {
    tokenSymbol: 'DAI',
    value: 100.67,
  },
};

Primary.parameters = {
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/UraHvlIzwoXoOYjcIir9f7/Web3-GPT-UI-(Shared)?type=design&node-id=1-1286&t=kXokOLIsHPcqr2xK-4',
  },
};

// export const NoTitle: Story = {
//   args: {
//     text: 'swap',
//   },
// };

// export const Collapsible: Story = {
//   args: {
//     title: 'Title',
//     text: 'swap',
//     collapsible: true,
//   },
// };
