import type { Meta, StoryObj } from '@storybook/react';
import { TextResponse } from './TextResponse';
import { mockText, mockTitle } from './helpers/mocks';

const meta: Meta<typeof TextResponse> = {
  title: 'cacti/TextResponse',
  component: TextResponse,
  tags: ['autodocs'],
  argTypes: {
    text: {
      description: 'Text to display.',
      default: mockText,
      control: 'text',
    },
    title: {
      description: 'Title to display.',
      default: mockTitle,
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
type Story = StoryObj<typeof TextResponse>;

export const Primary: Story = {
  args: {
    text: mockText,
    title: mockTitle,
    collapsible: false,
  },
};

Primary.parameters = {
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/UraHvlIzwoXoOYjcIir9f7/Web3-GPT-UI-(Shared)?type=design&node-id=1-1195&t=1CXZyY9sKeDR2XlP-4',
  },
};

export const NoTitle: Story = {
  args: {
    text: mockText,
  },
};

export const Collapsible: Story = {
  args: {
    title: mockTitle,
    text: mockText,
    collapsible: true,
  },
};
