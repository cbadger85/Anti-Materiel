import React from 'react';
import { useTransition } from 'react-spring';
import { Toast } from './Toast';
import './Toasts.scss';
import { useToastState } from './useToast';

// const config = { tension: 125, friction: 20, precision: 0.1 };

export const ToastHub: React.FC = () => {
  const { toasts, dismissToast } = useToastState();
  const transitions = useTransition(toasts, toast => toast.id, {
    from: toast => ({
      backgroundColor: toast.color,
      transform: 'translate3d(40px,0,0)',
      opacity: 0,
    }),
    enter: toast => ({
      backgroundColor: toast.color,
      transform: 'translate3d(0px,0,0)',
      opacity: 1,
    }),
    leave: toast => ({
      backgroundColor: toast.color,
      transform: 'translate3d(40px,0,0)',
      opacity: 0,
    }),
    onRest: toast => {
      setTimeout(() => dismissToast(toast.id), 500);
    },
    config: { mass: 1, tension: 250, friction: 15 },
  });
  return (
    <ul className="toasts">
      {transitions.map(({ item, key, props }) => (
        <Toast
          key={key}
          onDismiss={() => dismissToast(item.id)}
          style={props}
          text={item.text}
        />
      ))}
    </ul>
  );
};
