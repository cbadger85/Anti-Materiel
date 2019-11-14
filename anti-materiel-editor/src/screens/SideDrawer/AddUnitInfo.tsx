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
import uuid from 'uuid/v4';
import kebabCase from 'lodash/kebabCase';

export const AddUnitInfo = (): React.ReactNode => {
  const { onChangeInput, fields, isValid } = useForm({
    name: '',
    isc: '',
    description: '',
    type: '',
    classification: '',
    sectorial: [],
  });

  const handleOnSubmit = () => {
    const updatedFields = {
      ...fields,
      unitSvgName: kebabCase(fields.name),
      id: uuid(),
    };
    console.log(updatedFields);
  };

  return (
    <div className="side-drawer-contents__container ">
      <div>
        <SectionHeading color="side-drawer">Add Unit Info</SectionHeading>
        <Input
          id="unit-info-name"
          name="name"
          label="Name"
          value={fields.name}
          onChange={onChangeInput}
          error={!fields.name.trim()}
        />
        <Input
          id="unit-info-isc"
          name="isc"
          label="ISC"
          value={fields.isc}
          onChange={onChangeInput}
          error={!fields.isc.trim()}
        />
        <Input
          id="unit-info-description"
          name="description"
          label="Description"
          value={fields.description}
          onChange={onChangeInput}
        />
        <Select
          id="unit-info-type"
          name="type"
          label="Type"
          options={unitTypeSelectOptions}
          onChange={onChangeInput}
          selectedValue={fields.type}
          error={!fields.type.trim()}
        />
        <Select
          id="unit-info-classification"
          name="classification"
          label="Classification"
          options={unitClassificationSelectOptions}
          onChange={onChangeInput}
          selectedValue={fields.classification}
          error={!fields.classification.trim()}
        />
        <MultiSelect
          id="unit-info-sectorial"
          name="sectorial"
          label="Sectorial"
          options={sectorialSelectOptions}
          list={fields.sectorial}
          onChange={onChangeInput}
          error={!fields.sectorial.length}
        />
      </div>

      <SideDrawerButtonGroup onSubmit={handleOnSubmit} isDisabled={!isValid} />
    </div>
  );
};
