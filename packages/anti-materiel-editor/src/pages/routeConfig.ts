import { Index } from './Index';
import { UnitEditor } from './UnitEditor/UnitEditor';
import { WeaponEditor } from './WeaponEditor/WeaponEditor';
import { EquipmentEditor } from './EquipmentEditor/EquipmentEditor';
import { SpecialRuleEditor } from './SpecialRulesEditor/SpecialRuleEditor';
import { HackingProgramsEditor } from './HackingProgramsEditor/HackingProgramsEditor';
import { PherowareTacticsEditor } from './PherowareTacticsEditor/PherowareTacticsEditor';

export const routeConfig = {
  index: {
    name: undefined,
    path: '/',
    component: Index,
  },
  addUnit: {
    name: 'Units',
    path: '/units',
    component: UnitEditor,
  },
  editUnit: {
    name: 'Units',
    path: '/units/:id',
    component: UnitEditor,
  },
  addWeapon: {
    name: 'Weapons',
    path: '/weapons',
    component: WeaponEditor,
  },
  editWeapon: {
    name: 'Weapons',
    path: '/weapons/:id',
    component: WeaponEditor,
  },
  addEquipment: {
    name: 'Equipment',
    path: '/equipment',
    component: EquipmentEditor,
  },
  editEquipment: {
    name: 'Equipment',
    path: '/equipment/:id',
    component: EquipmentEditor,
  },
  addSpecialRules: {
    name: 'Special Rules',
    path: '/special-rules',
    component: SpecialRuleEditor,
  },
  editSpecialRules: {
    name: 'Special Rules',
    path: '/special-rules/:id',
    component: SpecialRuleEditor,
  },
  addHackingPrograms: {
    name: 'Hacking Programs',
    path: '/hacking-programs',
    component: HackingProgramsEditor,
  },
  editHackingPrograms: {
    name: 'Hacking Programs',
    path: '/hacking-programs/:id',
    component: HackingProgramsEditor,
  },
  addPherowareTactics: {
    name: 'Pheroware Tactics',
    path: '/pheroware-tactics',
    component: PherowareTacticsEditor,
  },
  editPherowareTactics: {
    name: 'Pheroware Tactics',
    path: '/pheroware-tactics/:id',
    component: PherowareTacticsEditor,
  },
};
