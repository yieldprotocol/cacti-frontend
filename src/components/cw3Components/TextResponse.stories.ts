import type { Meta, StoryObj } from '@storybook/react';
import { TextResponse } from './TextResponse';

const demoText = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'

const meta: Meta<typeof TextResponse> = {
  title: 'Example/TextResponse',
  component: TextResponse,
  tags: ['autodocs'],
  argTypes: {
    text : {
      description: 'Text to display.',
      default: demoText,
      control: 'text',
    },
    title : {
      description: 'Title to display.',
      default: 'Title',
      control: 'text',
    },
    collapsible : {
      description: 'Makes text component collapsable.',
      default: true,
      control: 'boolean',
    }
  },
};

export default meta;
type Story = StoryObj<typeof TextResponse>;

export const Primary: Story = {
  args: {
    text: demoText,
    title: 'Title',
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
    text: demoText,
  },
};

export const Collapsible: Story = {
  args: {
    title: 'Title',
    text: demoText,
    collapsible: true,
  },
};
