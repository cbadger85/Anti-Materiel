export enum FormActionTypes {
  UPDATE,
  LOAD_DATA,
}

export interface UpdateAction {
  type: FormActionTypes.UPDATE;
  payload: { key: string; value: string | string[] | boolean };
}

export interface LoadDataAction<T> {
  type: FormActionTypes.LOAD_DATA;
  payload: { data: FormState<T> };
}

export type FormAction<T> = UpdateAction | LoadDataAction<T>;

export type FormState<T> = T & {
  [key: string]: string | string[] | boolean;
};

export type FormState2<T, K extends keyof FormState<T>> = {
  [keys in K]: { value: string | string[] | boolean; isValid?: boolean };
};

export type FormReducer<T> = (
  state: FormState<T>,
  action: FormAction<T>,
) => FormState<T>;

export interface UseFormReturn<T> {
  state: FormState<T>;
  onChangeInput: (key: string, value: string | string[] | boolean) => void;
  onLoadFormState: (state: FormState<T>) => void;
}
