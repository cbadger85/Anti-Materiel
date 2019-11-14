export enum FormActionTypes {
  UPDATE,
  LOAD_DATA,
  VALIDATE_FIELD,
}

export interface UpdateAction {
  type: FormActionTypes.UPDATE;
  payload: { key: string; value: FormValue; isInvalid?: boolean };
}

export interface LoadDataAction<T, K extends keyof T> {
  type: FormActionTypes.LOAD_DATA;
  payload: { data: FormState<T, K> };
}

export interface ValidateFieldAction {
  type: FormActionTypes.VALIDATE_FIELD;
  payload: { key: string; isInvalid?: boolean };
}

export type FormAction<T, K extends keyof T> =
  | UpdateAction
  | ValidateFieldAction
  | LoadDataAction<T, K>;

export type FormValue = string | string[] | boolean;

export type FormFields<T> = T & {
  [key: string]: FormValue;
};

export type FormState<T, K extends keyof T> = {
  [keys in K]: { value: T[K]; isInvalid?: boolean };
} &
  FormStateDictionary;

export type FormStateDictionary = {
  [key: string]: { value: FormValue; isInvalid?: boolean };
};

export type FormReducer<T, K extends keyof T> = (
  state: FormState<T, K>,
  action: FormAction<T, K>,
) => FormState<T, K>;

export interface UseFormReturn<T, K extends keyof T> {
  onChangeInput: (key: string, value: FormValue) => void;
  validateField: (key: string, isInvalid?: boolean) => void;
  loadFormState: (fields: FormFields<T>) => void;
  fields: FormFields<T>;
  isValid: boolean;
}
