import React from 'react';
import { useTransition } from 'react-spring';
import { Toast } from './Toast';
import './Toasts.scss';
import { useToastState } from './useToast';

export const ToastHub: React.FC = () => {
  const { toasts, dismissToast } = useToastState();
  const transitions = useTransition(toasts, toast => toast.id, {
    from: {
      transform: 'translate3d(4rem,0,0)',
      opacity: 0,
    },
    enter: {
      transform: 'translate3d(0px,0,0)',
      opacity: 1,
    },
    leave: {
      transform: 'translate3d(4rem,0,0)',
      opacity: 0,
    },
    onRest: toast => {
      setTimeout(() => dismissToast(toast.id), toast.duration);
    },
    config: { mass: 1, tension: 250, friction: 15 },
  });
  return (
    <ul className="toasts">
      {transitions.map(({ item, key, props }) => (
        <Toast
          key={key}
          onDismiss={() => dismissToast(item.id)}
          color={item.color}
          style={props}
          text={item.text}
        />
      ))}
    </ul>
  );
};
