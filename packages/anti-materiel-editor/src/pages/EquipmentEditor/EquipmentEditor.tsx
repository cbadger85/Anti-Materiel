import React, { useEffect } from 'react';
import { TwoPaneLayout } from '../../components/Layouts/TwoPaneLayout';
import { routeConfig } from '../routeConfig';
import { EquipmentInfo } from './EquipmentInfo';
import { useState } from 'react';
import { Equipment } from '@anti-materiel/types';
import { useParams, useHistory } from 'react-router-dom';
import { useToast } from '../../components/Toasts/useToast';
import { useDispatch, useSelector } from 'react-redux';
import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../../store/rootReducer';
import isEqual from 'lodash/isEqual';
import sortBy from 'lodash/sortBy';
import {
  updateEquipment,
  addEquipment,
  removeEquipment,
} from '../../store/equipmentSlice';
import { SidePanelItem } from '../../components/SidePanelItem/SidePanelItem';

const filteredEquipmentList = createSelector(
  (state: RootState) => state.equipment,
  equipment => sortBy(equipment, ['name']),
);

export const EquipmentEditor: React.FC = () => {
  const [equipment, setEquipment] = useState<Equipment>();

  const { id: selectedEquipmentId } = useParams();
  const history = useHistory();

  const equipmentList = useSelector(filteredEquipmentList);

  const makeToast = useToast();
  const dispatch = useDispatch();

  useEffect(() => {
    const equipment = equipmentList.find(
      equipment => equipment.id === selectedEquipmentId,
    );

    if (!equipment) {
      setEquipment(undefined);
      const redirect = setTimeout(() => {
        selectedEquipmentId && history.replace(routeConfig.addEquipment.path);
      }, 0);
      return () => clearTimeout(redirect);
    }

    setEquipment(equipment);
  }, [equipmentList, history, selectedEquipmentId]);

  const editedEquipment = equipmentList.find(
    equipment => equipment.id === selectedEquipmentId,
  );

  const isEditedEquipmentChanged = (): boolean => {
    if (!equipment) {
      return false;
    }

    return !isEqual(equipment, editedEquipment);
  };

  const isSaveDisabled =
    !equipment || (!!selectedEquipmentId && !isEditedEquipmentChanged());

  const shouldPrompt =
    (!selectedEquipmentId && !!equipment) || isEditedEquipmentChanged();

  const handleOnSave = (): void => {
    if (!equipment) {
      return;
    }
    if (selectedEquipmentId) {
      dispatch(updateEquipment(equipment));
    } else {
      dispatch(addEquipment(equipment));
    }

    makeToast(`${equipment.name} has been saved!`);

    setTimeout(() => {
      history.replace(routeConfig.addEquipment.path);
    }, 0);
  };

  const handleRemoveEquipment = (): void => {
    if (!selectedEquipmentId || !editedEquipment) {
      return;
    }

    dispatch(removeEquipment({ id: selectedEquipmentId }));

    makeToast(`${editedEquipment.name} has been removed!`, { color: 'danger' });

    setTimeout(() => {
      history.replace(routeConfig.addEquipment.path);
    }, 0);
  };

  return (
    <TwoPaneLayout
      title="Equipment Editor"
      uri={routeConfig.addEquipment.path}
      sidePanelContent={uri => (
        <div>
          {equipmentList.map(eq => (
            <SidePanelItem key={eq.id} name={eq.name} id={eq.id} uri={uri} />
          ))}
        </div>
      )}
      mainContent={() => (
        <EquipmentInfo addEquipment={setEquipment} equipment={equipment} />
      )}
      isSaveDisabled={isSaveDisabled}
      onSave={handleOnSave}
      isDeleteShown={!!selectedEquipmentId}
      onDelete={handleRemoveEquipment}
      confirmDeleteText="Are you sure you want to delete this equipment?"
      shouldPromptOnRedirect={shouldPrompt}
    />
  );
};
