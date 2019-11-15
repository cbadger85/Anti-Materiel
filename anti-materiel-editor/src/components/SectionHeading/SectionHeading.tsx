import React from 'react';
import './SectionHeading.scss';
import { getClasses } from '../../utils/getClasses';

export const SectionHeading: React.FC<SectionHeadingProps> = ({
  color,
  children,
  className,
}) => {
  return (
    <h3
      className={getClasses(
        'section-heading',
        color && `section-heading--${color}`,
        className,
      )}
    >
      {children}
    </h3>
  );
};

interface SectionHeadingProps {
  color?: 'page' | 'side-drawer';
  className?: string;
}
