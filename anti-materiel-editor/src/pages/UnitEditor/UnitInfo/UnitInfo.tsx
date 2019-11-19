import React from 'react';
import { ManagedContent } from '../../../components/ManagedContent/ManagedContent';
import { UnitInfoForm } from './UnitInfoForm';
import { Button } from '../../../components/Button/Button';
import { useToast } from '../../../components/Toasts/useToast';

export const UnitInfo: React.FC = () => {
  const makeToast = useToast();
  return (
    <ManagedContent
      title="Unit Info"
      content={() => (
        <Button onClick={() => makeToast(`Everyday I'm toasting...`)}>
          Toast
        </Button>
      )}
      form={(hideSideBar, onCancel) => (
        <UnitInfoForm
          closeSideDrawer={hideSideBar}
          onSubmit={data => console.log(data)}
          onCancel={onCancel}
        />
      )}
    />
  );
};
