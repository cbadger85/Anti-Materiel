export interface WeaponModeData {
  id: string;
  name: string;
  damage: string;
  burst: string;
  ammo: { name: string; wikiLink?: string }[];
  combinedAmmo: boolean;
  traits: { name: string; wikiLink?: string }[];
  shortRangeBand: WeaponRangeBand;
  mediumRangeBand: WeaponRangeBand;
  longRangeBand: WeaponRangeBand;
  maximumRangeBand: WeaponRangeBand;
}

export interface WeaponRangeBand {
  min: string;
  max: string;
  modifier: string;
}
