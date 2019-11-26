import { isBTS, isMov, isInt } from '../../utils/formValidators';

describe('isBTS', () => {
  it('should return true if the number is divisible by 3', () => {
    const validBTS = '3';

    const valid = isBTS(validBTS);

    expect(valid).toBeTruthy();
  });

  it('should return true if the number is 0', () => {
    const validBTS = '0';

    const valid = isBTS(validBTS);

    expect(valid).toBeTruthy();
  });

  it('should return false if the number is not divisible by three', () => {
    const validBTS = '4';

    const valid = isBTS(validBTS);

    expect(valid).toBeFalsy();
  });

  it('should return false if the number is not a number', () => {
    const validBTS = 'a';

    const valid = isBTS(validBTS);

    expect(valid).toBeFalsy();
  });

  it('should return false if the input is blank', () => {
    const validBTS = '';

    const valid = isBTS(validBTS);

    expect(valid).toBeFalsy();
  });
});

describe('movRegex', () => {
  it('should match a valid mov value', () => {
    const mov = '4-4';

    expect(isMov(mov)).toBeTruthy();
  });

  it('should not match if the mov is invalid', () => {
    const mov = '4-';

    expect(isMov(mov)).toBeFalsy();
  });

  it('should not match if the mov is invalid', () => {
    const mov = '4-4a';

    expect(isMov(mov)).toBeFalsy();
  });
});

describe('numRegex', () => {
  it('should match only numbers', () => {
    const num = '12';

    expect(isInt(num)).toBeTruthy();
  });

  it('should not match non-numbers', () => {
    const num = 'a';

    expect(isInt(num)).toBeFalsy();
  });

  it('should not match non-numbers', () => {
    const num = '1a';

    expect(isInt(num)).toBeFalsy();
  });
});
