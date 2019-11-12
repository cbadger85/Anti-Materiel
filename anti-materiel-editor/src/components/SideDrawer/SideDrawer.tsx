import React, { useState } from 'react';
import FocusLock from 'react-focus-lock';
import { animated, useSpring } from 'react-spring';
import { routesConfig } from '../../utils/routes.config';
import { Router } from './Router';
import './SideDrawer.scss';
import { useSideDrawer } from './SideDrawerContext';

export const SideDrawer: React.FC = () => {
  const { isSideDrawerOpen } = useSideDrawer();
  const [isMounted, setIsMounted] = useState(false);
  const sideDrawerAnimation = useSpring({
    transform: isSideDrawerOpen
      ? 'translate3d(0, 0, 0)'
      : 'translate3d(100%, 0, 0)',
    onRest: () => !isSideDrawerOpen && setIsMounted(false),
    onStart: () => isSideDrawerOpen && setIsMounted(true),
  });
  const opaqueBackgroundAnimation = useSpring({
    opacity: isSideDrawerOpen ? 0.3 : 0,
  });

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <animated.div
        style={opaqueBackgroundAnimation}
        className={`side-drawer__opaque-background side-drawer__opaque-background--${
          isSideDrawerOpen ? 'visible' : 'invisible'
        }`}
        id="opaque-background"
      />
      <animated.div
        className="side-drawer__container"
        id="side-drawer"
        style={sideDrawerAnimation}
      >
        <FocusLock disabled={!isSideDrawerOpen}>
          <Router routes={routesConfig} />
        </FocusLock>
      </animated.div>
    </>
  );
};
