import { Index } from './Index';
import { UnitEditor } from './UnitEditor/UnitEditor';
import { WeaponEditor } from './WeaponEditor/WeaponEditor';

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
};
