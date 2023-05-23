import { toast } from 'react-toastify';
import type { Meta, StoryObj } from '@storybook/react';
import { ActionStepper } from './ActionStepper';

const defaultAction = async () => {
  toast('Action started...');
  await new Promise((r) => setTimeout(r, 2000));
  toast('Action completed!');
};

const meta: Meta<typeof ActionStepper> = {
  title: 'cacti/ActionStepper',
  component: ActionStepper,
  tags: ['autodocs'],
  argTypes: {
    txParams: {
      description: 'Transaction action to take.',
      default: {},
      control: 'object',
    },
    approvalParams: {
      description: 'An approval action that needs to happen before the tx',
      default: {},
      control: 'object',
    },
    label: {
      description: 'Default label to display on button',
      default: {},
      control: 'text',
    },
    disabled: {
      description: 'A bbutton disabling controled by parent component',
      default: false,
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<typeof ActionStepper>;

export const Primary: Story = {
  args: {
    // altAction: defaultAction,
    label: 'Submit',
    disabled: false,
  },
};

Primary.parameters = {
  design: {
    type: 'figma',
    url: 'https://www.figma.com/file/UraHvlIzwoXoOYjcIir9f7/Web3-GPT-UI-(Shared)?type=design&node-id=1-1280&t=GMNJHZirYHaTkOtp-4',
  },
};

export const Disabled: Story = {
  args: {
    // altAction: defaultAction,
    label: 'Submit',
    disabled: true,
  },
};

// export const Pending: Story = {
//   args: {
//     altAction: defaultAction,
//     label: 'Submit',
//     state: ActionResponseState.PENDING,
//   },
// };

// export const Error: Story = {
//   args: {
//     altAction: defaultAction,
//     label: 'Submit',
//     state: ActionResponseState.ERROR,
//   },
// };

// export const Success: Story = {
//   args: {
//     altAction: defaultAction,
//     label: 'Submit',
//     state: ActionResponseState.SUCCESS,
//   },
// };
