import React, { useEffect } from 'react';
import { TwoPaneLayout } from '../../components/Layouts/TwoPaneLayout';
import { routeConfig } from '../routeConfig';
import { useState } from 'react';
import { SpecialRule } from '@anti-materiel/types';
import { useParams, useHistory } from 'react-router-dom';
import { useToast } from '../../components/Toasts/useToast';
import { useDispatch, useSelector } from 'react-redux';
import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../../store/rootReducer';
import isEqual from 'lodash/isEqual';
import sortBy from 'lodash/sortBy';
import {
  updateSpecialRule,
  addSpecialRule,
  removeSpecialRule,
} from '../../store/specialRulesSlice';
import { SidePanelItem } from '../../components/SidePanelItem/SidePanelItem';
import { SpecialRuleInfo } from './SpecialRuleInfo';

const filteredSpecialRulesList = createSelector(
  (state: RootState) => state.specialRules,
  rule => sortBy(rule, ['name']),
);

export const SpecialRuleEditor: React.FC = () => {
  const [specialRule, setSpecialRule] = useState<SpecialRule>();

  const { id: selectedSpecialRuleId } = useParams();
  const history = useHistory();

  const specialRulesList = useSelector(filteredSpecialRulesList);

  const makeToast = useToast();
  const dispatch = useDispatch();

  useEffect(() => {
    const equipment = specialRulesList.find(
      rule => rule.id === selectedSpecialRuleId,
    );

    if (!equipment) {
      setSpecialRule(undefined);
      const redirect = setTimeout(() => {
        selectedSpecialRuleId &&
          history.replace(routeConfig.addSpecialRules.path);
      }, 0);
      return () => clearTimeout(redirect);
    }

    setSpecialRule(equipment);
  }, [history, selectedSpecialRuleId, specialRulesList]);

  const editedSpecialRule = specialRulesList.find(
    rule => rule.id === selectedSpecialRuleId,
  );

  const isEditedSpecialRuleChanged = (): boolean => {
    if (!specialRule) {
      return false;
    }

    return !isEqual(specialRule, editedSpecialRule);
  };

  const isSaveDisabled =
    !specialRule || (!!selectedSpecialRuleId && !isEditedSpecialRuleChanged());

  const shouldPrompt =
    (!selectedSpecialRuleId && !!specialRule) || isEditedSpecialRuleChanged();

  const handleOnSave = (): void => {
    if (!specialRule) {
      return;
    }
    if (selectedSpecialRuleId) {
      dispatch(updateSpecialRule(specialRule));
    } else {
      dispatch(addSpecialRule(specialRule));
    }

    makeToast(`${specialRule.name} has been saved!`);

    setTimeout(() => {
      history.replace(routeConfig.addSpecialRules.path);
    }, 0);
  };

  const handleRemoveSpecialRule = (): void => {
    if (!selectedSpecialRuleId || !editedSpecialRule) {
      return;
    }

    dispatch(removeSpecialRule({ id: selectedSpecialRuleId }));

    makeToast(`${editedSpecialRule.name} has been removed!`, {
      color: 'danger',
    });

    setTimeout(() => {
      history.replace(routeConfig.addSpecialRules.path);
    }, 0);
  };

  return (
    <TwoPaneLayout
      title="Special Rule Editor"
      uri={routeConfig.addSpecialRules.path}
      sidePanelContent={uri => (
        <div>
          {specialRulesList.map(rule => (
            <SidePanelItem
              key={rule.id}
              name={rule.name}
              id={rule.id}
              uri={uri}
            />
          ))}
        </div>
      )}
      mainContent={() => (
        <SpecialRuleInfo
          addSpecialRule={setSpecialRule}
          specialRule={specialRule}
        />
      )}
      isSaveDisabled={isSaveDisabled}
      onSave={handleOnSave}
      isDeleteShown={!!selectedSpecialRuleId}
      onDelete={handleRemoveSpecialRule}
      confirmDeleteText="Are you sure you want to delete this special rule?"
      shouldPromptOnRedirect={shouldPrompt}
    />
  );
};
