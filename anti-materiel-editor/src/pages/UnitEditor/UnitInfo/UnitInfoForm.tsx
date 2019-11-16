import kebabCase from 'lodash/kebabCase';
import React from 'react';
import uuid from 'uuid/v4';
import { Input } from '../../../components/Input/Input';
import { MultiSelect } from '../../../components/MultiSelect/MultiSelect';
import { Select } from '../../../components/Select/Select';
import { SideDrawerForm } from '../../../components/SideDrawerForm/SideDrawerForm';
import { useForm } from '../../../hooks/useForm';
import {
  sectorialSelectOptions,
  unitClassificationSelectOptions,
  unitTypeSelectOptions,
} from './UnitInfoFormOptions';

export const AddUnitInfo: React.FC<AddUnitInfoProps> = ({
  closeSideDrawer,
}) => {
  const { onChangeInput, fields, isValid } = useForm({
    name: '',
    isc: '',
    description: '',
    type: '',
    classification: '',
    sectorial: [],
  });

  const handleOnSubmit = (): void => {
    const updatedFields = {
      ...fields,
      unitSvgName: kebabCase(fields.name),
      id: uuid(),
    };
    console.log(updatedFields);
  };

  return (
    <SideDrawerForm
      title="Add Unit Info"
      onSubmit={handleOnSubmit}
      onCancel={closeSideDrawer}
      disableSubmit={!isValid}
    >
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
    </SideDrawerForm>
  );
};

interface AddUnitInfoProps {
  closeSideDrawer: () => void;
}
