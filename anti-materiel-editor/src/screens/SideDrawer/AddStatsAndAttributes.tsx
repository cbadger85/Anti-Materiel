import React, { useState } from 'react';
import { Checkbox } from '../../components/Checkbox/Checkbox';
import { Input } from '../../components/Input/Input';
import { SectionHeading } from '../../components/SectionHeading/SectionHeading';
import { Select } from '../../components/Select/Select';
import { useForm } from '../../hooks/useForm';
import {
  cubeTypeOptions,
  impetuousTypeOptions,
} from './addStatsAndAttributesFormOptions';
import { AddUnitAVA } from './AddUnitAVA';
import { SideDrawerButtonGroup } from './SideDrawerButtonGroup';

export const AddStatsAndAttributes = (): React.ReactNode => {
  const statInputWidth = '3rem';

  const { fields, onChangeInput, isValid } = useForm({
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

  const regex = new RegExp(/(0-9]-[0-9])/);

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

  const updateAvaList = (newAva: { ava: string; sectorial: string }[]) => {
    setAva(newAva);
  };

  const isNumber = (number: unknown): number is number => {
    if (typeof number === 'string') {
      return !isNaN(parseInt(number, 10));
    }

    if (typeof number === 'number') {
      return true;
    }

    return false;
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
            value={fields.mov}
            error={!fields.mov.trim() && !regex.test(fields.mov)}
          />
          <Input
            id="unit-info-cc"
            name="cc"
            label="CC"
            onChange={onChangeInput}
            width={statInputWidth}
            className="side-drawer-contents__stat-input"
            value={fields.cc}
            error={!fields.cc.trim() || !isNumber(fields.cc)}
          />
          <Input
            id="unit-info-bs"
            name="bs"
            label="BS"
            onChange={onChangeInput}
            width={statInputWidth}
            className="side-drawer-contents__stat-input"
            value={fields.bs}
            error={!fields.bs.trim() || !isNumber(fields.bs)}
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
            error={!fields.ph.trim() || !isNumber(fields.ph)}
          />
          <Input
            id="unit-info-wip"
            name="wip"
            label="WIP"
            onChange={onChangeInput}
            width={statInputWidth}
            className="side-drawer-contents__stat-input"
            value={fields.wip}
            error={!fields.wip.trim() || !isNumber(fields.wip)}
          />
          <Input
            id="unit-info-arm"
            name="arm"
            label="ARM"
            onChange={onChangeInput}
            width={statInputWidth}
            className="side-drawer-contents__stat-input"
            value={fields.arm}
            error={!fields.arm.trim() || !isNumber(fields.arm)}
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
            error={!fields.bts.trim() || !isNumber(fields.bts)}
          />
          <Input
            id="unit-info-w"
            name="w"
            label={fields.structure ? 'STR' : 'W'}
            onChange={onChangeInput}
            width={statInputWidth}
            className="side-drawer-contents__stat-input"
            value={fields.w}
            error={!fields.w.trim() || !isNumber(fields.w)}
          />
          <Input
            id="unit-info-s"
            name="s"
            label="S"
            onChange={onChangeInput}
            width={statInputWidth}
            className="side-drawer-contents__stat-input"
            value={fields.s}
            error={!fields.s.trim() || !isNumber(fields.s)}
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
      </div>
      <SideDrawerButtonGroup
        onSubmit={() => console.log({ ...fields, ava })}
        isDisabled={!isValid || !ava.length}
      />
    </div>
  );
};
