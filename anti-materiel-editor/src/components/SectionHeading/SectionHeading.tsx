import React from 'react';
import './SectionHeading.scss';

export const SectionHeading: React.FC<SectionHeadingProps> = ({
  color,
  children,
  className,
}) => {
  const sectionHeadingColorClass = color ? `section-heading--${color}` : '';

  return (
    <h3
      className={`section-heading ${sectionHeadingColorClass} ${
        className ? className : ''
      }`}
    >
      {children}
    </h3>
  );
};

interface SectionHeadingProps {
  color?: 'page' | 'side-drawer';
  className?: string;
}
