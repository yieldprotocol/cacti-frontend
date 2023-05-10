import type { Meta, StoryObj } from '@storybook/react';
import { InlineChip } from './InlineChip';

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof InlineChip> = {
  title: 'Example/InlineChip',
  component: InlineChip,
  tags: ['autodocs'],
  argTypes: {
    backgroundColor: {
      control: 'color',
    },
  },
};

export default meta;
type Story = StoryObj<typeof InlineChip>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Primary: Story = {
  args: {
    primary: true,
    label: 'InlineChip',
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
    label: 'InlineChip',
  },
};

// export const Large: Story = {
//   args: {
//     size: 'large',
//     label: 'InlineChip',
//   },
// };

// export const Small: Story = {
//   args: {
//     size: 'small',
//     label: 'InlineChip',
//   }, 
// };
