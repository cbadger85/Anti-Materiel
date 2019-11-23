import uuid from 'uuid/v4';
import { ToastOptions, Toast } from './toastsTypes';

export const defaultOptions: Required<ToastOptions> = {
  color: 'info',
  duration: 700,
};

export const createToast = (text: string, options?: ToastOptions): Toast => ({
  text,
  ...defaultOptions,
  ...options,
  id: uuid(),
});
