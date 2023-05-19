import type { Meta, StoryObj } from '@storybook/react';
import { ImageResponse } from './ImageResponse';
import { mockImage, mockText, mockTitle } from './helpers/mocks';

const mockTags = ['some tag', 'Another tag'];

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
    imageTags: {
      description: ' tags to display with the image (e.g. traits or  "dog, animal, cute")',
      default: mockTags,
      control: 'list',
    },
    imageUrl: {
      description: 'Custom Image to display instead of the one associated with the project name.',
      default: mockImage,
      control: 'file',
    },

    priceLabel: {
      description: 'label to add - likely Price',
      default: 'Price',
      control: 'text',
    },

    priceValue: {
      description: 'Price value',
      default: 'Price',
      control: 'text',
    },

    action: {
      description: 'txAction',
      default: undefined,
      control: 'text',
    }
  },
};

export default meta;
type Story = StoryObj<typeof ImageResponse>;

export const Primary: Story = {
  args: {
    title: mockTitle,
    description: mockText,
    image: mockImage,
    imageTags: mockTags,
    priceLabel  : 'Price',
    priceValue  : '0.5 ETH',
  },
};

Primary.parameters = {
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/UraHvlIzwoXoOYjcIir9f7/Web3-GPT-UI-(Shared)?type=design&node-id=1-1295&t=917wPW0hSfOeOZEV-4',
  },
};

export const LotsOfTags: Story = {
  args: {
    title: mockTitle,
    description: mockText,
    image: mockImage,
    imageTags: [...mockTags,...mockTags,...mockTags],
  },
};

// export const Collapsible: Story = {
//   args: {
//     title: 'Title',
//     text: 'swap',
//     collapsible: true,
//   },
// };
