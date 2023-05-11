import type { Meta, StoryObj } from '@storybook/react';
import { HeaderResponse } from './HeaderResponse';

const meta: Meta<typeof HeaderResponse> = {
  title: 'Example/HeaderResponse',
  component: HeaderResponse,
  tags: ['autodocs'],
  argTypes: {
    text : {
      description: 'Text to display.',
      default: 'Swap with ',
      control: 'text',
    },
    projectName: {
      description: 'Project name associated with this component.',
      default: 'compound',
      control: 'text',
    },
    altImageUrl : {
      description: 'Custom Image to display instead of the one associated with the project name.',
      default: undefined,
      control: 'file',
    },
    altUrl : {
      description: 'Custom Url to use instead of the one associated with the project name.',
      default: undefined,
      control: 'text',
    }
  },
};

export default meta;
type Story = StoryObj<typeof HeaderResponse>;

export const Primary: Story = {
  args: {
    text: 'Borrow with Compound',
    projectName: 'Compound',
  },
};

Primary.parameters = {
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/UraHvlIzwoXoOYjcIir9f7/Web3-GPT-UI-(Shared)?type=design&node-id=1-1170&t=HXncUfBqjwMtQBnp-4',
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
