import React from 'react';
import { useSideDrawer } from './SideDrawerContext';

export const Router: React.FC<RouterProps> = ({ routes }) => {
  const { route } = useSideDrawer();

  const routeNames = Object.keys(routes);

  if (!routeNames.includes(route)) {
    return null;
  }

  const component = routes[route];

  return <>{component()}</>;
};

interface RouterProps {
  routes: Routes;
}

export interface Routes {
  [route: string]: () => React.ReactNode;
}
