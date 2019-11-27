import { isEmptyObj } from '../../hooks/useOnDataChange';

describe('useOnDataChange', () => {
  describe('isNotEmpty', () => {
    it('should return false if the data values are falsy', () => {
      const initialData = {
        foo: '',
        bar: [],
        baz: {
          foo: 0,
          bar: [],
          baz: {
            foo: '',
            bar: false,
            bang: undefined,
            fang: 0,
          },
        },
        bang: {},
      };

      const data = isEmptyObj(initialData);

      expect(data).toBe(true);
    });

    it('should return false if a string has values', () => {
      const initialData = {
        foo: 'test',
        bar: [],
        baz: {
          foo: 0,
          bar: [],
          baz: {
            foo: '',
            bar: false,
            bang: undefined,
            fang: 0,
          },
        },
        bang: {},
      };

      const data = isEmptyObj(initialData);

      expect(data).toBe(false);
    });

    it('should return false if an array has length', () => {
      const initialData = {
        foo: '',
        bar: [],
        baz: {
          foo: 0,
          bar: [''],
          baz: {
            foo: '',
            bar: false,
            bang: undefined,
            fang: 0,
          },
        },
        bang: {},
      };

      const data = isEmptyObj(initialData);

      expect(data).toBe(false);
    });

    it('should return false if a boolean is true', () => {
      const initialData = {
        foo: '',
        bar: [],
        baz: {
          foo: 0,
          bar: [],
          baz: {
            foo: '',
            bar: false,
            bang: true,
            fang: 0,
          },
        },
        bang: {},
      };

      const data = isEmptyObj(initialData);

      expect(data).toBe(false);
    });
  });
});
