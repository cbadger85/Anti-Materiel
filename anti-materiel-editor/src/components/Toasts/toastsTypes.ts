export enum ToastActionTypes {
  ADD_TOAST,
  REMOVE_TOAST,
}

export interface ToastOptions {
  color: string;
  id: string;
}

export type Toast = ToastOptions & { text: string };

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
