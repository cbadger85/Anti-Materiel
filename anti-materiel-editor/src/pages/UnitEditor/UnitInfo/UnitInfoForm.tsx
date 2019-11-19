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
import { UnitInfoData } from './UnitInfoTypes';
import { useToast } from '../../../components/Toasts/useToast';

export const UnitInfoForm: React.FC<UnitInfoFormProps> = ({
  closeSideDrawer,
  onSubmit,
  onCancel,
  initialData,
}) => {
  const { onChangeInput, fields, isValid } = useForm({
    name: initialData ? initialData.name : '',
    isc: initialData ? initialData.isc : '',
    description: initialData ? initialData.description : '',
    type: initialData ? initialData.type : '',
    classification: initialData ? initialData.classification : '',
    sectorial:
      initialData && initialData.sectorial.length ? initialData.sectorial : [],
  });

  const makeToast = useToast();

  const handleOnSubmit = (): void => {
    const updatedFields = {
      ...fields,
      unitSvgName: kebabCase(fields.name),
      id: initialData && initialData.id ? initialData.id : uuid(),
    };

    onSubmit(updatedFields);
    // closeSideDrawer();
    makeToast('Is this a toast?');
  };

  return (
    <SideDrawerForm
      title="Add Unit Info"
      onSubmit={handleOnSubmit}
      onCancel={onCancel}
      disableSubmit={!isValid}
    >
      <Input
        id="unit-info-name"
        name="name"
        label="Name"
        value={fields.name}
        onChange={onChangeInput}
        error={!fields.name.trim()}
        placeholder="Fusiliers"
      />
      <Input
        id="unit-info-isc"
        name="isc"
        label="ISC"
        value={fields.isc}
        onChange={onChangeInput}
        error={!fields.isc.trim()}
        placeholder="Fusiliers"
      />
      <Input
        id="unit-info-description"
        name="description"
        label="Description"
        value={fields.description}
        onChange={onChangeInput}
        placeholder="Notes..."
      />
      <Select
        id="unit-info-type"
        name="type"
        label="Type"
        options={unitTypeSelectOptions}
        onChange={onChangeInput}
        selectedValue={fields.type}
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

interface UnitInfoFormProps {
  closeSideDrawer: () => void;
  onCancel: () => void;
  onSubmit: (data: UnitInfoData) => void;
  initialData?: UnitInfoData;
}
