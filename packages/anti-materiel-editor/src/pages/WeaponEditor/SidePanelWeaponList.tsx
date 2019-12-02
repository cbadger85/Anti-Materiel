import { Weapon } from '@anti-materiel/types';
import React from 'react';
import { SidePanelItem } from '../../components/SidePanelItem/SidePanelItem';

export const SidePanelWeaponList: React.FC<SidePanelWeaponListProps> = ({
  editWeapon,
  weaponList,
}) => {
  return (
    <div>
      {weaponList.map(weapon => (
        <SidePanelItem
          key={weapon.id}
          name={weapon.name}
          onClick={() => editWeapon(weapon.id)}
        />
      ))}
    </div>
  );
};

interface SidePanelWeaponListProps {
  editWeapon: (id: string) => void;
  weaponList: Weapon[];
}
