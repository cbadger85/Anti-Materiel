import { createSelector } from '@reduxjs/toolkit';
import isEqual from 'lodash/isEqual';
import sortBy from 'lodash/sortBy';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Prompt } from 'react-router-dom';
import { Button } from '../../components/Button/Button';
import { MasterPage } from '../../components/MasterPage/MasterPage';
import { useToast } from '../../components/Toasts/useToast';
import { RootState } from '../../store/rootReducer';
import { addWeapon, updateWeapon } from '../../store/weaponsSlice';
import { SidePanelWeaponList } from './SidePanelWeaponList';
import { convertWeaponDataToWeapon, convertWeaponToWeaponData } from './utils';
import { WeaponInfo } from './WeaponInfo/WeaponInfo';
import { WeaponInfoData } from './WeaponInfo/WeaponInfoTypes';
import { WeaponMode } from './WeaponMode/WeaponMode';
import { WeaponModeData } from './WeaponMode/WeaponModeTypes';

const filteredWeaponList = createSelector(
  (state: RootState) => state.weapons,
  weapons => sortBy(weapons, ['name']),
);

export const WeaponEditor: React.FC = () => {
  const [weaponInfo, setWeaponInfo] = useState<WeaponInfoData>();
  const [weaponModes, setWeaponModes] = useState<WeaponModeData[]>([]);
  const [selectedWeaponId, setSelectedWeaponId] = useState<string>();

  const weaponList = useSelector(filteredWeaponList);

  const dispatch = useDispatch();

  const editedWeapon = weaponList.find(
    weapon => weapon.id === selectedWeaponId,
  );

  const isEditedWeaponChanged = (): boolean => {
    if (!weaponInfo || !weaponModes.length) {
      return false;
    }

    const weapon = convertWeaponDataToWeapon({
      weaponInfoData: weaponInfo,
      weaponModesData: weaponModes,
    });

    const isWeaponsEqual = !isEqual(weapon, editedWeapon);

    return isWeaponsEqual;
  };

  const isSaveDisabled =
    !weaponInfo ||
    !weaponModes.length ||
    (!!selectedWeaponId && !isEditedWeaponChanged());

  const shouldPrompt =
    (!selectedWeaponId && (!!weaponInfo || !!weaponModes.length)) ||
    isEditedWeaponChanged();

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

    if (selectedWeaponId) {
      dispatch(updateWeapon(weapon));
    } else {
      dispatch(addWeapon(weapon));
    }

    setSelectedWeaponId(undefined);
    setWeaponInfo(undefined);
    setWeaponModes([]);

    makeToast('Saved!');
  };

  const handleEditWeapon = (id: string): void => {
    const weapon = weaponList.find(weapon => weapon.id === id);

    if (!weapon) {
      return;
    }

    const [info, modes] = convertWeaponToWeaponData(weapon);
    setSelectedWeaponId(weapon.id);
    setWeaponInfo(info);
    setWeaponModes(modes);
  };

  const makeToast = useToast();
  return (
    <>
      <MasterPage
        title="Weapons Editor"
        buttonRow={() => (
          <Button
            id="weapon-editor-save-button"
            width="7.5rem"
            color="primary"
            onClick={handleOnSave}
            disabled={isSaveDisabled}
          >
            Save
          </Button>
        )}
        sidePanelContent={() => (
          <SidePanelWeaponList
            weaponList={weaponList}
            editWeapon={handleEditWeapon}
          />
        )}
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
        when={shouldPrompt}
        message="Are you sure you want to discard changes?"
      />
    </>
  );
};
