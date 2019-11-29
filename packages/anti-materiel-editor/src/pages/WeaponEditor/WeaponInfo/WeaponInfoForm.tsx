import React from 'react';
import uuid from 'uuid/v4';
import { Input } from '../../../components/Input/Input';
import { SideDrawerForm } from '../../../components/SideDrawerForm/SideDrawerForm';
import { useForm } from '../../../hooks/useForm';
import { useOnDataChange } from '../../../hooks/useOnDataChange';
import { isEmpty } from '../../../utils/formValidators';
import { WeaponInfoData } from './WeaponInfoTypes';

export const WeaponInfoForm: React.FC<WeaponInfoFormProps> = ({
  closeSideDrawer,
  onCancel,
  onSubmit,
  initialData,
  onDataChange,
}) => {
  const { onChangeInput, fields, isValid } = useForm({
    name: initialData ? initialData.name : '',
    wikiLink: initialData ? initialData.wikiLink : '',
  });

  useOnDataChange(
    isChanged => onDataChange(isChanged),
    { ...fields, id: initialData && initialData.id },
    initialData,
  );

  const handleOnSubmit = (): void => {
    const updatedFields = {
      ...fields,
      id: initialData && initialData.id ? initialData.id : uuid(),
    };

    onSubmit(updatedFields);
    closeSideDrawer();
  };

  return (
    <SideDrawerForm
      title="Add Weapon Info"
      onSubmit={handleOnSubmit}
      onCancel={onCancel}
      disableSubmit={!isValid}
    >
      <Input
        id="weapon-info-name"
        name="name"
        label="Name"
        value={fields.name}
        onChange={onChangeInput}
        error={isEmpty(fields.name)}
        placeholder="Combi Rifle"
      />
      <Input
        id="weapon-info-wiki-link"
        name="wikiLink"
        label="Wiki Link"
        value={fields.wikiLink}
        onChange={onChangeInput}
        placeholder="http://infinitythewiki.com/..."
      />
    </SideDrawerForm>
  );
};

interface WeaponInfoFormProps {
  closeSideDrawer: () => void;
  onCancel: () => void;
  onSubmit: (data: WeaponInfoData) => void;
  initialData?: WeaponInfoData;
  onDataChange: (isChanged: boolean) => void;
}
