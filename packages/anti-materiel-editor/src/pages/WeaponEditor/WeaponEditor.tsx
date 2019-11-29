import React, { useState } from 'react';
import { Button } from '../../components/Button/Button';
import { MasterPage } from '../../components/MasterPage/MasterPage';
import { useToast } from '../../components/Toasts/useToast';
import { WeaponInfo } from './WeaponInfo/WeaponInfo';
import { WeaponInfoData } from './WeaponInfo/WeaponInfoTypes';
import { WeaponMode } from './WeaponMode/WeaponMode';
import { WeaponModeData } from './WeaponMode/WeaponModeTypes';

export const WeaponEditor: React.FC = () => {
  const [weaponInfo, setWeaponInfo] = useState<WeaponInfoData>();
  const [weaponModes, setWeaponModes] = useState<WeaponModeData[]>([]);

  const addWeaponInfo = (data: WeaponInfoData): void => {
    setWeaponInfo(data);
  };

  const addWeaponMode = (data: WeaponModeData): void => {
    setWeaponModes([...weaponModes, data]);
  };

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
        mainContent={() => (
          <>
            <WeaponInfo weaponInfo={weaponInfo} addWeaponInfo={addWeaponInfo} />
            <WeaponMode />
          </>
        )}
      />
    </>
  );
};
