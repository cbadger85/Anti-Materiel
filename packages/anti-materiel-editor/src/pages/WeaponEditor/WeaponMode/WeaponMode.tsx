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
  const [selectedWeaponModeId, setSelectedWeaponModeId] = useState<string>();

  return (
    <ManagedContent
      warn={warn}
      title="Weapon Mode"
      content={openSideDrawer => (
        <WeaponModesContent
          weaponModes={weaponModes}
          editWeaponMode={id => {
            setSelectedWeaponModeId(id);
            openSideDrawer();
          }}
          removeWeaponMode={removeWeaponMode}
        />
      )}
      form={(closeSideDrawer, onCancel) => (
        <WeaponModeForm
          onCancel={onCancel}
          onSubmit={data => {
            updateWeaponModes(data);
            closeSideDrawer();
          }}
          onDataChange={isChanged => setWarn(isChanged)}
          initialData={weaponModes.find(
            weaponMode => weaponMode.id === selectedWeaponModeId,
          )}
        />
      )}
      onCloseSideDrawer={() => setSelectedWeaponModeId(undefined)}
    />
  );
};

interface WeaponModeProps {
  weaponModes: WeaponModeData[];
  updateWeaponModes: (data: WeaponModeData) => void;
  removeWeaponMode: (id: string) => void;
}
