import { removeUndefinedValues } from '../../utils/removeUndefinedValues';

describe('removeUndefinedValues', () => {
  it('should remove undefined values from an object', () => {
    const input = {
      foo: undefined,
      bar: null,
      baz: 3,
    };

    const expectedOutput = {
      bar: null,
      baz: 3,
    };

    const output = removeUndefinedValues(input);

    expect(output).toEqual(expectedOutput);
  });

  it('should remove undefined values from nested objects', () => {
    const input = {
      foo: {
        foo: undefined,
        bar: true,
        baz: false,
      },
      bar: 'bar',
      baz: 1234,
    };

    const expectedOutput = {
      foo: {
        bar: true,
        baz: false,
      },
      bar: 'bar',
      baz: 1234,
    };

    const output = removeUndefinedValues(input);

    expect(output).toEqual(expectedOutput);
  });

  it('should remove the whole object if every value is undefined', () => {
    const input = {
      foo: {
        foo: undefined,
        bar: undefined,
        baz: undefined,
      },
      bar: 'bar',
      baz: 1234,
    };

    const expectedOutput = {
      bar: 'bar',
      baz: 1234,
    };

    const output = removeUndefinedValues(input);

    expect(output).toEqual(expectedOutput);
  });

  it('should remove undefined values in arrays', () => {
    const input = {
      foo: [undefined, 'foo'],
      bar: 'bar',
      baz: 1234,
    };

    const expectedOutput = {
      foo: ['foo'],
      bar: 'bar',
      baz: 1234,
    };

    const output = removeUndefinedValues(input);

    expect(output).toEqual(expectedOutput);
  });

  it('should remove undefined values from objects in arrays', () => {
    const input = {
      foo: [
        {
          foo: undefined,
          bar: true,
          baz: false,
        },
        {
          foo: 'foo',
          bar: true,
          baz: undefined,
        },
      ],
      bar: 'bar',
      baz: 1234,
    };

    const expectedOutput = {
      foo: [
        {
          bar: true,
          baz: false,
        },
        {
          foo: 'foo',
          bar: true,
        },
      ],
      bar: 'bar',
      baz: 1234,
    };

    const output = removeUndefinedValues(input);

    expect(output).toEqual(expectedOutput);
  });

  it('should remove the item from the array if all values are undefined', () => {
    const input = {
      foo: [
        {
          foo: undefined,
          bar: undefined,
          baz: undefined,
        },
        {
          foo: 'foo',
          bar: true,
          baz: undefined,
        },
      ],
      bar: 'bar',
      baz: 1234,
    };

    const expectedOutput = {
      foo: [
        {
          foo: 'foo',
          bar: true,
        },
      ],
      bar: 'bar',
      baz: 1234,
    };

    const output = removeUndefinedValues(input);

    expect(output).toEqual(expectedOutput);
  });

  it('should remove undefined values form mixed arrays', () => {
    const input = {
      foo: [
        {
          foo: undefined,
          bar: undefined,
          baz: undefined,
        },
        {
          foo: 'foo',
          bar: true,
          baz: undefined,
        },
        undefined,
        'baz',
      ],
      bar: 'bar',
      baz: 1234,
    };

    const expectedOutput = {
      foo: [
        {
          foo: 'foo',
          bar: true,
        },
        'baz',
      ],
      bar: 'bar',
      baz: 1234,
    };

    const output = removeUndefinedValues(input);

    expect(output).toEqual(expectedOutput);
  });
});
