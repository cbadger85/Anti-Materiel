export const isBTS = (bts: string): boolean => {
  const btsNum = parseInt(bts, 10);

  return btsNum % 3 === 0;
};

export const isValidRange = (range: string): boolean => {
  const rangeNum = parseInt(range, 10);

  return rangeNum % 8 === 0;
};

export const isMov = (mov: string): boolean => {
  const movRegex = new RegExp(/^([0-9]-[0-9])*$/);

  return movRegex.test(mov);
};

export const isInt = (int: string): boolean => {
  const intRegex = new RegExp(/^[0-9]*$/);

  return intRegex.test(int);
};

export const isEmpty = (string: string): boolean => {
  return !string.trim();
};
