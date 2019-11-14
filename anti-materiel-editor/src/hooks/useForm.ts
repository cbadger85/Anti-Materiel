import mapValues from 'lodash/mapValues';
import transform from 'lodash/transform';
import isEqual from 'lodash/isEqual';
import { useReducer } from 'react';
import {
  FormAction,
  FormActionTypes,
  FormFields,
  FormReducer,
  FormState,
  FormStateDictionary,
  FormValue,
  LoadDataAction,
  UpdateAction,
  UseFormReturn,
  ValidateFieldAction,
} from './useForm.types';

export const formReducer = <T, K extends keyof T>(
  state: FormState<T, K>,
  action: FormAction<T, K>,
): FormState<T, K> => {
  switch (action.type) {
    case FormActionTypes.UPDATE:
      return {
        ...state,
        [action.payload.key]: {
          isInvalid: action.payload.isInvalid,
          value: action.payload.value,
        },
      };
    case FormActionTypes.VALIDATE_FIELD:
      return {
        ...state,
        [action.payload.key]: {
          ...state[action.payload.key],
          isInvalid: action.payload.isInvalid,
        },
      };
    case FormActionTypes.LOAD_DATA:
      return { ...state, ...action.payload.data };
    default:
      return state;
  }
};

const updateState = <T, K extends keyof T>(
  prevState: FormState<T, K>,
  action: FormAction<T, K>,
): FormState<T, K> => {
  const state = formReducer(prevState, action);

  if (isEqual(prevState, state)) {
    return prevState;
  }

  return state;
};

export const updateFieldsInForm = (
  key: string,
  value: FormValue,
  isInvalid?: boolean,
): UpdateAction => ({
  type: FormActionTypes.UPDATE,
  payload: { key, value, isInvalid },
});

export const validateFieldsInForm = (
  key: string,
  isInvalid?: boolean,
): ValidateFieldAction => ({
  type: FormActionTypes.VALIDATE_FIELD,
  payload: { key, isInvalid },
});

export const loadFieldsInForm = <T, K extends keyof T>(
  data: FormState<T, K>,
): LoadDataAction<T, K> => ({
  type: FormActionTypes.LOAD_DATA,
  payload: { data },
});

export const getStateFromFields = <T>(
  fields: FormFields<T>,
): FormStateDictionary =>
  transform<FormValue, FormStateDictionary>(fields, (fields, value, key) => {
    fields[key] = { value, isInvalid: true };
  });

export const getIsValid = <T, K extends keyof T>(
  state: FormState<T, K>,
): boolean => {
  const validationList = Object.values(
    mapValues(state as FormStateDictionary, field => field.isInvalid),
  );

  return !validationList.some(isInvalid => isInvalid);
};

export const useForm = <T, K extends keyof T>(
  intialFields: FormFields<T>,
): UseFormReturn<T, K> => {
  const initialState = getStateFromFields(intialFields);

  const [state, dispatch] = useReducer<FormReducer<T, K>>(
    updateState,
    initialState as FormState<T, K>,
  );

  const onChangeInput = (
    key: string,
    value: FormValue,
    isInvalid?: boolean,
  ): void => dispatch(updateFieldsInForm(key, value, isInvalid));

  const validateField = (key: string, isInvalid?: boolean): void =>
    dispatch(validateFieldsInForm(key, isInvalid));

  const loadFormState = (fields: FormFields<T>): void => {
    const state = getStateFromFields(fields);
    dispatch(loadFieldsInForm(state as FormState<T, K>));
  };

  const fields = mapValues(state as FormStateDictionary, field => field.value);

  const isValid = getIsValid(state);

  return {
    onChangeInput,
    validateField,
    loadFormState,
    fields: fields as FormFields<T>,
    isValid,
    state,
  };
};
