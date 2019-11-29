import React, { useState } from 'react';
import { ManagedContent } from '../../../components/ManagedContent/ManagedContent';
import { WeaponModeForm } from './WeaponModeForm';

export const WeaponMode: React.FC = () => {
  const [warn, setWarn] = useState(false);
  return (
    <ManagedContent
      warn={warn}
      title="Weapon Mode"
      content={() => null}
      form={(closeSideDrawer, onCancel) => (
        <WeaponModeForm
          closeSideDrawer={closeSideDrawer}
          onSubmit={data => console.log(data)}
          onCancel={onCancel}
          onDataChange={isChanged => setWarn(isChanged)}
        />
      )}
    />
  );
};
