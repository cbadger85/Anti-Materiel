import React from 'react';
import { Input } from '../../../components/Input/Input';
import { Select } from '../../../components/Select/Select';
import { FormValue } from '../../../hooks/useForm.types';
import { isEmpty, isInt } from '../../../utils/formValidators';
import { rangBandModifierOptions } from './WeaponModeFormOptions';

export const isRangeBandSelectError = (rangeBandFields: {
  min: string;
  max: string;
  modifier: string;
}): boolean =>
  !isEmpty(rangeBandFields.modifier) &&
  (isEmpty(rangeBandFields.min) || isEmpty(rangeBandFields.max));

export const isMinInputError = (rangeBandFields: {
  min: string;
  max: string;
  modifier: string;
}): boolean =>
  (!isEmpty(rangeBandFields.min) &&
    (isEmpty(rangeBandFields.modifier) || isEmpty(rangeBandFields.max))) ||
  !isInt(rangeBandFields.min);

export const isMaxInputError = (rangeBandFields: {
  min: string;
  max: string;
  modifier: string;
}): boolean =>
  (!isEmpty(rangeBandFields.max) &&
    (isEmpty(rangeBandFields.modifier) || isEmpty(rangeBandFields.min))) ||
  !isInt(rangeBandFields.max);

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
          name="modifier"
          label="Modifier"
          options={rangBandModifierOptions}
          onChange={onChange}
          selectedValue={rangeBandFields.modifier}
          error={isRangeBandSelectError(rangeBandFields)}
          isDisabled={isDisabled}
        />
        <Input
          id={`weapon-mode-${range}-range-band-min`}
          name="min"
          label="Min"
          value={rangeBandFields.min}
          onChange={onChange}
          error={isMinInputError(rangeBandFields)}
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
          error={isMaxInputError(rangeBandFields)}
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
  rangeBandFields: { min: string; max: string; modifier: string };
  range: 'short' | 'medium' | 'long' | 'maximum';
  placeholder: [string, string];
  isDisabled?: boolean;
}
