import React from 'react';
import './EditorMenu.scss';
import { MenuLink } from './MenuLink';

export const EditorMenu: React.FC = () => {
  return (
    <div className="menu__container">
      <div className="menu">
        <MenuLink
          to="/unit-editor"
          className="menu__item"
          activeClassName="menu__item--active"
        >
          Units
        </MenuLink>
        <MenuLink
          to="/weapon-editor"
          className="menu__item"
          activeClassName="menu__item--active"
        >
          Weapons
        </MenuLink>
        <span className="menu__item">Equipment</span>
        <span className="menu__item">Special Rules</span>
        <span className="menu__item">Hacking Programs</span>
        <span className="menu__item">Hacking Programs</span>
        <span className="menu__item">Pheroware</span>
      </div>
    </div>
  );
};