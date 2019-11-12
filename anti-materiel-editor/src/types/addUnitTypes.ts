import { Sectorial, UnitClassification, UnitType } from './antiMaterielTypes';

/*
export interface ArmyListUnitAndStats {
  imp?: ImpetuousType;
  cube?: cubeType;
  mov: MovValue;
  cc: number;
  bs: number;
  ph: number;
  wip: number;
  arm: number;
  bts: number;
  w: number;
  s: number;
  structure?: boolean;
  ava: Availability;
  specialRulesById: string[];
  EquipmentById: string[];
  notes: Note[];
  secondaryStats?: SecondaryUnitStats;
  gSync: GSyncUnit[];
  unitProfiles: UnitProfile[];
}
*/

export interface AddUnitInfoForm {
  id: string;
  name: string;
  isc: string;
  description: string;
  type: string;
  classification: string;
  sectorial: string[];
  unitSvgName: string;
}

export interface AddStatsAndAttributesForm {
  impetuous: boolean;
  impetuousType: string;
  cube: boolean;
  cubeType: string;
  mov: string;
  cc: string;
  bs: string;
  ph: string;
  wip: string;
  arm: string;
  bts: string;
  w: string;
  s: string;
  structure: boolean;
}
