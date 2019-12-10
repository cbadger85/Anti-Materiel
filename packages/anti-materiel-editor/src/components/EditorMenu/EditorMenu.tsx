import React from 'react';
import './EditorMenu.scss';
import { MenuLink } from './MenuLink';
import { routeConfig } from '../../pages/routeConfig';

export const EditorMenu: React.FC = () => {
  const routes = Object.values(routeConfig).filter(
    route => !!route.name && !route.path.includes(':id'),
  );

  return (
    <div className="menu__container">
      <div className="menu">
        {routes.map(route => (
          <MenuLink
            key={route.name}
            to={route.path}
            className="menu__item"
            activeClassName="menu__item--active"
          >
            {route.name}
          </MenuLink>
        ))}
      </div>
    </div>
  );
};
