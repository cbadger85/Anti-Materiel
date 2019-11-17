import React, { useState } from 'react';
import { Checkbox } from '../../../components/Checkbox/Checkbox';
import { Input } from '../../../components/Input/Input';
import { Select } from '../../../components/Select/Select';
import { SideDrawerForm } from '../../../components/SideDrawerForm/SideDrawerForm';
import { useForm } from '../../../hooks/useForm';
import {
  cubeTypeOptions,
  impetuousTypeOptions,
} from './StatsAndAttributesFormOptions';
import { AddUnitAVA } from './AddUnitAva/AddUnitAVA';
import './StatsAndAttributesForm.scss';
import { StatsAndAttributesFormData } from './StatsAndAttributesTypes';

export const StatsAndAttributesForm: React.FC<StatsAndAttributesFormProps> = ({
  closeSideDrawer,
  onSubmit,
  initialData,
}) => {
  const statInputWidth = '3rem';

  const { fields, onChangeInput, isValid } = useForm({
    impetuous: initialData ? initialData.impetuous : false,
    impetuousType: initialData ? initialData.impetuousType : '',
    cube: initialData ? initialData.cube : false,
    cubeType: initialData ? initialData.cubeType : '',
    mov: initialData ? initialData.mov : '',
    cc: initialData ? initialData.cc : '',
    bs: initialData ? initialData.bs : '',
    ph: initialData ? initialData.ph : '',
    wip: initialData ? initialData.wip : '',
    arm: initialData ? initialData.arm : '',
    bts: initialData ? initialData.bts : '',
    w: initialData ? initialData.w : '',
    s: initialData ? initialData.s : '',
    structure: initialData ? initialData.structure : false,
  });
  const [ava, setAva] = useState<{ ava: string; sectorial: string }[]>(
    initialData && initialData.ava.length ? initialData.ava : [],
  );

  const movRegex = new RegExp(/^([0-9]-[0-9])*$/);

  const numberRegex = new RegExp(/^[0-9]*$/);

  const addUnitAva = (availability: {
    ava: string;
    sectorial: string;
  }): void => {
    const avaAlreadyAdded = ava.find(
      unitAva => unitAva.sectorial === availability.sectorial,
    );

    if (avaAlreadyAdded) {
      return;
    }

    setAva(state => [...state, availability]);
  };

  const removeUnitAva = (availability: {
    ava: string;
    sectorial: string;
  }): void => {
    const updatedAva = ava.filter(
      unitAva => unitAva.sectorial !== availability.sectorial,
    );

    setAva(updatedAva);
  };

  const updateAvaList = (
    newAva: { ava: string; sectorial: string }[],
  ): void => {
    setAva(newAva);
  };

  const isBTS = (bts: string): boolean => {
    const btsNum = parseInt(bts, 10);

    return btsNum % 3 === 0;
  };

  const handleOnSubmit = (): void => {
    onSubmit({ ...fields, ava: [...ava] });
  };

  return (
    <SideDrawerForm
      title="Add Unit Stats and Attributes"
      onSubmit={handleOnSubmit}
      disableSubmit={!isValid || !ava.length}
      onCancel={closeSideDrawer}
    >
      <div className="side-drawer-contents__stat-input-row side-drawer-contents__stat-input-row--first">
        <Input
          id="unit-info-mov"
          name="mov"
          label="MOV"
          onChange={onChangeInput}
          className="side-drawer-contents__stat-input"
          width={statInputWidth}
          value={fields.mov}
          error={!movRegex.test(fields.mov)}
          placeholder="4-4"
        />
        <Input
          id="unit-info-cc"
          name="cc"
          label="CC"
          onChange={onChangeInput}
          width={statInputWidth}
          className="side-drawer-contents__stat-input"
          value={fields.cc}
          error={!numberRegex.test(fields.cc)}
          placeholder="13"
        />
        <Input
          id="unit-info-bs"
          name="bs"
          label="BS"
          onChange={onChangeInput}
          width={statInputWidth}
          className="side-drawer-contents__stat-input"
          value={fields.bs}
          error={!numberRegex.test(fields.bs)}
          placeholder="12"
        />
      </div>
      <div className="side-drawer-contents__stat-input-row">
        <Input
          id="unit-info-ph"
          name="ph"
          label="PH"
          onChange={onChangeInput}
          width={statInputWidth}
          className="side-drawer-contents__stat-input"
          value={fields.ph}
          error={!numberRegex.test(fields.ph)}
          placeholder="10"
        />
        <Input
          id="unit-info-wip"
          name="wip"
          label="WIP"
          onChange={onChangeInput}
          width={statInputWidth}
          className="side-drawer-contents__stat-input"
          value={fields.wip}
          error={!numberRegex.test(fields.wip)}
          placeholder="12"
        />
        <Input
          id="unit-info-arm"
          name="arm"
          label="ARM"
          onChange={onChangeInput}
          width={statInputWidth}
          className="side-drawer-contents__stat-input"
          value={fields.arm}
          error={!numberRegex.test(fields.arm)}
          placeholder="1"
        />
      </div>
      <div className="side-drawer-contents__stat-input-row">
        <Input
          id="unit-info-bts"
          name="bts"
          label="BTS"
          onChange={onChangeInput}
          width={statInputWidth}
          className="side-drawer-contents__stat-input"
          value={fields.bts}
          error={!numberRegex.test(fields.bts) || !isBTS(fields.bts)}
          placeholder="3"
        />
        <Input
          id="unit-info-w"
          name="w"
          label={fields.structure ? 'STR' : 'W'}
          onChange={onChangeInput}
          width={statInputWidth}
          className="side-drawer-contents__stat-input"
          value={fields.w}
          error={!numberRegex.test(fields.w)}
          placeholder="1"
        />
        <Input
          id="unit-info-s"
          name="s"
          label="S"
          onChange={onChangeInput}
          width={statInputWidth}
          className="side-drawer-contents__stat-input"
          value={fields.s}
          error={!numberRegex.test(fields.s)}
          placeholder="2"
        />
      </div>
      <Checkbox
        name="structure"
        onChange={onChangeInput}
        label="Structure"
        checked={fields.structure}
      />
      <div className="side-drawer-contents__stat-input-row">
        <Checkbox
          name="impetuous"
          onChange={onChangeInput}
          label="Impetuous"
          checked={fields.impetuous}
        />
        <Select
          id="unit-info-impetuous-type"
          name="impetuousType"
          label="Impetuous Type"
          options={impetuousTypeOptions}
          onChange={onChangeInput}
          isDisabled={!fields.impetuous}
          selectedValue={fields.impetuousType}
          error={fields.impetuous ? !fields.impetuousType.trim() : undefined}
        />
      </div>
      <div className="side-drawer-contents__stat-input-row">
        <Checkbox
          name="cube"
          onChange={onChangeInput}
          label="Cube"
          checked={fields.cube}
          className="checkbox--cube"
        />
        <Select
          id="unit-info-impetuous-type"
          name="cubeType"
          label="Cube Type"
          options={cubeTypeOptions}
          onChange={onChangeInput}
          isDisabled={!fields.cube}
          selectedValue={fields.cubeType}
          error={fields.cube ? !fields.cubeType.trim() : undefined}
        />
      </div>
      <AddUnitAVA
        addUnitAva={addUnitAva}
        removeUnitAva={removeUnitAva}
        updateAvaList={updateAvaList}
        ava={ava}
      />
    </SideDrawerForm>
  );
};

interface StatsAndAttributesFormProps {
  closeSideDrawer: () => void;
  onSubmit: (data: StatsAndAttributesFormData) => void;
  initialData?: StatsAndAttributesFormData;
}
