import { Weapon } from '@anti-materiel/types';
import React from 'react';
import { SidePanelItem } from '../../components/SidePanelItem/SidePanelItem';

export const SidePanelWeaponList: React.FC<SidePanelWeaponListProps> = ({
  weaponList,
  uri,
}) => {
  return (
    <div>
      {weaponList.map(weapon => (
        <SidePanelItem
          key={weapon.id}
          name={weapon.name}
          uri={uri}
          id={weapon.id}
        />
      ))}
    </div>
  );
};

interface SidePanelWeaponListProps {
  weaponList: Weapon[];
  uri: string;
}
