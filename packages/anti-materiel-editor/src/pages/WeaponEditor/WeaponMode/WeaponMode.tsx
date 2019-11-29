import React, { useState } from 'react';
import { ManagedContent } from '../../../components/ManagedContent/ManagedContent';
import { WeaponModeForm } from './WeaponModeForm';
import { WeaponModeData } from './WeaponModeTypes';

export const WeaponMode: React.FC<WeaponModeProps> = ({
  updateWeaponModes,
  removeWeaponMode,
  weaponModes,
}) => {
  const [warn, setWarn] = useState(false);
  const [selectedWeaponModeName, setSelectedWeaponModeName] = useState<
    string
  >();

  return (
    <ManagedContent
      warn={warn}
      title="Weapon Mode"
      content={openSideDrawer => null}
      form={(closeSideDrawer, onCancel) => (
        <WeaponModeForm
          closeSideDrawer={closeSideDrawer}
          onSubmit={updateWeaponModes}
          onCancel={onCancel}
          onDataChange={isChanged => setWarn(isChanged)}
          initialData={weaponModes.find(
            weaponMode => weaponMode.name === selectedWeaponModeName,
          )}
        />
      )}
    />
  );
};

interface WeaponModeProps {
  weaponModes: WeaponModeData[];
  updateWeaponModes: (data: WeaponModeData) => void;
  removeWeaponMode: (modeName: string) => void;
}
