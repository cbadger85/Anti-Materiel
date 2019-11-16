import React from 'react';
import './EditorMenu.scss';

export const EditorMenu: React.FC = () => {
  return (
    <div className="menu__container">
      <div className="menu">
        <span className="menu__item menu__item--active">Units</span>
        <span className="menu__item">Weapons</span>
        <span className="menu__item">Equipment</span>
        <span className="menu__item">Special Rules</span>
        <span className="menu__item">Hacking Programs</span>
        <span className="menu__item">Hacking Programs</span>
        <span className="menu__item">Pheroware</span>
      </div>
    </div>
  );
};
