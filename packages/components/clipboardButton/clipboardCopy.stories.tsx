import { Meta, Story } from '@storybook/react';

import { ClipboardButton, ClipboardButtonProps } from './ClipboardButton';

export default {
  title: 'ClipboardButton',
  component: ClipboardButton,
} as Meta<ClipboardButtonProps>;

const Template: Story = (args) => (
  <>
    <ClipboardButton textToCopy={args.textToCopy}>
      {({ isCopied, handleCopyClick }) => (
        <>
          <input type="text" value={args.textToCopy} readOnly />
          <button onClick={handleCopyClick}>{isCopied ? 'Copied!' : 'Copy'}</button>
        </>
      )}
    </ClipboardButton>
    <div>
      <textarea placeholder="Paste the value here!"></textarea>
    </div>
  </>
);

export const Default = Template.bind({});
Default.args = {
  textToCopy: 'Sample text',
};
