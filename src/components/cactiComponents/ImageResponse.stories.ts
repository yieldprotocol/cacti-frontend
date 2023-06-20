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
      description: 'tags to display with the image (e.g. traits or  "dog, animal, cute")',
      default: mockTags,
      control: 'text',
    },
    image: {
      description: 'Custom Image e project name.',
      default: mockImage,
      control: 'text',
    },
    imageLink: {
      description: 'External Link to image resource',
      default: 'mockImage',
      control: 'text',
    },
    actionLabel: {
      description: 'Action Label to add eg. Price',
      default: 'Price',
      control: 'text',
    },

    actionValue: {
      description: 'Value of action item eg. Price value',
      default: '0.02ETH',
      control: 'text',
    },

    // actionLabel: {
    //   description: 'tx Action ',
    //   default: undefined,
    //   control: 'text',
    // },
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
    actionLabel: 'Price',
    actionValue: '0.5 ETH',
  },
};

Primary.parameters = {
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/UraHvlIzwoXoOYjcIir9f7/Web3-GPT-UI-(Shared)?type=design&node-id=1-1295&t=917wPW0hSfOeOZEV-4',
  },
};

export const NoTags: Story = {
  args: {
    title: mockTitle,
    description: mockText,
    image: mockImage,
    imageTags: [],
  },
};

export const LotsOfTags: Story = {
  args: {
    title: mockTitle,
    description: mockText,
    image: mockImage,
    imageTags: [...mockTags, ...mockTags, ...mockTags],
  },
};

export const undecorated: Story = {
  args: {
    title: undefined,
    description: undefined,
    image: mockImage,
    imageTags: undefined,
  },
};

// export const Collapsible: Story = {
//   args: {
//     title: 'Title',
//     text: 'swap',
//     collapsible: true,
//   },
// };
