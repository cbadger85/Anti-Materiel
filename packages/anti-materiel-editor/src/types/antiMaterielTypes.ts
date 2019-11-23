export type ArmyType =
  | "PanOceania"
  | "Yu Jing"
  | "Ariadna"
  | "Haqqislam"
  | "Nomads"
  | "Combined Army"
  | "ALEPH"
  | "Tohaa"
  | "Non-Aligned Armies"
  | "O-12"
  | "NA-2 Mercenaries";

export type Sectorial =
  | "PanOceania"
  | "Shock Army of Acontecimento"
  | "Military Orders"
  | "Neoterran Capitaline Army"
  | "Varuna Immediate Reaction Division"
  | "Yu Jing"
  | "Imperial Service"
  | "Invincible Army"
  | "Ariadna"
  | "Caledonian Highlander Army"
  | "Force de Résponse Rapide Merovingienne"
  | "USAriadna Ranger Force"
  | "Tartary Army Corps"
  | "Haqqislam"
  | "Qapu Khalqi"
  | "Ramah Taskforce"
  | "Nomads"
  | "Jurisdicitonial Command of Corregidor"
  | "Jurisdicitonial Command of Bakunin"
  | "Jurisdicitonial Command of Tunguska"
  | "Combined Army"
  | "Morat Agression Force"
  | "Shasvastii Expeditionary Force"
  | "Onyx Contact Force"
  | "ALEPH"
  | "Steel Phalanx"
  | "Operations Subsection of the S.S.S."
  | "Tohaa"
  | "Druze Bayram Security"
  | "Japanese Secessionist Army"
  | "Ikari Company"
  | "Starco. Free Company of the Star"
  | "Spiral Corps"
  | "Foreign Company"
  | "Dahshat Company"
  | "O-12";

export type UnitType = "LI" | "MI" | "HI" | "REM" | "SK" | "WB" | "TAG";

export type UnitClassification =
  | "Line Troop"
  | "Veteran Troop"
  | "Garrison Troop"
  | "Mechanized Troop"
  | "Elite Troop"
  | "Headquarters Troop"
  | "Spec. Trained Troop"
  | "Support Troop"
  | "Character"
  | "Mercanary Troop";

export enum ImpetuousType {
  FRENZY = "FRENZY",
  IMPETUOUS = "IMPETUOUS",
  EXTREMELY_IMPETUOUS = "EXTREMELY_IMPETUOUS"
}

export enum CubeType {
  CUBE = "CUBE",
  CUBE_2 = "CUBE_2"
}

export type MovValue = "4-4" | "4-2" | "6-4" | "6-6" | "6-2" | "8-4" | "8-6";

export interface WikiInfo {
  id: string;
  name: string;
  wikiLink: string;
}

export type SkillType =
  | "Short Skill"
  | "ARO"
  | "Automatic Skill"
  | "Entire Order";

export interface SpecialRule extends WikiInfo {
  skillType: SkillType[];
}

export interface Equipment extends WikiInfo {}

export enum RangeBandModifier {
  PLUS_THREE,
  ZERO,
  MINUS_THREE
}

export interface WeaponRangeBand {
  min: number;
  max: number;
  modifier: RangeBandModifier;
}

export interface WeaponRange {
  short?: WeaponRangeBand;
  medium?: WeaponRangeBand;
  long?: WeaponRangeBand;
  maximum?: WeaponRangeBand;
}

export interface AmmoType extends WikiInfo {}

export interface WeaponTrait extends WikiInfo {}

export enum WeaponType {
  RANGED,
  CC
}

export interface WeaponMode {
  id: string;
  name: string;
  rule: string;
  weaponRange?: WeaponRange;
  damage: number;
  burst: number;
  ammo: AmmoType[];
  traits: WeaponTrait[];
  type: WeaponType;
}

export interface Weapon extends WikiInfo {
  weaponModes: WeaponMode[];
}

export type HackingRange = "Hacking Area" | "Table" | "User" | "Base Contact";

export interface HackingProgram extends WikiInfo {
  range: HackingRange;
  attackerModifier: number;
  opponentModifier: number;
  damage: number;
  burst: number;
  ammo: AmmoType;
  target: string;
  effect: string;
  skillType: SkillType[];
  special: string;
}

export interface Availability {
  ava: number;
  sectorial: Sectorial;
}

export interface Note {
  id: string;
  note: string;
  sectorial: Sectorial[];
}

export interface SecondaryUnitStats {
  name: string;
  id: string;
  mov: MovValue;
  cc: string;
  bs: string;
  ph: string;
  wip: string;
  arm: string;
  bts: string;
  w: string;
  s: string;
  specialRulesById: string[];
  EquipmentById: string[];
  bswById: string[];
  ccwById: string[];
  structure?: boolean;
  notes: Note[];
}

export interface AttachedGSyncUnit {
  id: string;
  GSyncUnitId: string;
  quantity: number;
}

export interface UnitProfile {
  id: string;
  name: string;
  cost: number;
  swc: number;
  specialRulesById: string[];
  equipmentById: string[];
  bswById: string[];
  ccwById: string[];
  sectorial: Sectorial[];
  hackingProgramsById: string[];
  notes: string[];
  attachedGsyncUnit?: AttachedGSyncUnit;
}

export interface GSyncProfile {
  id: string;
  name: string;
  cost: number;
  swc: number;
  specialRulesById: string[];
  equipmentById: string[];
  bswById: string[];
  ccwById: string[];
  hackingProgramsById: string[];
}

export interface GSyncUnit {
  id: string;
  name: string;
  unitSvgName: string;
  mov: MovValue;
  cc: string;
  bs: string;
  ph: string;
  wip: string;
  arm: string;
  bts: string;
  w: string;
  s: string;
  structure?: boolean;
  specialRulesById: string[];
  EquipmentById: string[];
  gSyncProfiles: GSyncProfile[];
  notes: Note[];
}

export interface ArmyListUnitAndStats {
  id: string;
  name: string;
  isc: string;
  description: string;
  sectorial: Sectorial[];
  unitSvgName: string;
  classification: UnitClassification;
  type: UnitType;
  impetuous?: ImpetuousType;
  cube?: CubeType;
  mov: MovValue;
  cc: string;
  bs: string;
  ph: string;
  wip: string;
  arm: string;
  bts: string;
  w: string;
  s: string;
  structure?: boolean;
  ava: Availability;
  specialRulesById: string[];
  EquipmentById: string[];
  notes: Note[];
  secondaryStats?: SecondaryUnitStats;
  gSync: GSyncUnit[];
  unitProfiles: UnitProfile[];
}

export interface ArmyListUnitWithRelatedUnits {
  name: string;
  isc: string;
  description: string;
  sectorial: Sectorial[];
  unitSvgName: string;
  unitProfiles: UnitProfile[]; // for combined units like zoe ∏-well
  // seperate?: boolean; //? what was this for?
  relatedProfilesById: RelatedUnits[];
  notes: Note[];
  type?: UnitType;
  classification?: UnitClassification;
}

export interface RelatedUnits {
  primary?: boolean;
  relatedProfilesById: string;
}

export type ArmyListUnit = ArmyListUnitAndStats | ArmyListUnitWithRelatedUnits;
