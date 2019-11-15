import React from 'react';
import { IconProps } from './iconProps';
import { getClasses } from '../../utils/getClasses';

export const AddIcon: React.FC<IconProps> = ({ color }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={getClasses('icon', color && `icon--${color}`)}
      width="1.2rem"
      height="1.2rem"
      viewBox="0 0 24 24"
    >
      <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
      <path d="M0 0h24v24H0z" fill="none" />
    </svg>
  );
};
