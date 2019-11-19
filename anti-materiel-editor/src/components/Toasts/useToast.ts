import { useContext } from 'react';
import { toastContext } from './ToastProvider';
import { ToastOptions, ToastContext } from './toastsTypes';

export const useToast = (): ((
  text: string,
  options?: ToastOptions,
) => void) => {
  const { makeToast } = useContext(toastContext);

  return makeToast;
};

export const useToastState = (): ToastContext => useContext(toastContext);
