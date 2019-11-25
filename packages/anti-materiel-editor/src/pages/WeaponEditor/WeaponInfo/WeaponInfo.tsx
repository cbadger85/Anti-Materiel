import React, { useState } from 'react';
import { ManagedContent } from '../../../components/ManagedContent/ManagedContent';
import { WeaponInfoForm } from './WeaponInfoForm';

export const WeaponInfo: React.FC = () => {
  const [warn, setWarn] = useState(false);

  const handleOnDataChange = (isChanged: boolean): void => {
    setWarn(isChanged);
  };

  return (
    <ManagedContent
      warn={warn}
      title="Weapon Info"
      content={() => null}
      form={(closeSideDrawer, onCancel) => (
        <WeaponInfoForm
          closeSideDrawer={closeSideDrawer}
          onCancel={onCancel}
          onSubmit={data => console.log(data)}
          onDataChange={handleOnDataChange}
        />
      )}
      onClearForm={() => {
        setWarn(false);
      }}
    />
  );
};
