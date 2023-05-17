import type { Meta, StoryObj } from '@storybook/react';
import { IconResponse, IconType } from './IconResponse';

const meta: Meta<typeof IconResponse> = {
  title: 'cacti/IconResponse',
  component: IconResponse,
  tags: ['autodocs'],
  argTypes: {
    icon: {
      description: 'Icon to display.',
      default: IconType.FORWARD,
      options: Object.values(IconType),
      control: { type: 'select' },
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
    icon: IconType.FORWARD,
  },
};

Primary.parameters = {
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/UraHvlIzwoXoOYjcIir9f7/Web3-GPT-UI-(Shared)?type=design&node-id=1-1169&t=kXokOLIsHPcqr2xK-4',
  },
};

export const Forward: Story = {
  args: {
    icon: IconType.FORWARD,
  },
};

export const Back: Story = {
  args: {
    icon: IconType.BACK,
  },
};

export const Exchange: Story = {
  args: {
    icon: IconType.EXCHANGE,
  },
};

export const Plus: Story = {
  args: {
    icon: IconType.PLUS,
  },
};

export const Minus: Story = {
  args: {
    icon: IconType.MINUS,
  },
};
