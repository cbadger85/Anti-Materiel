import React, { memo } from 'react';
import { animated } from 'react-spring';
import { SpringValue } from 'react-spring';
import { Button } from '../Button/Button';
import { getClasses } from '../../utils/getClasses';

export const Toast = memo(function _Toast({
  onDismiss,
  text,
  style,
  color,
}: ToastProps) {
  return (
    <animated.li
      className={getClasses('toast', `toast--${color}`)}
      style={style}
    >
      <p className="toast__content">{text}</p>
      <Button
        color={color === 'warn' ? 'delete-light' : 'delete-dark'}
        onClick={onDismiss}
      >
        <span className="toast__delete-icon">×</span>
      </Button>
    </animated.li>
  );
});

interface ToastProps {
  onDismiss: () => void;
  text: string;
  color: string;
  style: {
    transform: SpringValue<string>;
    opacity: SpringValue<number>;
  };
}
