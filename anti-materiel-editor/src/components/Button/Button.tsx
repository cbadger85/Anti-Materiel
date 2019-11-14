import React from 'react';
import './Button.scss';

export const Button: React.FC<ButtonProps> = ({
  children,
  width,
  height,
  className,
  color,
  disabled,
  ...props
}) => {
  const buttonColorClass = color ? `button--${color}` : '';

  return (
    <button
      {...props}
      disabled={disabled}
      className={`button ${buttonColorClass} ${className ? className : ''}`}
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
    | 'delete-light'
    | 'delete-dark';
  className?: string;
  disabled?: boolean;
}
