import React from 'react';
import { Route, Switch, useLocation } from 'react-router-dom';
import { animated, useTransition, config } from 'react-spring';
import { UnitEditor } from './UnitEditor/UnitEditor';
import { WeaponEditor } from './WeaponEditor/WeaponEditor';
import { Header } from '../components/Header/Header';

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
      <Header title="Anti-Materiel" />
      {transitions.map(({ item, props, key }) => (
        <animated.div key={key} style={{ position: 'absolute', ...props }}>
          <Switch location={item}>
            <Route exact path="/unit-editor" component={UnitEditor} />
            <Route exact path="/weapon-editor" component={WeaponEditor} />
          </Switch>
        </animated.div>
      ))}
    </>
  );

  // return (
  //   <>
  //     <Header title="Anti-Materiel" />
  //     <Switch>
  //       <Route exact path="/unit-editor" component={UnitEditor} />
  //       <Route exact path="/weapon-editor" component={WeaponEditor} />
  //     </Switch>
  //   </>
  // );
};
