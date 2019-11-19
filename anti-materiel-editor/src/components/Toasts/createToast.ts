import uuid from 'uuid/v4';
import { ToastOptions, Toast } from './toastsTypes';

export const defaultOptions = {
  color: '#6796e6',
};

export const createToast = (text: string, options?: ToastOptions): Toast => ({
  text,
  ...defaultOptions,
  ...options,
  id: uuid(),
});
