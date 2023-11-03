import { ReactNode } from 'react';

import { useHandleCopyToClipboard } from './hooks/useHandleCopyToClipboard';

interface ChildrenProps {
  isCopied: boolean;
  handleCopyClick: () => void;
}

export interface ClipboardButtonProps {
  textToCopy: string;
  children: ({ isCopied, handleCopyClick }: ChildrenProps) => ReactNode;
}

export const ClipboardButton = ({ textToCopy, children }: ClipboardButtonProps) => {
  const { isCopied, copyToClipboard } = useHandleCopyToClipboard();

  const handleCopyClick = () => {
    copyToClipboard(textToCopy);
  };

  return (
    <>
      {children({
        isCopied,
        handleCopyClick,
      })}
    </>
  );
};
