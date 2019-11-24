import React from 'react';
import { MasterPage } from '../../components/MasterPage/MasterPage';
import { Button } from '../../components/Button/Button';
import { useToast } from '../../components/Toasts/useToast';
import { WeaponInfo } from './WeaponInfo/WeaponInfo';

export const WeaponEditor: React.FC = () => {
  const makeToast = useToast();
  return (
    <>
      <MasterPage
        title="Weapons Editor"
        buttonRow={() => (
          <Button
            width="7.5rem"
            color="primary"
            onClick={() => makeToast('Saved!')}
          >
            Save
          </Button>
        )}
        sidePanelContent={() => null}
        mainContent={() => <WeaponInfo />}
      />
    </>
  );
};
