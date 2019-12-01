import React, { useState } from 'react';
import { Button } from '../../components/Button/Button';
import { MasterPage } from '../../components/MasterPage/MasterPage';
import { useToast } from '../../components/Toasts/useToast';
import { WeaponInfo } from './WeaponInfo/WeaponInfo';
import { WeaponInfoData } from './WeaponInfo/WeaponInfoTypes';
import { WeaponMode } from './WeaponMode/WeaponMode';
import { WeaponModeData } from './WeaponMode/WeaponModeTypes';
import { Prompt } from 'react-router-dom';
import { convertWeaponDataToWeapon } from './utils';

export const WeaponEditor: React.FC = () => {
  const [weaponInfo, setWeaponInfo] = useState<WeaponInfoData>();
  const [weaponModes, setWeaponModes] = useState<WeaponModeData[]>([]);

  const isSaveDisabled = !weaponInfo || !weaponModes.length;

  const shouldPropmt = !!weaponInfo || !!weaponModes.length;

  const addWeaponInfo = (data: WeaponInfoData): void => {
    setWeaponInfo(data);
  };

  const removeWeaponMode = (modeName: string): void => {
    const updatedModes = weaponModes.filter(
      weaponMode => weaponMode.name !== modeName,
    );

    setWeaponModes(updatedModes);
  };

  const updateWeaponModes = (data: WeaponModeData): void => {
    const isAdded = weaponModes.find(
      weaponMode => weaponMode.name === data.name,
    );

    if (isAdded) {
      const updatedModes = weaponModes.map(weaponMode => {
        if (weaponMode.name === data.name) {
          return data;
        }

        return weaponMode;
      });

      setWeaponModes(updatedModes);
      return;
    }

    setWeaponModes([...weaponModes, data]);
  };

  const handleOnSave = (): void => {
    const weapon = convertWeaponDataToWeapon({
      weaponInfoData: weaponInfo,
      weaponModesData: weaponModes,
    });

    console.log(weapon);

    makeToast('Saved!');
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
            onClick={handleOnSave}
            disabled={isSaveDisabled}
          >
            Save
          </Button>
        )}
        sidePanelContent={() => null}
        mainContent={() => (
          <>
            <WeaponInfo weaponInfo={weaponInfo} addWeaponInfo={addWeaponInfo} />
            <WeaponMode
              weaponModes={weaponModes}
              removeWeaponMode={removeWeaponMode}
              updateWeaponModes={updateWeaponModes}
            />
          </>
        )}
      />
      <Prompt
        when={shouldPropmt}
        message="Are you sure you want to discard changes?"
      />
    </>
  );
};
