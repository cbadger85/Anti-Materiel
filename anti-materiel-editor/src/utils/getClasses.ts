export const getClasses = (...args: (string | boolean | undefined)[]): string =>
  args.filter(arg => typeof arg === 'string' && !!arg.trim()).join(' ');
