export enum FormActionTypes {
  UPDATE,
  LOAD_DATA,
}

export interface UpdateAction {
  type: FormActionTypes.UPDATE;
  payload: { key: string; value: FormValue; isInvalid?: boolean };
}

export interface LoadDataAction<T, K extends keyof T> {
  type: FormActionTypes.LOAD_DATA;
  payload: { data: FormState<T, K> };
}

export type FormAction<T, K extends keyof T> =
  | UpdateAction
  | LoadDataAction<T, K>;

export type FormValue = string | string[] | boolean;

export type FormFields<T> = T & {
  [key: string]: FormValue;
};

export type FormState<T, K extends keyof T> = {
  [keys in K & keyof T]: { value: T[K]; isInvalid?: boolean };
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
  loadFormState: (fields: FormFields<T>) => void;
  fields: FormFields<T>;
  isValid: boolean;
  state: FormState<T, K>;
}
