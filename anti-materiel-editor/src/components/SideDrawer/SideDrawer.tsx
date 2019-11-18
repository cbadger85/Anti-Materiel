import React from 'react';
import FocusLock from 'react-focus-lock';
import { animated, useTransition } from 'react-spring';
import './SideDrawer.scss';

export const SideDrawer: React.FC<SideDrawerProps> = ({
  children,
  isOpen,
  closeSideDrawer,
}) => {
  const transitionSideDrawer = useTransition(isOpen, null, {
    from: { opacity: 0, transform: 'translate3d(100%, 0, 0)' },
    enter: { opacity: 1, transform: 'translate3d(0, 0, 0)' },
    leave: { opacity: 0, transform: 'translate3d(100%, 0, 0)' },
  });

  const transitionBackground = useTransition(isOpen, null, {
    from: { opacity: 0 },
    enter: { opacity: 0.3 },
    leave: { opacity: 0 },
  });

  return (
    <>
      {transitionBackground.map(
        ({ item, key, props }) =>
          item && (
            <animated.div
              key={key}
              style={props}
              id="opaque-background"
              className={`side-drawer__opaque-background side-drawer__opaque-background--${
                isOpen ? 'visible' : 'invisible'
              }`}
              onClick={closeSideDrawer}
            />
          ),
      )}
      {transitionSideDrawer.map(
        ({ item, key, props }) =>
          item && (
            <animated.div
              key={key}
              className="side-drawer__container"
              id="side-drawer"
              style={props}
            >
              <FocusLock disabled={!isOpen}>{children}</FocusLock>
            </animated.div>
          ),
      )}
    </>
  );
};

interface SideDrawerProps {
  isOpen: boolean;
  isClosableOnOutsideClick?: boolean;
  closeSideDrawer?: () => void;
}
