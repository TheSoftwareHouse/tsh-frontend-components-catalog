import { Meta, Story } from '@storybook/react';

import MaskInput from './MaskInput';

export default {
  title: 'MaskInput',
  component: MaskInput,
} as Meta;

const Template: Story = (args) => <MaskInput maskType={args.maskType} {...args} />;

export const PhoneMask = Template.bind({});
PhoneMask.args = {
  label: 'Phone number',
  maskType: 'phone',
};

export const DateMask = Template.bind({});
DateMask.args = {
  label: 'Date',
  maskType: 'date',
};

export const CreditCardMask = Template.bind({});
CreditCardMask.args = {
  label: 'Credit card number',
  maskType: 'creditCard',
};
