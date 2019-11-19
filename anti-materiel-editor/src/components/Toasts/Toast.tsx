import React, { memo } from 'react';

export const Toast = memo(function _Toast({
  onDismiss,
  text,
  color,
}: ToastProps) {
  return (
    <li className="toast" style={{ backgroundColor: color }}>
      <p className="toast__content">{text}</p>
      <button className="toast__dismiss" onClick={onDismiss}>
        x
      </button>
    </li>
  );
});

interface ToastProps {
  onDismiss: () => void;
  text: string;
  color: string;
}
