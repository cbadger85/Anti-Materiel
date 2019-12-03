import React from 'react';
import './Button.scss';
import { getClasses } from '../../utils/getClasses';

export const Button: React.FC<ButtonProps> = ({
  children,
  width,
  height,
  className,
  color,
  disabled,
  id,
  ...props
}) => {
  return (
    <button
      {...props}
      id={id}
      disabled={disabled}
      className={getClasses('button', color && `button--${color}`, className)}
      style={{ width, height, ...props.style }}
    >
      {children}
    </button>
  );
};

interface ButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  width?: string;
  height?: string;
  color?:
    | 'primary'
    | 'secondary'
    | 'transparent-dark'
    | 'transparent-light'
    | 'delete'
    | 'delete-ghost'
    | 'delete-light'
    | 'delete-dark';
  className?: string;
  disabled?: boolean;
  id?: string;
}
