import { useContext } from 'react';
import { toastContext } from './ToastProvider';
import { ToastOptions } from './toastsTypes';

export const useToast = (): ((
  text: string,
  options?: ToastOptions,
) => void) => {
  const { makeToast } = useContext(toastContext);

  return makeToast;
};
