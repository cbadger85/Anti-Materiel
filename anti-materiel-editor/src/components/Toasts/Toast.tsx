import React, { memo } from 'react';
import { animated } from 'react-spring';
import { SpringValue } from 'react-spring';

export const Toast = memo(function _Toast({
  onDismiss,
  text,
  style,
}: ToastProps) {
  return (
    <animated.li className="toast" style={style}>
      <p className="toast__content">{text}</p>
      <button className="toast__dismiss" onClick={onDismiss}>
        x
      </button>
    </animated.li>
  );
});

interface ToastProps {
  onDismiss: () => void;
  text: string;
  style: {
    backgroundColor: SpringValue<string>;
    transform: SpringValue<string>;
    // opacity: SpringValue<number>;
  };
}
