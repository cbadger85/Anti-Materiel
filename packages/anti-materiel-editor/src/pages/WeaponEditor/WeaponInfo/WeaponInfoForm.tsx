import React from 'react';
import { WeaponInfoData } from './WeaponInfoTypes';
import { useForm } from '../../../hooks/useForm';
import uuid from 'uuid/v4';
import { SideDrawerForm } from '../../../components/SideDrawerForm/SideDrawerForm';
import { Input } from '../../../components/Input/Input';
import { useEffect } from 'react';

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

  useEffect(() => {
    const isChanged =
      !initialData && (!!fields.name.trim() || !!fields.wikiLink.trim());

    onDataChange(isChanged);
  }, [fields, initialData, onDataChange]);

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
        error={!fields.name.trim()}
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
