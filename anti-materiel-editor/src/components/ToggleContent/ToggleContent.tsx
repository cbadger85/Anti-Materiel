import React, { useState } from 'react';

export const ToggleContent: React.FC<ToggleContentProps> = ({
  toggle,
  content,
  handleMount,
}) => {
  const [isShown, setIsShown] = useState(false);
  const hide = () => setIsShown(false);
  const show = () => setIsShown(true);

  return (
    <>
      {toggle(show)}
      {handleMount ? isShown && content(isShown, hide) : content(isShown, hide)}
    </>
  );
};

interface ToggleContentProps {
  toggle: (show: () => void) => React.ReactNode;
  content: (isShown: boolean, show: () => void) => React.ReactNode;
  handleMount?: boolean;
}
