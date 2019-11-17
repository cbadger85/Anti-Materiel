import { getClasses } from '../../utils/getClasses';

describe('getClasses', () => {
  it('should return a string when provided with strings as args', () => {
    const classes = getClasses('class-1', 'class-2', 'class-3');

    expect(classes).toBe('class-1 class-2 class-3');
  });

  it('should not have undefined in the class string if an arg is undefined', () => {
    let blankClass;
    const classes = getClasses('class-1', blankClass, 'class-3');

    expect(classes).toBe('class-1 class-3');
  });

  it('should not have false in the class string if using short circuit logic', () => {
    let blankClass;
    const classes = getClasses('class-1', blankClass && 'class-2');

    expect(classes).toBe('class-1');
  });
});
