import React from 'react';
import { NavLink } from 'react-router-dom';
import './SidePanelItem.scss';

export const SidePanelItem: React.FC<SidePanelItemProps> = ({
  name,
  uri,
  id,
}) => {
  return (
    <NavLink
      replace
      to={`/${uri}/${id}`}
      className="side-panel-item"
      activeClassName="side-panel-item--active"
    >
      <span className="side-panel-item__name">{name}</span>
    </NavLink>
  );
};

interface SidePanelItemProps {
  name: string;
  uri: string;
  id: string;
}
