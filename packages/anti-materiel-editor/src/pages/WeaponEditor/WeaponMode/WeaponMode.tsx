import React, { useState } from 'react';
import { ManagedContent } from '../../../components/ManagedContent/ManagedContent';
import { WeaponModeForm } from './WeaponModeForm';
import { WeaponModeData } from './WeaponModeTypes';
import { WeaponModesContent } from './WeaponModesContent';

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
      content={openSideDrawer => (
        <WeaponModesContent
          weaponModes={weaponModes}
          editWeaponMode={modeName => {
            setSelectedWeaponModeName(modeName);
            openSideDrawer();
          }}
          removeWeaponMode={removeWeaponMode}
        />
      )}
      form={(closeSideDrawer, onCancel) => (
        <WeaponModeForm
          closeSideDrawer={closeSideDrawer}
          onCancel={onCancel}
          onSubmit={updateWeaponModes}
          onDataChange={isChanged => setWarn(isChanged)}
          initialData={weaponModes.find(
            weaponMode => weaponMode.name === selectedWeaponModeName,
          )}
        />
      )}
      onCloseSideDrawer={() => setSelectedWeaponModeName(undefined)}
    />
  );
};

interface WeaponModeProps {
  weaponModes: WeaponModeData[];
  updateWeaponModes: (data: WeaponModeData) => void;
  removeWeaponMode: (modeName: string) => void;
}
