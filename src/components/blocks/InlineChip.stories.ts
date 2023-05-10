import type { Meta, StoryObj } from '@storybook/react';
import { InlineChip } from './InlineChip';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof InlineChip> = {
  title: 'Example/InlineChip',
  component: InlineChip,
  tags: ['autodocs'],
  argTypes: {
    label : {
      description: 'Text to display. Will be shortened if an address("0x"prefix).',
      default: '0x1Bd3Abb6ef058408734EA01cA81D325039cd7bcA',
      control: 'text',
    },
    showCopyButton: {
      default: false,
      description: 'Show copy button',
      controls: 'boolean',
    },
    image: { 
      control: { type: 'file', accept: ['.jpg', '.svg', '.png' ] } 
    }
  },
};

export default meta;
type Story = StoryObj<typeof InlineChip>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Primary: Story = {
  args: {
    // primary: true,
    label: '0x1Bd3Abb6ef058408734EA01cA81D325039cd7bcA',
    showCopyButton: false,
  },
};

Primary.parameters = {
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/LwiLzvSwxYijBrYxjgdHHy/OG_DarkMode?type=design&node-id=137-65144&t=UkXHkyBt9a9nIFsL-4',
  },
};

export const AnotherVariant: Story = {
  args: {
    label: '0x1Bd3Abb6ef058408734EA01cA81D325039cd7bcA',
    showCopyButton: true,
  },
};
