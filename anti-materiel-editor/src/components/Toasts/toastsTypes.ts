export enum ToastActionTypes {
  ADD_TOAST,
  REMOVE_TOAST,
}

export interface ToastOptions {
  color?: 'info' | 'warn' | 'danger';
  duration?: number;
}

export type Toast = Required<ToastOptions> & { text: string; id: string };

export interface AddToastAction {
  type: ToastActionTypes.ADD_TOAST;
  payload: Toast;
}

export interface RemoveToastAction {
  type: ToastActionTypes.REMOVE_TOAST;
  payload: { id: string };
}

export type ToastActions = AddToastAction | RemoveToastAction;

export interface ToastContext {
  toasts: Toast[];
  makeToast: (text: string, options?: ToastOptions) => void;
  dismissToast: (id: string) => void;
}
