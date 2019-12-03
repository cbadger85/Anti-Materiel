import { createSelector } from '@reduxjs/toolkit';
import isEqual from 'lodash/isEqual';
import sortBy from 'lodash/sortBy';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { MasterPage } from '../../components/MasterPage/MasterPage';
import { useToast } from '../../components/Toasts/useToast';
import { RootState } from '../../store/rootReducer';
import {
  addWeapon,
  removeWeapon,
  updateWeapon,
} from '../../store/weaponsSlice';
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

  const { id: selectedWeaponId } = useParams();
  const history = useHistory();

  const weaponList = useSelector(filteredWeaponList);

  const makeToast = useToast();
  const dispatch = useDispatch();

  useEffect(() => {
    const weapon = weaponList.find(weapon => weapon.id === selectedWeaponId);

    if (!weapon) {
      setWeaponInfo(undefined);
      setWeaponModes([]);
      const redirect = setTimeout(() => {
        selectedWeaponId && history.replace('/weapon-editor');
      }, 0);
      return () => clearTimeout(redirect);
    }

    const [info, modes] = convertWeaponToWeaponData(weapon);

    setWeaponInfo(info);
    setWeaponModes(modes);
  }, [weaponList, selectedWeaponId, history]);

  const editedWeapon = weaponList.find(
    weapon => weapon.id === selectedWeaponId,
  );

  const hasDuplicateNames = (): boolean => {
    const modeNames = weaponModes.map(mode => mode.name);

    return new Set(modeNames).size !== weaponModes.length;
  };

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
    hasDuplicateNames() ||
    (!!selectedWeaponId && !isEditedWeaponChanged());

  const shouldPrompt =
    (!selectedWeaponId && (!!weaponInfo || !!weaponModes.length)) ||
    isEditedWeaponChanged();

  const removeWeaponMode = (id: string): void => {
    const updatedModes = weaponModes.filter(weaponMode => weaponMode.id !== id);

    setWeaponModes(updatedModes);
  };

  const updateWeaponModes = (data: WeaponModeData): void => {
    const sortedTraits = sortBy(data.traits, ['name']);
    const sortedData = { ...data, traits: sortedTraits };

    const isAdded = weaponModes.find(weaponMode => weaponMode.id === data.id);

    if (isAdded) {
      const updatedModes = weaponModes.map(weaponMode => {
        if (weaponMode.id === data.id) {
          return sortedData;
        }

        return weaponMode;
      });

      setWeaponModes(updatedModes);
      return;
    }

    setWeaponModes([...weaponModes, sortedData]);
  };

  const handleOnSave = (): void => {
    const weapon = convertWeaponDataToWeapon({
      weaponInfoData: weaponInfo,
      weaponModesData: sortBy(weaponModes, ['name']),
    });

    if (selectedWeaponId) {
      dispatch(updateWeapon(weapon));
    } else {
      dispatch(addWeapon(weapon));
    }

    makeToast(`${weapon.name} has been saved!`);

    setTimeout(() => {
      history.replace('/weapon-editor');
    }, 0);
  };

  const handleRemoveWeapon = (): void => {
    if (!selectedWeaponId || !editedWeapon) {
      return;
    }

    dispatch(removeWeapon({ id: selectedWeaponId }));

    makeToast(`${editedWeapon.name} has been removed!`, { color: 'danger' });

    setTimeout(() => {
      history.replace('/weapon-editor');
    }, 0);
  };

  return (
    <MasterPage
      title="Weapons Editor"
      uri="weapon-editor"
      sidePanelContent={uri => (
        <SidePanelWeaponList uri={uri} weaponList={weaponList} />
      )}
      mainContent={() => (
        <>
          <WeaponInfo weaponInfo={weaponInfo} addWeaponInfo={setWeaponInfo} />
          <WeaponMode
            weaponModes={weaponModes}
            removeWeaponMode={removeWeaponMode}
            updateWeaponModes={updateWeaponModes}
          />
        </>
      )}
      isSaveDisabled={isSaveDisabled}
      onSave={handleOnSave}
      isDeleteShown={!!selectedWeaponId}
      onDelete={handleRemoveWeapon}
      confirmDeleteText={`Are you want to delete ${
        editedWeapon ? editedWeapon.name : 'this weapon?'
      }`}
      shouldPromptOnRedirect={shouldPrompt}
    />
  );
};
