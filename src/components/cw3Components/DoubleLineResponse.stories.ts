import type { Meta, StoryObj } from '@storybook/react';
import { DoubleLineResponse} from './DoubleLineResponse';

const meta: Meta<typeof DoubleLineResponse> = {
  title: 'cw3/DoubleLineResponse',
  component: DoubleLineResponse,
  tags: ['autodocs'],
  argTypes: {
    tokenSymbol: {
      description: 'Token associated with this component.',
      default: 'ETH',
      control: 'text',
    },
    tokenValueInUsd: {
      description: 'Numeric Value to display.',
      default: undefined,
      control: 'number',
    },
    amount: {
      description: 'Numeric Value to display.',
      default: undefined,
      control: 'number',
    },
    amountValueInUsd: {
      description: 'Numeric Value to display.',
      default: undefined,
      control: 'number',
    },

    // altImageUrl: {
    //   description: 'Custom Image to display instead of the one associated with the project name.',
    //   default: undefined,
    //   control: 'file',
    // },
  },
};

export default meta;
type Story = StoryObj<typeof DoubleLineResponse>;

export const Primary: Story = {
  args: {
    tokenSymbol: 'DAI',
    tokenUsd: 1.01,
    amount: 100.67,
    amountUsd: 99.03,
  },
};

Primary.parameters = {
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/UraHvlIzwoXoOYjcIir9f7/Web3-GPT-UI-(Shared)?type=design&node-id=1-1174&t=XvvkglkHNSvIhPmB-4',
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
