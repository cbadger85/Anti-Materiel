import { Equipment } from '@anti-materiel/types';
import React from 'react';
import uuid from 'uuid/v4';
import { Input } from '../../components/Input/Input';
import { SideDrawerForm } from '../../components/SideDrawerForm/SideDrawerForm';
import { useForm } from '../../hooks/useForm';
import { useOnDataChange } from '../../hooks/useOnDataChange';
import { isEmpty } from '../../utils/formValidators';

export const EquipmentInfoForm: React.FC<EquipmentInfoFormProps> = ({
  onCancel,
  onSubmit,
  onDataChange,
  initialData,
}) => {
  const { onChangeInput, fields, isValid } = useForm({
    name: initialData?.name || '',
    wikiLink: initialData?.wikiLink || '',
  });

  useOnDataChange(
    isChanged => onDataChange(isChanged),
    { ...fields, id: initialData?.id ?? '' },
    initialData,
  );

  const handleOnSubmit = (): void => {
    const updatedFields = {
      ...fields,
      id: initialData && initialData.id ? initialData.id : uuid(),
    };

    onSubmit(updatedFields);
  };

  return (
    <SideDrawerForm
      title="Add Equipment"
      onSubmit={handleOnSubmit}
      onCancel={onCancel}
      disableSubmit={!isValid}
    >
      <Input
        id="equipment-form-name"
        name="name"
        label="Name"
        value={fields.name}
        onChange={onChangeInput}
        error={isEmpty(fields.name)}
        placeholder="Hacking Device"
      />
      <Input
        id="equipment-form-wiki-link"
        name="wikiLink"
        label="Wiki Link"
        value={fields.wikiLink}
        onChange={onChangeInput}
        placeholder="http://infinitythewiki.com/..."
      />
    </SideDrawerForm>
  );
};

interface EquipmentInfoFormProps {
  onCancel: () => void;
  onSubmit: (data: Equipment) => void;
  initialData?: Equipment;
  onDataChange: (isChanged: boolean) => void;
}
