import React, { useReducer } from 'react';
import { addToast, removeToast, toastReducer } from './toastReducer';
import { ToastContext, ToastOptions } from './toastsTypes';
import { ToastHub } from './ToastHub';

export const toastContext = React.createContext<ToastContext>({
  toasts: [],
  makeToast: (text: string, options?: ToastOptions) => {},
  dismissToast: (id: string) => {},
});

export const ToastProvider: React.FC = ({ children }) => {
  const [toasts, dispatch] = useReducer(toastReducer, []);

  const makeToast = (text: string, options?: ToastOptions): void =>
    dispatch(addToast(text, options));

  const dismissToast = (id: string): void => dispatch(removeToast(id));

  return (
    <toastContext.Provider value={{ toasts, makeToast, dismissToast }}>
      {children}
      <ToastHub />
    </toastContext.Provider>
  );
};
