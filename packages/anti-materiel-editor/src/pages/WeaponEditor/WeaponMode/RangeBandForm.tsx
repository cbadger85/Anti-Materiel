import React from 'react';
import { rangBandModifierOptions } from './WeaponModeFormOptions';
import { FormValue } from '../../../hooks/useForm.types';
import { Select } from '../../../components/Select/Select';
import { Input } from '../../../components/Input/Input';
import { isEmpty, isInt } from '../../../utils/formValidators';

export const RangeBandForm: React.FC<RangeBandFormProps> = ({
  onChange,
  rangeBandFields,
  range,
  placeholder,
  isDisabled,
}) => {
  const weaponRangeInputWidth = '4.5rem';

  return (
    <>
      <h4 className="weapon-mode-range-band-title">{range} range band</h4>
      <div className="weapon-mode-range-band-row">
        <Select
          id={`weapon-mode-${range}-range-band-modifier`}
          name="rangeBandModifier"
          label="Modifier"
          options={rangBandModifierOptions}
          onChange={onChange}
          selectedValue={rangeBandFields.rangeBandModifier}
          isDisabled={isDisabled}
        />
        <Input
          id={`weapon-mode-${range}-range-band-min`}
          name="min"
          label="Min"
          value={rangeBandFields.min}
          onChange={onChange}
          error={isEmpty(rangeBandFields.min) || !isInt(rangeBandFields.min)}
          placeholder={placeholder[0]}
          width={weaponRangeInputWidth}
          className="weapon-mode-min-range"
          disabled={isDisabled}
        />
        <Input
          id={`weapon-mode-${range}-range-band-max`}
          name="max"
          label="Max"
          value={rangeBandFields.max}
          onChange={onChange}
          error={isEmpty(rangeBandFields.max) || !isInt(rangeBandFields.max)}
          placeholder={placeholder[1]}
          width={weaponRangeInputWidth}
          disabled={isDisabled}
        />
      </div>
    </>
  );
};

interface RangeBandFormProps {
  onChange: (key: string, value: FormValue) => void;
  rangeBandFields: { min: string; max: string; rangeBandModifier: string };
  range: 'short' | 'medium' | 'long' | 'maximum';
  placeholder: [string, string];
  isDisabled?: boolean;
}
