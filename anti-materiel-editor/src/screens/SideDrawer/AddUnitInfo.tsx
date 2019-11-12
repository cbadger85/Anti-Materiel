import React from 'react';
import { Input } from '../../components/Input/Input';
import { MultiSelect } from '../../components/MultiSelect/MultiSelect';
import { SectionHeading } from '../../components/SectionHeading/SectionHeading';
import { useForm } from '../../hooks/useForm';
import {
  sectorialSelectOptions,
  unitClassificationSelectOptions,
  unitTypeSelectOptions,
} from './addUnitInfoFormOptions';
import { SideDrawerButtonGroup } from './SideDrawerButtonGroup';
import './SideDrawerContents.scss';
import { Select } from '../../components/Select/Select';
import { AddUnitInfoForm } from '../../types/addUnitTypes';
import uuid from 'uuid/v4';
import kebabCase from 'lodash/kebabCase';

export const AddUnitInfo = (): React.ReactNode => {
  const { state, onChangeInput } = useForm<AddUnitInfoForm>({
    id: uuid(),
    name: '',
    isc: '',
    description: '',
    unitSvgName: '',
    type: '',
    classification: '',
    sectorial: [],
  });

  const handleOnSubmit = () => {
    const updatedState = {
      ...state,
      unitSvgName: kebabCase(state.name),
    };

    console.log(updatedState);
  };

  return (
    <div className="side-drawer-contents__container ">
      <div>
        <SectionHeading color="side-drawer">Add Unit Info</SectionHeading>
        <Input
          id="unit-info-name"
          name="name"
          label="Name"
          value={state.name}
          onChange={onChangeInput}
        />
        <Input
          id="unit-info-isc"
          name="isc"
          label="ISC"
          value={state.isc}
          onChange={onChangeInput}
        />
        <Input
          id="unit-info-description"
          name="description"
          label="Description"
          value={state.description}
          onChange={onChangeInput}
        />
        <Select
          id="unit-info-type"
          name="type"
          label="Type"
          options={unitTypeSelectOptions}
          onChange={onChangeInput}
          selectedValue={state.type}
        />
        <Select
          id="unit-info-classification"
          name="classification"
          label="Classification"
          options={unitClassificationSelectOptions}
          onChange={onChangeInput}
          selectedValue={state.classification}
        />
        <MultiSelect
          id="unit-info-sectorial"
          name="sectorial"
          label="Sectorial"
          options={sectorialSelectOptions}
          list={state.sectorial}
          onChange={onChangeInput}
        />
      </div>

      <SideDrawerButtonGroup onSubmit={handleOnSubmit} />
    </div>
  );
};
