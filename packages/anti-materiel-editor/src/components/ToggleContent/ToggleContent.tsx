import React, { useState } from 'react';

export const ToggleContent: React.FC<ToggleContentProps> = ({
  toggle,
  content,
}) => {
  const [isShown, setIsShown] = useState(false);
  const hide = (): void => setIsShown(false);
  const show = (): void => setIsShown(true);

  return (
    <>
      {toggle(show)}
      {isShown && content(isShown, hide)}
    </>
  );
};

interface ToggleContentProps {
  toggle: (show: () => void) => React.ReactNode;
  content: (isShown: boolean, hide: () => void) => React.ReactNode;
}
