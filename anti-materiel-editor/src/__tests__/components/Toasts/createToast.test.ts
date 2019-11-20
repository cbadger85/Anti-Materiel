import { createToast } from '../../../components/Toasts/createToast';

jest.mock('uuid/v4', () => jest.fn().mockReturnValue('abcd'));

describe('createToast', () => {
  it('should create the toast with default options if no options are provided', () => {
    const toast = createToast('test');

    const expectedToast = {
      text: 'test',
      color: 'info',
      duration: 700,
      id: 'abcd',
    };

    expect(toast).toEqual(expectedToast);
  });

  it('should create the toast if only a color is provided', () => {
    const toast = createToast('test', { color: 'warn' });

    const expectedToast = {
      text: 'test',
      color: 'warn',
      duration: 700,
      id: 'abcd',
    };

    expect(toast).toEqual(expectedToast);
  });

  it('should create the toast if only a duration is provided', () => {
    const toast = createToast('test', { duration: 1337 });

    const expectedToast = {
      text: 'test',
      color: 'info',
      duration: 1337,
      id: 'abcd',
    };

    expect(toast).toEqual(expectedToast);
  });

  it('should create the toast if both a duration and times provided', () => {
    const toast = createToast('test', { color: 'warn', duration: 1337 });

    const expectedToast = {
      text: 'test',
      color: 'warn',
      duration: 1337,
      id: 'abcd',
    };

    expect(toast).toEqual(expectedToast);
  });
});
