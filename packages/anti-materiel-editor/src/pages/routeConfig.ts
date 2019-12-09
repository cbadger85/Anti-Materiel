import { Index } from './Index';
import { UnitEditor } from './UnitEditor/UnitEditor';
import { WeaponEditor } from './WeaponEditor/WeaponEditor';
import { EquipmentEditor } from './EquipmentEditor/EquipmentEditor';

export const routeConfig = {
  index: {
    path: '/',
    component: Index,
  },
  addUnit: {
    path: '/units',
    component: UnitEditor,
  },
  editUnit: {
    path: '/units/:id',
    component: UnitEditor,
  },
  addWeapon: {
    path: '/weapons',
    component: WeaponEditor,
  },
  editWeapon: {
    path: '/weapons/:id',
    component: WeaponEditor,
  },
  addEquipment: {
    path: '/equipment',
    component: EquipmentEditor,
  },
  editEquipment: {
    path: '/equipment/:id',
    component: EquipmentEditor,
  },
};
