import React from 'react';
import './EditorMenu.scss';
import { MenuLink } from './MenuLink';
import { routeConfig } from '../../pages/routeConfig';

export const EditorMenu: React.FC = () => {
  return (
    <div className="menu__container">
      <div className="menu">
        <MenuLink
          to={routeConfig.addUnit.path}
          className="menu__item"
          activeClassName="menu__item--active"
        >
          Units
        </MenuLink>
        <MenuLink
          to={routeConfig.addWeapon.path}
          className="menu__item"
          activeClassName="menu__item--active"
        >
          Weapons
        </MenuLink>
        <MenuLink
          to={routeConfig.addEquipment.path}
          className="menu__item"
          activeClassName="menu__item--active"
        >
          Equipment
        </MenuLink>
        <span className="menu__item">Special Rules</span>
        <span className="menu__item">Hacking Programs</span>
        <span className="menu__item">Pheroware</span>
      </div>
    </div>
  );
};
