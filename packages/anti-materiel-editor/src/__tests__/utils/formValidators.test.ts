import { isBTS, isMov, isInt, isValidRange } from '../../utils/formValidators';

describe('formValidators', () => {
  describe('isBTS', () => {
    it('should return true if the number is divisible by 3', () => {
      expect(isBTS('0')).toBe(true);
      expect(isBTS('3')).toBe(true);
      expect(isBTS('6')).toBe(true);
      expect(isBTS('9')).toBe(true);
    });

    it('should return false if the number is not divisible by three', () => {
      expect(isBTS('4')).toBe(false);
      expect(isBTS('13')).toBe(false);
      expect(isBTS('16')).toBe(false);
      expect(isBTS('22')).toBe(false);
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

  describe('isValidRange', () => {
    it('should be true if the range is divisible by 8', () => {
      expect(isValidRange('0')).toBe(true);
      expect(isValidRange('8')).toBe(true);
      expect(isValidRange('16')).toBe(true);
      expect(isValidRange('32')).toBe(true);
    });

    it('should be false if the range is not divisible by 8', () => {
      expect(isValidRange('1')).toBe(false);
      expect(isValidRange('14')).toBe(false);
      expect(isValidRange('47')).toBe(false);
      expect(isValidRange('100')).toBe(false);
    });
  });
});
