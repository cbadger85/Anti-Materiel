export const isArrayOfStrings = (value: unknown): value is string[] => {
  if (!Array.isArray(value)) {
    return false;
  }

  return value.every(item => typeof item === "string");
};

export const isString = (value: unknown): value is string =>
  typeof value === "string";

export const isBooleanOrUndefined = (value: unknown): value is boolean =>
  typeof value === "boolean" || value === undefined;

export const isBoolean = (value: unknown): value is boolean =>
  typeof value === "boolean";
