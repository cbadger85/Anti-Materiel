import React, { useState } from 'react';
import FocusLock from 'react-focus-lock';
import { animated, useSpring } from 'react-spring';
import './SideDrawer.scss';

export const SideDrawer: React.FC<SideDrawerProps> = ({
  isOpen,
  closeSideDrawer,
  children,
}) => {
  const [isMounted, setIsMounted] = useState(false);
  const sideDrawerAnimation = useSpring({
    transform: isOpen ? 'translate3d(0, 0, 0)' : 'translate3d(100%, 0, 0)',
    onRest: () => !isOpen && setIsMounted(false),
    onStart: () => isOpen && setIsMounted(true),
  });
  const opaqueBackgroundAnimation = useSpring({
    opacity: isOpen ? 0.3 : 0,
  });

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <animated.div
        style={opaqueBackgroundAnimation}
        className={`side-drawer__opaque-background side-drawer__opaque-background--${
          isOpen ? 'visible' : 'invisible'
        }`}
        id="opaque-background"
        onClick={() => closeSideDrawer && closeSideDrawer()}
      />
      <animated.div
        className="side-drawer__container"
        id="side-drawer"
        style={sideDrawerAnimation}
      >
        <FocusLock disabled={!isOpen}>{children}</FocusLock>
      </animated.div>
    </>
  );
};

interface SideDrawerProps {
  isOpen: boolean;
  isClosableOnOutsideClick?: boolean;
  closeSideDrawer?: () => void;
}
