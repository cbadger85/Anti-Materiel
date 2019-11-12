import { useReducer } from 'react';
import {
  FormState,
  FormAction,
  FormActionTypes,
  UpdateAction,
  LoadDataAction,
  UseFormReturn,
  FormReducer,
} from './useForm.types';

export const formReducer = <T>(
  state: FormState<T>,
  action: FormAction<T>,
): FormState<T> => {
  switch (action.type) {
    case FormActionTypes.UPDATE:
      return { ...state, [action.payload.key]: action.payload.value };
    case FormActionTypes.LOAD_DATA:
      return { ...state, ...action.payload.data };
    default:
      return state;
  }
};

export const updateFieldsInForm = (
  key: string,
  value: string | string[] | boolean,
): UpdateAction => ({
  type: FormActionTypes.UPDATE,
  payload: { key, value },
});

export const loadFieldsInForm = <T>(data: FormState<T>): LoadDataAction<T> => ({
  type: FormActionTypes.LOAD_DATA,
  payload: { data },
});

export const useForm = <T>(intialState: FormState<T>): UseFormReturn<T> => {
  const [state, dispatch] = useReducer<FormReducer<T>>(
    formReducer,
    intialState,
  );

  const onChangeInput = (
    key: string,
    value: string | string[] | boolean,
  ): void => dispatch(updateFieldsInForm(key, value));

  const onLoadFormState = (state: FormState<T>): void =>
    dispatch(loadFieldsInForm(state));

  return { state, onChangeInput, onLoadFormState };
};
