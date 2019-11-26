import { useEffect } from 'react';
import isEqual from 'lodash/isEqual';

export const isEmpty = <T>(data: T): boolean => {
  const hasEmptyValues = (data: T): boolean =>
    Object.values(data).find(value => {
      if (Array.isArray(value)) {
        return value.length > 0;
      }

      if (typeof value === 'string') {
        return !!value.trim();
      }

      if (typeof value === 'object') {
        return hasEmptyValues(value);
      }

      return !!value;
    });

  return !hasEmptyValues(data);
};

export const useOnDataChange = <T>(
  onDataChange: (isChanged: boolean) => void,
  data: T,
  initialData?: T,
): void => {
  useEffect(() => {
    if (!initialData) {
      onDataChange(!isEmpty(data));

      return;
    }

    const isFieldsChanged = !isEqual(data, initialData);

    onDataChange(isFieldsChanged);
  }, [data, initialData, onDataChange]);
};
