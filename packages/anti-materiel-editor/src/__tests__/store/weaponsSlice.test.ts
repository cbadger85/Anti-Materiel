import weaponsSlice, {
  addWeapon,
  updateWeapon,
  removeWeapon,
  loadWeapons,
} from '../../store/weaponsSlice';
import { Weapon } from '@anti-materiel/types';

const weapon1: Weapon = {
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

const weapon2: Weapon = {
  name: 'baz',
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

describe('weaponsSlice', () => {
  describe('addWeapon', () => {
    it('should add a weapon', () => {
      const updatedWeaponList = weaponsSlice([], {
        type: addWeapon.type,
        payload: weapon1,
      });

      expect(updatedWeaponList).toEqual([weapon1]);
    });
  });

  describe('updateWeapon', () => {
    it('should update a weapon if it already exists in the list', () => {
      const updatedWeaponList = weaponsSlice([weapon1], {
        type: updateWeapon.type,
        payload: weapon2,
      });

      expect(updatedWeaponList).toEqual([weapon2]);
    });

    it('should not update the weapon list if the weapon does not exist', () => {
      const updatedWeapon = { ...weapon1, id: '12345' };

      const updatedWeaponList = weaponsSlice([weapon1], {
        type: updateWeapon.type,
        payload: updatedWeapon,
      });

      expect(updatedWeaponList).toEqual([weapon1]);
    });
  });

  describe('removeWeapon', () => {
    it('should remove a weapon from the list', () => {
      const updatedWeaponList = weaponsSlice([weapon1], {
        type: removeWeapon.type,
        payload: { id: weapon1.id },
      });

      expect(updatedWeaponList).toEqual([]);
    });
  });

  describe('loadWeapons', () => {
    it('should load replace state with an array of weapons', () => {
      const updatedWeaponList = weaponsSlice([], {
        type: loadWeapons.type,
        payload: [weapon1, weapon2],
      });

      expect(updatedWeaponList).toEqual([weapon1, weapon2]);
    });
  });
});
