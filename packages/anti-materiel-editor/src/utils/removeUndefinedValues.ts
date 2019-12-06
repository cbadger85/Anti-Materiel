import pickBy from 'lodash/pickBy';

export const removeUndefinedValues = <T extends { [key: string]: unknown }>(
  obj: T,
): T => {
  if (typeof obj !== 'object') {
    return obj;
  }

  const keys = Object.keys(obj);

  const newObj = keys.reduce<Record<string, unknown>>((acc, key) => {
    const value = obj[key];

    if (Array.isArray(value)) {
      acc[key] = value
        .map(subKey => removeUndefinedValues(subKey))
        .filter(subKey => {
          if (typeof subKey === 'object') {
            return Object.keys(subKey).some(value => !!value);
          }

          return true;
        })
        .filter(subKey => subKey !== undefined);
      return acc;
    }

    if (typeof value === 'object' && value !== null) {
      const subValue = removeUndefinedValues(value as Record<string, unknown>);
      acc[key] = Object.keys(subValue).length
        ? removeUndefinedValues(value as Record<string, unknown>)
        : undefined;
      return acc;
    }

    acc[key] = obj[key];
    return acc;
  }, {} as Record<string, unknown>);

  return pickBy(newObj, value => value !== undefined) as T;
};
