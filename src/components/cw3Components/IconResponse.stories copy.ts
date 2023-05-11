import type { Meta, StoryObj } from '@storybook/react';
import { IconResponse } from './IconResponse';

const meta: Meta<typeof IconResponse> = {
  title: 'cw3/IconResponse',
  component: IconResponse,
  tags: ['autodocs'],
  argTypes: {
    icon: {
      description: 'Icon to display.',
      default: 'forward',
      control: 'select',
    },
    color: {
      description: 'Icon color',
      default: undefined,
      control: 'text',
    },
    size: {
      description: 'Icon size',
      default: undefined,
      control: 'number',
    },
  },
};

export default meta;
type Story = StoryObj<typeof IconResponse>;

export const Primary: Story = {
  args: {
    icon: 'forward',
  },
};

Primary.parameters = {
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/UraHvlIzwoXoOYjcIir9f7/Web3-GPT-UI-(Shared)?type=design&node-id=1-1169&t=kXokOLIsHPcqr2xK-4',
  },
};

// export const NoTitle: Story = {
//   args: {
//     text: demoText,
//   },
// };

// export const Collapsible: Story = {
//   args: {
//     title: 'Title',
//     text: demoText,
//     collapsible: true,
//   },
// };
