import { WeaponInfoData } from './WeaponInfo/WeaponInfoTypes';
import { WeaponModeData } from './WeaponMode/WeaponModeTypes';
import {
  Weapon,
  WeaponMode,
  WeaponRangeBand,
  WeaponRange,
} from '@anti-materiel/types';
import { WeaponRangeBand as WeaponRangeBandData } from './WeaponMode/WeaponModeTypes';

export const convertRangeBand = (
  rangeBand: WeaponRangeBandData | undefined,
): WeaponRangeBand | undefined => {
  if (!rangeBand || !rangeBand.min || !rangeBand.max || !rangeBand.modifier) {
    return undefined;
  }

  switch (rangeBand.modifier) {
    case '-6':
      return { min: rangeBand.min, max: rangeBand.max, modifier: '-6' };
    case '-3':
      return { min: rangeBand.min, max: rangeBand.max, modifier: '-3' };
    case '0':
      return { min: rangeBand.min, max: rangeBand.max, modifier: '0' };
    case '+3':
      return { min: rangeBand.min, max: rangeBand.max, modifier: '+3' };
    case '+6':
      return { min: rangeBand.min, max: rangeBand.max, modifier: '+6' };
    default:
      throw new Error('invalid rangeband modifier');
  }
};

export const convertWeaponRange = ({
  short,
  medium,
  long,
  maximum,
}: {
  short?: WeaponRangeBandData;
  medium?: WeaponRangeBandData;
  long?: WeaponRangeBandData;
  maximum?: WeaponRangeBandData;
}): WeaponRange | undefined => {
  const shortRange = convertRangeBand(short);
  const mediumRange = convertRangeBand(medium);
  const longRange = convertRangeBand(long);
  const maximumRange = convertRangeBand(maximum);

  if (!shortRange && !mediumRange && !longRange && !maximumRange) {
    return undefined;
  }

  return {
    short: shortRange,
    medium: mediumRange,
    long: longRange,
    maximum: maximumRange,
  };
};

export const convertWeaponDataToWeapon = ({
  weaponInfoData,
  weaponModesData,
}: {
  weaponInfoData?: WeaponInfoData;
  weaponModesData: WeaponModeData[];
}): Weapon => {
  if (!weaponInfoData) {
    throw new Error('Weapon info is required');
  }

  if (!weaponModesData.length) {
    throw new Error('A weapon mode is required');
  }

  if (!weaponInfoData.id) {
    throw new Error('An ID is required');
  }

  const weaponModes = weaponModesData.map<WeaponMode>(mode => ({
    name: mode.name,
    damage: mode.damage,
    burst: mode.burst,
    combinedAmmo: !!mode.combinedAmmo,
    traits: mode.traits,
    ammo: mode.ammo,
    weaponRange: convertWeaponRange({
      short: mode.shortRangeBand,
      medium: mode.mediumRangeBand,
      long: mode.longRangeBand,
      maximum: mode.maximumRangeBand,
    }),
  }));

  return {
    id: weaponInfoData.id,
    name: weaponInfoData.name,
    wikiLink: weaponInfoData.wikiLink,
    weaponModes,
  };
};

export const convertWeaponRangeData = (
  rangeBand: WeaponRangeBand | undefined,
): { min: string; max: string; modifier: string } => {
  if (!rangeBand) {
    return { min: '', max: '', modifier: '' };
  }

  return rangeBand;
};

export const convertWeaponToWeaponData = (
  weapon: Weapon,
): [WeaponInfoData, WeaponModeData[]] => {
  const { id, name, wikiLink, weaponModes } = weapon;

  const weaponModesData = weaponModes.map<WeaponModeData>(mode => ({
    name: mode.name,
    damage: mode.damage,
    burst: mode.burst,
    combinedAmmo: !!mode.combinedAmmo,
    traits: mode.traits,
    ammo: mode.ammo,
    shortRangeBand: mode.weaponRange
      ? convertWeaponRangeData(mode.weaponRange.short)
      : { min: '', max: '', modifier: '' },
    mediumRangeBand: mode.weaponRange
      ? convertWeaponRangeData(mode.weaponRange.medium)
      : { min: '', max: '', modifier: '' },
    longRangeBand: mode.weaponRange
      ? convertWeaponRangeData(mode.weaponRange.long)
      : { min: '', max: '', modifier: '' },
    maximumRangeBand: mode.weaponRange
      ? convertWeaponRangeData(mode.weaponRange.maximum)
      : { min: '', max: '', modifier: '' },
  }));

  const weaponInfoData = { id, name, wikiLink };

  return [weaponInfoData, weaponModesData];
};
