import { createSelector } from '@reduxjs/toolkit';
import isEqual from 'lodash/isEqual';
import sortBy from 'lodash/sortBy';
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Prompt, useParams, useHistory } from 'react-router-dom';
import { Button } from '../../components/Button/Button';
import { MasterPage } from '../../components/MasterPage/MasterPage';
import { useToast } from '../../components/Toasts/useToast';
import { RootState } from '../../store/rootReducer';
import {
  addWeapon,
  updateWeapon,
  removeWeapon,
} from '../../store/weaponsSlice';
import { SidePanelWeaponList } from './SidePanelWeaponList';
import { convertWeaponDataToWeapon, convertWeaponToWeaponData } from './utils';
import { WeaponInfo } from './WeaponInfo/WeaponInfo';
import { WeaponInfoData } from './WeaponInfo/WeaponInfoTypes';
import { WeaponMode } from './WeaponMode/WeaponMode';
import { WeaponModeData } from './WeaponMode/WeaponModeTypes';
import { ConfirmModal } from '../../components/Modal/ConfirmModal';

const filteredWeaponList = createSelector(
  (state: RootState) => state.weapons,
  weapons => sortBy(weapons, ['name']),
);

export const WeaponEditor: React.FC = () => {
  const [weaponInfo, setWeaponInfo] = useState<WeaponInfoData>();
  const [weaponModes, setWeaponModes] = useState<WeaponModeData[]>([]);
  const [isDeleteModalShown, setIsDeleteModalShown] = useState(false);

  const { id: selectedWeaponId } = useParams();
  const history = useHistory();

  const weaponList = useSelector(filteredWeaponList);

  const makeToast = useToast();
  const dispatch = useDispatch();

  useEffect(() => {
    const weapon = weaponList.find(weapon => weapon.id === selectedWeaponId);

    if (!weapon) {
      selectedWeaponId && history.replace('/weapon-editor');
      setWeaponInfo(undefined);
      setWeaponModes([]);
      return;
    }

    const [info, modes] = convertWeaponToWeaponData(weapon);

    setWeaponInfo(info);
    setWeaponModes(modes);
  }, [weaponList, selectedWeaponId, history]);

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

  const removeWeaponMode = (modeName: string): void => {
    const updatedModes = weaponModes.filter(
      weaponMode => weaponMode.name !== modeName,
    );

    setWeaponModes(updatedModes);
  };

  const updateWeaponModes = (data: WeaponModeData): void => {
    const sortedTraits = sortBy(data.traits, ['name']);
    const sortedData = { ...data, traits: sortedTraits };

    const isAdded = weaponModes.find(
      weaponMode => weaponMode.name === data.name,
    );

    if (isAdded) {
      const updatedModes = weaponModes.map(weaponMode => {
        if (weaponMode.name === data.name) {
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
      weaponModesData: weaponModes,
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
    setIsDeleteModalShown(false);

    if (!selectedWeaponId || !editedWeapon) {
      return;
    }

    dispatch(removeWeapon({ id: selectedWeaponId }));

    makeToast(`${editedWeapon.name} has been removed!`, { color: 'danger' });

    history.replace('/weapon-editor');
  };

  return (
    <>
      <MasterPage
        title="Weapons Editor"
        uri="weapon-editor"
        buttonRow={() => (
          <div>
            {!!selectedWeaponId && (
              <Button
                id="weapon-editor-delete-button"
                width="7.5rem"
                color="delete-light"
                onClick={() => setIsDeleteModalShown(true)}
                style={{ marginRight: '1rem' }}
              >
                Delete
              </Button>
            )}
            <Button
              id="weapon-editor-save-button"
              width="7.5rem"
              color="primary"
              onClick={handleOnSave}
              disabled={isSaveDisabled}
            >
              Save
            </Button>
          </div>
        )}
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
      />
      <Prompt
        when={shouldPrompt}
        message="Are you sure you want to discard changes?"
      />
      <ConfirmModal
        isShown={isDeleteModalShown}
        text="Are you want to delete this weapon?"
        onConfirm={handleRemoveWeapon}
        onCancel={() => setIsDeleteModalShown(false)}
      />
    </>
  );
};
