import React from 'react';
import { useToastState } from './useToast';
import { Toast } from './Toast';
import './Toasts.scss';

export const ToastHub: React.FC = () => {
  const { toasts, dismissToast } = useToastState();
  return (
    <ul className="toasts">
      {toasts.map(toast => {
        const { id } = toast;
        return <Toast {...toast} key={id} onDismiss={() => dismissToast(id)} />;
      })}
    </ul>
  );
};
