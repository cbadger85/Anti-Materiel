import React, { useState } from 'react';
import { Checkbox } from '../../../components/Checkbox/Checkbox';
import { Input } from '../../../components/Input/Input';
import { SideDrawerForm } from '../../../components/SideDrawerForm/SideDrawerForm';
import { useForm } from '../../../hooks/useForm';
import { useOnDataChange } from '../../../hooks/useOnDataChange';
import { isEmpty, isInt } from '../../../utils/formValidators';
import { ItemForm } from './ItemForm';
import { RangeBandForm } from './RangeBandForm';
import './WeaponMode.scss';
import { WeaponModeData } from './WeaponModeTypes';

export const WeaponModeForm: React.FC<WeaponModeFormProps> = ({
  onCancel,
  onSubmit,
  onDataChange,
  initialData,
  closeSideDrawer,
}) => {
  const {
    onChangeInput: onChangeModeInfo,
    fields: modeInfoFields,
    isValid: modeInfoIsValid,
  } = useForm({
    name: initialData ? initialData.name : '',
    damage: initialData ? initialData.damage : '',
    burst: initialData ? initialData.burst : '',
    combinedAmmo: initialData ? initialData.combinedAmmo : false,
  });

  const [ammo, setAmmo] = useState<{ name: string; wikiLink: string }[]>(
    initialData ? initialData.ammo : [],
  );
  const [traits, setTraits] = useState<{ name: string; wikiLink: string }[]>(
    initialData ? initialData.traits : [],
  );

  const {
    onChangeInput: onChangeShortRangeBand,
    fields: shortRangeBandFields,
    isValid: isShortRangeBandFieldValid,
  } = useForm({
    min:
      initialData && initialData.shortRangeBand
        ? initialData.shortRangeBand.min
        : '',
    max:
      initialData && initialData.shortRangeBand
        ? initialData.shortRangeBand.max
        : '',
    rangeBandModifier:
      initialData && initialData.shortRangeBand
        ? initialData.shortRangeBand.rangeBandModifier
        : '',
  });

  const {
    onChangeInput: onChangeMediumRangeBand,
    fields: mediumRangeBandFields,
    isValid: isMediumRangeBandFieldValid,
  } = useForm({
    min:
      initialData && initialData.mediumRangeBand
        ? initialData.mediumRangeBand.min
        : '',
    max:
      initialData && initialData.mediumRangeBand
        ? initialData.mediumRangeBand.max
        : '',
    rangeBandModifier:
      initialData && initialData.mediumRangeBand
        ? initialData.mediumRangeBand.rangeBandModifier
        : '',
  });

  const {
    onChangeInput: onChangeLongRangeBand,
    fields: longRangeBandFields,
    isValid: isLongRangeBandFieldValid,
  } = useForm({
    min:
      initialData && initialData.longRangeBand
        ? initialData.longRangeBand.min
        : '',
    max:
      initialData && initialData.longRangeBand
        ? initialData.longRangeBand.max
        : '',
    rangeBandModifier:
      initialData && initialData.longRangeBand
        ? initialData.longRangeBand.rangeBandModifier
        : '',
  });

  const {
    onChangeInput: onChangeMaximumRangeBand,
    fields: maximumRangeBandFields,
    isValid: isMaximumRangeBandFieldValid,
  } = useForm({
    min:
      initialData && initialData.maximumRangeBand
        ? initialData.maximumRangeBand.min
        : '',
    max:
      initialData && initialData.maximumRangeBand
        ? initialData.maximumRangeBand.max
        : '',
    rangeBandModifier:
      initialData && initialData.maximumRangeBand
        ? initialData.maximumRangeBand.rangeBandModifier
        : '',
  });

  useOnDataChange(
    isChanged => onDataChange(isChanged),
    {
      name: modeInfoFields.name,
      burst: modeInfoFields.burst,
      damage: modeInfoFields.damage,
      combinedAmmo: modeInfoFields.combinedAmmo,
      ammo,
      traits,
      shortRangeBand: shortRangeBandFields,
      mediumRangeBand: mediumRangeBandFields,
      longRangeBand: longRangeBandFields,
      maximumRangeBand: maximumRangeBandFields,
    },
    initialData,
  );

  const handleOnSubmit = (): void => {
    const updatedFields = {
      ...modeInfoFields,
      ammo,
      traits,
      shortRangeBand: shortRangeBandFields,
      mediumRangeBand: mediumRangeBandFields,
      longRangeBand: longRangeBandFields,
      maximumRangeBand: maximumRangeBandFields,
    };

    onSubmit(updatedFields);
    closeSideDrawer();
  };

  const addItem = (
    state: { name: string; wikiLink: string }[],
    setState: (item: { name: string; wikiLink: string }[]) => void,
  ) => (item: { name: string; wikiLink: string }): void => {
    const itemAlreadyAdded = state.find(
      stateItem => stateItem.name === item.name,
    );

    if (itemAlreadyAdded) {
      return;
    }

    setState([...state, item]);
  };

  const removeItem = (
    state: { name: string; wikiLink: string }[],
    setState: (item: { name: string; wikiLink: string }[]) => void,
  ) => (itemName: string): void => {
    const updatedState = state.filter(itemState => itemState.name !== itemName);

    setState(updatedState);
  };

  return (
    <SideDrawerForm
      title="Add Weapon Mode"
      onSubmit={handleOnSubmit}
      onCancel={onCancel}
      disableSubmit={
        !modeInfoIsValid ||
        !traits.length ||
        !isShortRangeBandFieldValid ||
        !isMediumRangeBandFieldValid ||
        !isLongRangeBandFieldValid ||
        !isMaximumRangeBandFieldValid
      }
    >
      <Input
        id="weapon-mode-name"
        name="name"
        label="Name"
        value={modeInfoFields.name}
        onChange={onChangeModeInfo}
        error={isEmpty(modeInfoFields.name)}
        placeholder="D-Charges (CC Mode)"
      />
      <div className="item-form__input-row">
        <Input
          id="weapon-mode-damage"
          name="damage"
          label="Damage"
          value={modeInfoFields.damage}
          onChange={onChangeModeInfo}
          error={isEmpty(modeInfoFields.damage)}
          placeholder="14"
          width="8.5rem"
        />
        <Input
          id="weapon-mode-burst"
          name="burst"
          label="Burst"
          value={modeInfoFields.burst}
          onChange={onChangeModeInfo}
          error={isEmpty(modeInfoFields.burst) || !isInt(modeInfoFields.burst)}
          placeholder="1"
          width="8.5rem"
        />
      </div>
      <ItemForm
        addItem={addItem(ammo, setAmmo)}
        removeItem={removeItem(ammo, setAmmo)}
        items={ammo}
        id="ammo"
        placeholder="EXP"
        className="add-ammo-form"
      />
      <Checkbox
        id="weapon-mode-combined-ammo"
        name="combinedAmmo"
        label="Combined Ammo"
        checked={modeInfoFields.combinedAmmo}
        onChange={onChangeModeInfo}
      />
      <RangeBandForm
        onChange={onChangeShortRangeBand}
        rangeBandFields={shortRangeBandFields}
        range="short"
        placeholder={['0', '8']}
      />
      <RangeBandForm
        onChange={onChangeMediumRangeBand}
        rangeBandFields={mediumRangeBandFields}
        range="medium"
        placeholder={['8', '16']}
        isDisabled={Object.values(shortRangeBandFields).some(
          field => !field.toString().trim(),
        )}
      />
      <RangeBandForm
        onChange={onChangeLongRangeBand}
        rangeBandFields={longRangeBandFields}
        range="long"
        placeholder={['16', '32']}
        isDisabled={Object.values(mediumRangeBandFields).some(
          field => !field.toString().trim(),
        )}
      />
      <RangeBandForm
        onChange={onChangeMaximumRangeBand}
        rangeBandFields={maximumRangeBandFields}
        range="maximum"
        placeholder={['32', '96']}
        isDisabled={Object.values(longRangeBandFields).some(
          field => !field.toString().trim(),
        )}
      />
      <ItemForm
        addItem={addItem(traits, setTraits)}
        removeItem={removeItem(traits, setTraits)}
        items={traits}
        id="traits"
        placeholder="CC"
      />
    </SideDrawerForm>
  );
};

interface WeaponModeFormProps {
  closeSideDrawer: () => void;
  onCancel: () => void;
  onSubmit: (data: WeaponModeData) => void;
  initialData?: WeaponModeData;
  onDataChange: (isChanged: boolean) => void;
}
