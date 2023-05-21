import { toast } from 'react-toastify';
import type { Meta, StoryObj } from '@storybook/react';
import { ActionResponse, ActionResponseState } from './ActionResponse';

const defaultAction = async () => {
  toast('Action started...');
  await new Promise(r => setTimeout(r, 2000));
  toast('Action completed!');
};

const meta: Meta<typeof ActionResponse> = {
  title: 'cacti/ActionResponse',
  component: ActionResponse,
  tags: ['autodocs'],
  argTypes: {
    txAction: {
      description: 'Transaction action to take.',
      default: defaultAction,
      control: 'text',
    },
    altAction: {
      description: 'Any async action to take.',
      default: defaultAction,
    },
    label: {
      description: 'Text to display on button',
      default: undefined,
      control: 'text',
    },
    state: {
      description: 'The state of the button',
      default: undefined,
      options: [
        ActionResponseState.DEFAULT,
        ActionResponseState.DISABLED,
        ActionResponseState.SUCCESS,
        ActionResponseState.ERROR,
        ActionResponseState.LOADING,
        ActionResponseState.PENDING,
      ],
      control: 'select',
    },
  },
};

export default meta;
type Story = StoryObj<typeof ActionResponse>;

export const Primary: Story = {
  args: {
    altAction: defaultAction,
    label: 'Submit',
    state: ActionResponseState.DEFAULT,
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
    altAction: defaultAction,
    label: 'Submit',
    state: ActionResponseState.DISABLED,
  },
};

export const Pending: Story = {
  args: {
    altAction: defaultAction,
    label: 'Submit',
    state: ActionResponseState.PENDING,
  },
};

export const Error: Story = {
  args: {
    altAction: defaultAction,
    label: 'Submit',
    state: ActionResponseState.ERROR,
  },
};

export const Success: Story = {
  args: {
    altAction: defaultAction,
    label: 'Submit',
    state: ActionResponseState.SUCCESS,
  },
};
