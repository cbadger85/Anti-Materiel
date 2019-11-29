import React, { useState } from 'react';
import { ManagedContent } from '../../../components/ManagedContent/ManagedContent';
import { WeaponInfoForm } from './WeaponInfoForm';
import { WeaponInfoData } from './WeaponInfoTypes';
import { WeaponInfoContent } from './WeaponInfoContent';

export const WeaponInfo: React.FC<WeaponInfoProps> = ({
  weaponInfo,
  addWeaponInfo,
}) => {
  const [warn, setWarn] = useState(false);

  return (
    <ManagedContent
      edit={!!weaponInfo}
      warn={warn}
      title="Weapon Info"
      content={() => <WeaponInfoContent weaponInfo={weaponInfo} />}
      form={(closeSideDrawer, onCancel) => (
        <WeaponInfoForm
          closeSideDrawer={closeSideDrawer}
          onCancel={onCancel}
          onSubmit={addWeaponInfo}
          onDataChange={setWarn}
          initialData={weaponInfo}
        />
      )}
    />
  );
};

interface WeaponInfoProps {
  weaponInfo?: WeaponInfoData;
  addWeaponInfo: (data: WeaponInfoData) => void;
}
