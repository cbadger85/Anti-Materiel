import React from 'react';
import uuid from 'uuid/v4';
import { SpecialRule } from '@anti-materiel/types';
import { useForm } from '../../hooks/useForm';
import { useOnDataChange } from '../../hooks/useOnDataChange';
import { SideDrawerForm } from '../../components/SideDrawerForm/SideDrawerForm';
import { Input } from '../../components/Input/Input';
import { isEmpty } from '../../utils/formValidators';
import { MultiSelect } from '../../components/MultiSelect/MultiSelect';
import { skillTypeFormOptions } from '../../utils/skillTypeFormOptions';

export const SpecialRuleInfoForm: React.FC<SpecialRulesInfoFormProps> = ({
  onCancel,
  onSubmit,
  onDataChange,
  initialData,
}) => {
  const { onChangeInput, fields, isValid } = useForm({
    name: initialData?.name || '',
    wikiLink: initialData?.wikiLink || '',
    skillType: initialData?.skillType || [],
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
      title="Add Special Rule"
      onSubmit={handleOnSubmit}
      onCancel={onCancel}
      disableSubmit={!isValid}
    >
      <Input
        id="special-rules-form-name"
        name="name"
        label="Name"
        value={fields.name}
        onChange={onChangeInput}
        error={isEmpty(fields.name)}
        placeholder="CH: Mimetism"
      />
      <Input
        id="special-rules-form-wiki-link"
        name="wikiLink"
        label="Wiki Link"
        value={fields.wikiLink}
        onChange={onChangeInput}
        placeholder="http://infinitythewiki.com/..."
      />
      <MultiSelect
        name="skillType"
        label="Skill Type"
        onChange={onChangeInput}
        list={fields.skillType}
        options={skillTypeFormOptions}
        error={fields.skillType.length <= 0}
      />
    </SideDrawerForm>
  );
};

interface SpecialRulesInfoFormProps {
  onCancel: () => void;
  onSubmit: (data: SpecialRule) => void;
  onDataChange: (isChanged: boolean) => void;
  initialData?: SpecialRule;
}
