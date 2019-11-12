import React, { useState } from 'react';
import { Checkbox } from '../../components/Checkbox/Checkbox';
import { Input } from '../../components/Input/Input';
import { SectionHeading } from '../../components/SectionHeading/SectionHeading';
import { Select } from '../../components/Select/Select';
import { useForm } from '../../hooks/useForm';
import { AddStatsAndAttributesForm } from '../../types/addUnitTypes';
import {
  cubeTypeOptions,
  impetuousTypeOptions,
} from './addStatsAndAttributesFormOptions';
import { AddUnitAVA } from './AddUnitAVA';
import { SideDrawerButtonGroup } from './SideDrawerButtonGroup';

export const AddStatsAndAttributes = (): React.ReactNode => {
  const statInputWidth = '3rem';

  const { state, onChangeInput } = useForm<AddStatsAndAttributesForm>({
    impetuous: false,
    impetuousType: '',
    cube: false,
    cubeType: '',
    mov: '',
    cc: '',
    bs: '',
    ph: '',
    wip: '',
    arm: '',
    bts: '',
    w: '',
    s: '',
    structure: false,
  });
  const [ava, setAva] = useState<{ ava: string; sectorial: string }[]>([]);

  const addUnitAva = (availability: { ava: string; sectorial: string }) => {
    if (!availability.ava || !availability.sectorial) {
      return;
    }

    const avaAlreadyAdded = ava.find(
      unitAva => unitAva.sectorial === availability.sectorial,
    );

    if (avaAlreadyAdded) {
      return;
    }

    setAva(state => [...state, availability]);
  };

  const removeUnitAva = (availability: { ava: string; sectorial: string }) => {
    const updatedAva = ava.filter(
      unitAva => unitAva.sectorial !== availability.sectorial,
    );

    setAva(updatedAva);
  };

  return (
    <div className="side-drawer-contents__container ">
      <div style={{ height: '100%' }}>
        <SectionHeading color="side-drawer">
          Add Unit Stats and Attributes
        </SectionHeading>
        <div className="side-drawer-contents__stat-input-row side-drawer-contents__stat-input-row--first">
          <Input
            id="unit-info-mov"
            name="mov"
            label="MOV"
            onChange={onChangeInput}
            className="side-drawer-contents__stat-input"
            width={statInputWidth}
            value={state.mov}
          />
          <Input
            id="unit-info-cc"
            name="cc"
            label="CC"
            onChange={onChangeInput}
            width={statInputWidth}
            className="side-drawer-contents__stat-input"
            value={state.cc}
          />
          <Input
            id="unit-info-bs"
            name="bs"
            label="BS"
            onChange={onChangeInput}
            width={statInputWidth}
            className="side-drawer-contents__stat-input"
            value={state.bs}
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
            value={state.ph}
          />
          <Input
            id="unit-info-wip"
            name="wip"
            label="WIP"
            onChange={onChangeInput}
            width={statInputWidth}
            className="side-drawer-contents__stat-input"
            value={state.wip}
          />
          <Input
            id="unit-info-arm"
            name="arm"
            label="ARM"
            onChange={onChangeInput}
            width={statInputWidth}
            className="side-drawer-contents__stat-input"
            value={state.arm}
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
            value={state.bts}
          />
          <Input
            id="unit-info-w"
            name="w"
            label={state.structure ? 'STR' : 'W'}
            onChange={onChangeInput}
            width={statInputWidth}
            className="side-drawer-contents__stat-input"
            value={state.w}
          />
          <Input
            id="unit-info-s"
            name="s"
            label="S"
            onChange={onChangeInput}
            width={statInputWidth}
            className="side-drawer-contents__stat-input"
            value={state.s}
          />
        </div>
        <Checkbox
          name="structure"
          onChange={onChangeInput}
          label="Structure"
          checked={state.structure}
        />
        <div className="side-drawer-contents__stat-input-row">
          <Checkbox
            name="impetuous"
            onChange={onChangeInput}
            label="Impetuous"
            checked={state.impetuous}
          />
          <Select
            id="unit-info-impetuous-type"
            name="impetuousType"
            label="Impetuous Type"
            options={impetuousTypeOptions}
            onChange={onChangeInput}
            isDisabled={!state.impetuous}
            selectedValue={state.impetuousType}
          />
        </div>
        <div className="side-drawer-contents__stat-input-row">
          <Checkbox
            name="cube"
            onChange={onChangeInput}
            label="Cube"
            checked={state.cube}
            className="checkbox--cube"
          />
          <Select
            id="unit-info-impetuous-type"
            name="cubeType"
            label="Cube Type"
            options={cubeTypeOptions}
            onChange={onChangeInput}
            isDisabled={!state.cube}
            selectedValue={state.cubeType}
          />
        </div>
        <AddUnitAVA
          addUnitAva={addUnitAva}
          removeUnitAva={removeUnitAva}
          ava={ava}
        />
      </div>
      <SideDrawerButtonGroup onSubmit={() => console.log({ ...state, ava })} />
    </div>
  );
};
