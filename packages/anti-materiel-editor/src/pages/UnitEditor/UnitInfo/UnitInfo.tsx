import React from 'react';
import { ManagedContent } from '../../../components/ManagedContent/ManagedContent';
import { UnitInfoForm } from './UnitInfoForm';

export const UnitInfo: React.FC = () => {
  return (
    <ManagedContent
      title="Unit Info"
      content={() => null}
      form={(closeSideDrawer, onCancel) => (
        <UnitInfoForm
          onSubmit={data => {
            console.log(data);
            closeSideDrawer();
          }}
          onCancel={onCancel}
        />
      )}
    />
  );
};
