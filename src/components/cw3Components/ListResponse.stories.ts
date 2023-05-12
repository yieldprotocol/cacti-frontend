import type { Meta, StoryObj } from '@storybook/react';
import { ListResponse } from './ListResponse';

const testData = [ 
  ['Transaction details', '0.0'],
  ['Transaction details', '0.0'],
  ['Transaction details', '0.0'],
]

const meta: Meta<typeof ListResponse> = {
  title: 'cw3/ListResponse',
  component: ListResponse,
  tags: ['autodocs'],
  argTypes: {
    data: {
      description: 'Rows to Display',
      default: testData,
      control: 'table',
    },
    title: {
      description: 'Title to display.',
      default: 'Breakdown',
      control: 'text',
    },
    collapsible: {
      description: 'Makes text component collapsable.',
      default: true,
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<typeof ListResponse>;

export const Primary: Story = {
  args: {
    title: 'Breakdown',
    data: testData,
    collapsible: true,
  },
};

Primary.parameters = {
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/UraHvlIzwoXoOYjcIir9f7/Web3-GPT-UI-(Shared)?type=design&node-id=1-1290&t=Q2YRoQ9AoapnDySS-4',
  },
};

export const NoTitle: Story = {
  args: {
    data: testData,
  },
};

export const NonCollapsible: Story = {
  args: {
    title: 'Breakdown',
    data: testData,
    collapsible: false,
  },
};
