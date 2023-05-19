import type { Meta, StoryObj } from '@storybook/react';
import { ImageResponse } from './ImageResponse';
import { mockImage, mockText, mockTitle } from './helpers/mocks';


const meta: Meta<typeof ImageResponse> = {
  title: 'cacti/ImageResponse',
  component: ImageResponse,
  tags: ['autodocs'],
  
  argTypes: {
    title: {
      description: 'Token associated with this component.',
      default: mockTitle,
      control: 'text',
    },
    description: {
      description: 'Descriptor text to display.',
      default: mockText,
      control: 'text',
    },
    imageUrl: {
      description: 'Custom Image to display instead of the one associated with the project name.',
      default: mockImage,
      control: 'file',
    },
  },
};

export default meta;
type Story = StoryObj<typeof ImageResponse>;

export const Primary: Story = {
  args: {
    title: mockTitle,
    description: mockText,
    image: mockImage,
  },
};

Primary.parameters = {
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/UraHvlIzwoXoOYjcIir9f7/Web3-GPT-UI-(Shared)?type=design&node-id=1-1295&t=917wPW0hSfOeOZEV-4',
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
