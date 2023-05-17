import { toast } from 'react-toastify';
import type { Meta, StoryObj } from '@storybook/react';
import { ActionResponse, ActionResponseState } from './ActionResponse';

const defaultAction = () => {
  toast('Action');
};

const meta: Meta<typeof ActionResponse> = {
  title: 'cacti/ActionResponse',
  component: ActionResponse,
  tags: ['autodocs'],
  argTypes: {
    action: {
      description: 'The action to take.',
      default: defaultAction,
      control: 'text',
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
    action: defaultAction,
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
    action: defaultAction,
    label: 'Submit',
    state: ActionResponseState.DISABLED,
  },
};

export const Pending: Story = {
  args: {
    action: defaultAction,
    label: 'Submit',
    state: ActionResponseState.PENDING,
  },
};

export const Error: Story = {
  args: {
    action: defaultAction,
    label: 'Submit',
    state: ActionResponseState.ERROR,
  },
};

export const Success: Story = {
  args: {
    action: defaultAction,
    label: 'Submit',
    state: ActionResponseState.SUCCESS,
  },
};
