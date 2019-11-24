import React from 'react';
import { ManagedContent } from '../../../components/ManagedContent/ManagedContent';
import { WeaponInfoForm } from './WeaponInfoForm';

export const WeaponInfo: React.FC = () => {
  return (
    <ManagedContent
      title="Weapon Info"
      content={() => null}
      form={(closeSideDrawer, onCancel) => (
        <WeaponInfoForm
          closeSideDrawer={closeSideDrawer}
          onCancel={onCancel}
          onSubmit={data => console.log(data)}
        />
      )}
    />
  );
};
