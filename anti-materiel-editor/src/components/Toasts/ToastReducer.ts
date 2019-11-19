import {
  ToastOptions,
  ToastActionTypes,
  AddToastAction,
  RemoveToastAction,
  Toast,
  ToastActions,
} from './toastsTypes';
import { createToast } from './createToast';

export const addToast = (
  text: string,
  options?: ToastOptions,
): AddToastAction => ({
  type: ToastActionTypes.ADD_TOAST,
  payload: createToast(text, options),
});

export const removeToast = (id: string): RemoveToastAction => ({
  type: ToastActionTypes.REMOVE_TOAST,
  payload: { id },
});

export const toastReducer = (
  state: Toast[] = [],
  action: ToastActions,
): Toast[] => {
  switch (action.type) {
    case ToastActionTypes.ADD_TOAST:
      return [...state, action.payload];
    case ToastActionTypes.REMOVE_TOAST:
      return state.filter(toast => toast.id !== action.payload.id);
    default:
      return state;
  }
};
