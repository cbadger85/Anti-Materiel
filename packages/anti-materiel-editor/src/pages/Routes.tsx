import React from 'react';
import { Route, Switch, useLocation } from 'react-router-dom';
import { animated, config, useTransition } from 'react-spring';
import { Header } from '../components/Header/Header';
import { routeConfig } from './routeConfig';

export const Routes: React.FC = () => {
  const location = useLocation();

  const transitions = useTransition(
    location,
    location => location.key as string,
    {
      from: {
        opacity: 0,
        width: '100%',
      },
      enter: { opacity: 1 },
      leave: { opacity: 0 },
      config: config.stiff,
    },
  );

  return (
    <>
      <Header />
      {transitions.map(({ item, props, key }) => (
        <animated.div
          key={key}
          style={{ position: 'absolute', height: 'auto', ...props }}
        >
          <Switch location={item}>
            {Object.values(routeConfig).map(route => (
              <Route exact path={route.path} key={route.path}>
                <route.component />
              </Route>
            ))}
          </Switch>
        </animated.div>
      ))}
    </>
  );
};
