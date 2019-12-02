import React from 'react';
import { EditIcon } from '../Icons';
import './SidePanelItem.scss';

export const SidePanelItem: React.FC<SidePanelItemProps> = ({
  name,
  onClick,
}) => {
  return (
    <button className="side-panel-item" onClick={onClick}>
      <span className="side-panel-item__name">{name}</span>
      <EditIcon />
    </button>
  );
};

interface SidePanelItemProps {
  name: string;
  onClick: () => void;
}
