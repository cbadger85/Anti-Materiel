import { move } from '../../utils/move';

describe('move()', () => {
  it('should move an item left in the array', () => {
    expect(move(['a', 'b', 'c'], 2, 0)).toEqual(['c', 'a', 'b']);
    expect(
      move(
        [
          { name: 'Fred' },
          { name: 'Barney' },
          { name: 'Wilma' },
          { name: 'Betty' },
        ],
        2,
        1,
      ),
    ).toEqual([
      { name: 'Fred' },
      { name: 'Wilma' },
      { name: 'Barney' },
      { name: 'Betty' },
    ]);
    expect(move([1, 2, 3], 2, 1)).toEqual([1, 3, 2]);
  });
  it('should move an item right in the array', () => {
    expect(move(['a', 'b', 'c'], 0, 2)).toEqual(['b', 'c', 'a']);
    expect(
      move(
        [
          { name: 'Fred' },
          { name: 'Barney' },
          { name: 'Wilma' },
          { name: 'Betty' },
        ],
        1,
        2,
      ),
    ).toEqual([
      { name: 'Fred' },
      { name: 'Wilma' },
      { name: 'Barney' },
      { name: 'Betty' },
    ]);
    expect(move([1, 2, 3], 1, 2)).toEqual([1, 3, 2]);
  });
  it('should return the same array if the moveIndex and toIndex are the same', () => {
    expect(move(['a', 'b', 'c'], 2, 2)).toEqual(['a', 'b', 'c']);
    expect(
      move(
        [
          { name: 'Fred' },
          { name: 'Barney' },
          { name: 'Wilma' },
          { name: 'Betty' },
        ],
        1,
        1,
      ),
    ).toEqual([
      { name: 'Fred' },
      { name: 'Barney' },
      { name: 'Wilma' },
      { name: 'Betty' },
    ]);
    expect(move([1, 2, 3], 1, 1)).toEqual([1, 2, 3]);
  });
});
