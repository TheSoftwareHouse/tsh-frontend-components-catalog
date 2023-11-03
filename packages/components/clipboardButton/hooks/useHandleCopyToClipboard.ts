import { useState } from 'react';

export const useHandleCopyToClipboard = () => {
  const [isCopied, setIsCopied] = useState(false);

  const copyToClipboard = (textToCopy: string) => {
    try {
      navigator.clipboard.writeText(textToCopy);
      setIsCopied(true);
    } catch (err) {
      console.error('Failed to copy :( : ', err);
    } finally {
      setTimeout(() => {
        setIsCopied(false);
      }, 2000);
    }
  };

  return { isCopied, copyToClipboard };
};
