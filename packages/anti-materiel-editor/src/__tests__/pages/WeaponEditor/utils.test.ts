import {
  convertRangeBand,
  convertWeaponRange,
  convertWeaponDataToWeapon,
  convertWeaponToWeaponData,
} from '../../../pages/WeaponEditor/utils';

describe('WeaponEditor/utils', () => {
  describe('convertRangeBand', () => {
    it('should return undefined if there are empty strings', () => {
      const rangeBand = { min: '', max: '', modifier: '' };

      const convertedRangeBand = convertRangeBand(rangeBand);

      expect(convertedRangeBand).toBe(undefined);
    });

    it('should return undefined if given undefined', () => {
      const convertedRangeBand = convertRangeBand(undefined);

      expect(convertedRangeBand).toBe(undefined);
    });

    it('should act as a typeguard for the modifier: -6', () => {
      const rangeBand = { min: '0', max: '8', modifier: '-6' };

      const convertedRangeBand = convertRangeBand(rangeBand);

      expect(convertedRangeBand).toEqual(rangeBand);
    });

    it('should act as a typeguard for the modifier: -3', () => {
      const rangeBand = { min: '0', max: '8', modifier: '-3' };

      const convertedRangeBand = convertRangeBand(rangeBand);

      expect(convertedRangeBand).toEqual(rangeBand);
    });

    it('should act as a typeguard for the modifier: 0', () => {
      const rangeBand = { min: '0', max: '8', modifier: '0' };

      const convertedRangeBand = convertRangeBand(rangeBand);

      expect(convertedRangeBand).toEqual(rangeBand);
    });

    it('should act as a typeguard for the modifier: +3', () => {
      const rangeBand = { min: '0', max: '8', modifier: '+3' };

      const convertedRangeBand = convertRangeBand(rangeBand);

      expect(convertedRangeBand).toEqual(rangeBand);
    });

    it('should act as a typeguard for the modifier: +6', () => {
      const rangeBand = { min: '0', max: '8', modifier: '+6' };

      const convertedRangeBand = convertRangeBand(rangeBand);

      expect(convertedRangeBand).toEqual(rangeBand);
    });

    it('should throw an error if the modifier is invalid', () => {
      const rangeBand = { min: '0', max: '8', modifier: '-5' };

      expect(() => convertRangeBand(rangeBand)).toThrowError();
    });
  });

  describe('converWeaponRange', () => {
    it('should return undefined if all the inputs are undefined', () => {
      const convertedWeaponRange = convertWeaponRange({
        short: undefined,
        medium: undefined,
        long: undefined,
        maximum: undefined,
      });

      expect(convertedWeaponRange).toBe(undefined);
    });

    it('should return a WeaponRange object if at least one of the inputs are not undefined', () => {
      const shortRangeBand = { min: '0', max: '8', modifier: '0' };

      const convertedWeaponRange = convertWeaponRange({
        short: shortRangeBand,
        medium: undefined,
        long: undefined,
        maximum: undefined,
      });

      expect(convertedWeaponRange).toEqual({
        short: shortRangeBand,
        medium: undefined,
        long: undefined,
        maximum: undefined,
      });
    });
  });

  describe('convertWeaponDataToWeapon', () => {
    it('should convert weapon form data to a WeaponObject', () => {
      const weaponInfo = { id: '1234', name: 'foo' };
      const weaponModes = [
        {
          name: 'bar',
          damage: '1',
          burst: '2',
          ammo: [],
          combinedAmmo: false,
          traits: [],
        },
      ];

      const weapon = convertWeaponDataToWeapon({
        weaponInfoData: weaponInfo,
        weaponModesData: weaponModes,
      });

      const expectedWeapon = {
        name: 'foo',
        id: '1234',
        wikiLink: undefined,
        weaponModes: [
          {
            name: 'bar',
            damage: '1',
            burst: '2',
            ammo: [],
            combinedAmmo: false,
            traits: [],
            weaponRange: undefined,
          },
        ],
      };

      expect(weapon).toEqual(expectedWeapon);
    });

    it('should throw an error if weaponInfoData is undefined', () => {
      const weaponModes = [
        {
          name: 'bar',
          damage: '1',
          burst: '2',
          ammo: [],
          combinedAmmo: false,
          traits: [],
        },
      ];

      expect(() =>
        convertWeaponDataToWeapon({
          weaponInfoData: undefined,
          weaponModesData: weaponModes,
        }),
      ).toThrowError();
    });

    it('should throw an error if weaponModesData is an empty array', () => {
      const weaponInfo = { id: '1234', name: 'foo' };

      expect(() =>
        convertWeaponDataToWeapon({
          weaponInfoData: weaponInfo,
          weaponModesData: [],
        }),
      ).toThrowError();
    });

    it('should throw an error if weaponInfo does not have an ID', () => {
      const weaponInfo = { name: 'foo' };
      const weaponModes = [
        {
          name: 'bar',
          damage: '1',
          burst: '2',
          ammo: [],
          combinedAmmo: false,
          traits: [],
        },
      ];

      expect(() =>
        convertWeaponDataToWeapon({
          weaponInfoData: weaponInfo,
          weaponModesData: weaponModes,
        }),
      ).toThrowError();
    });
  });

  describe('convertWeaponToWeaponData', () => {
    it('should convert a Weapon object to weapon form data if ranges are undefined', () => {
      const weapon = {
        name: 'foo',
        id: '1234',
        wikiLink: undefined,
        weaponModes: [
          {
            name: 'bar',
            damage: '1',
            burst: '2',
            ammo: [],
            combinedAmmo: false,
            traits: [],
            weaponRange: undefined,
          },
        ],
      };

      const weaponData = convertWeaponToWeaponData(weapon);

      const weaponInfoData = { id: '1234', name: 'foo', wikiLink: undefined };

      const weaponModesData = [
        {
          name: 'bar',
          damage: '1',
          burst: '2',
          ammo: [],
          combinedAmmo: false,
          traits: [],
          shortRangeBand: undefined,
          mediumRangeBand: undefined,
          longRangeBand: undefined,
          maxiumumRangeBand: undefined,
        },
      ];

      const expectedWeaponData = [weaponInfoData, weaponModesData];

      expect(weaponData).toEqual(expectedWeaponData);
    });

    it('should convert a Weapon object to weapon form data if ranges are not undefined', () => {
      const weapon = {
        name: 'foo',
        id: '1234',
        wikiLink: undefined,
        weaponModes: [
          {
            name: 'bar',
            damage: '1',
            burst: '2',
            ammo: [],
            combinedAmmo: false,
            traits: [],
            weaponRange: {
              short: { min: '0', max: '8', modifier: '+3' },
              medium: { min: '8', max: '24', modifier: '-3' },
              long: undefined,
              maximum: undefined,
            },
          },
        ],
      };

      const weaponData = convertWeaponToWeaponData(weapon as any);

      const weaponInfoData = { id: '1234', name: 'foo', wikiLink: undefined };

      const weaponModesData = [
        {
          name: 'bar',
          damage: '1',
          burst: '2',
          ammo: [],
          combinedAmmo: false,
          traits: [],
          shortRangeBand: { min: '0', max: '8', modifier: '+3' },
          mediumRangeBand: { min: '8', max: '24', modifier: '-3' },
          longRangeBand: undefined,
          maxiumumRangeBand: undefined,
        },
      ];

      const expectedWeaponData = [weaponInfoData, weaponModesData];

      expect(weaponData).toEqual(expectedWeaponData);
    });
  });
});
