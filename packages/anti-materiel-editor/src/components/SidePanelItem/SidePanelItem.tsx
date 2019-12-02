import React from 'react';
import { NavLink } from 'react-router-dom';
import { EditIcon } from '../Icons';
import './SidePanelItem.scss';

export const SidePanelItem: React.FC<SidePanelItemProps> = ({
  name,
  uri,
  id,
}) => {
  return (
    <NavLink replace to={`/${uri}/${id}`} className="side-panel-item">
      <span className="side-panel-item__name">{name}</span>
      <EditIcon />
    </NavLink>
  );
};

interface SidePanelItemProps {
  name: string;
  uri: string;
  id: string;
}
