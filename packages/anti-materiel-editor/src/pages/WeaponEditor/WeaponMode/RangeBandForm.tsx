import React from 'react';
import { Input } from '../../../components/Input/Input';
import { Select } from '../../../components/Select/Select';
import { FormValue } from '../../../hooks/useForm.types';
import { isEmpty, isInt, isValidRange } from '../../../utils/formValidators';
import { rangBandModifierOptions } from './WeaponModeFormOptions';

export const isRangeBandSelectError = (rangeBandFields: {
  min: string;
  max: string;
  modifier: string;
}): boolean =>
  isEmpty(rangeBandFields.modifier) &&
  (!isEmpty(rangeBandFields.min) || !isEmpty(rangeBandFields.max));

export const isMinInputError = (rangeBandFields: {
  min: string;
  max: string;
  modifier: string;
}): boolean =>
  (isEmpty(rangeBandFields.min) &&
    (!isEmpty(rangeBandFields.max) || !isEmpty(rangeBandFields.modifier))) ||
  !isInt(rangeBandFields.min) ||
  (!isEmpty(rangeBandFields.min) && !isValidRange(rangeBandFields.min)) ||
  parseInt(rangeBandFields.min, 10) > parseInt(rangeBandFields.max, 10);

export const isMaxInputError = (rangeBandFields: {
  min: string;
  max: string;
  modifier: string;
}): boolean =>
  (isEmpty(rangeBandFields.max) &&
    (!isEmpty(rangeBandFields.min) || !isEmpty(rangeBandFields.modifier))) ||
  !isInt(rangeBandFields.max) ||
  (!isEmpty(rangeBandFields.max) && !isValidRange(rangeBandFields.max)) ||
  parseInt(rangeBandFields.min, 10) > parseInt(rangeBandFields.max, 10);

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
        <Input
          id={`weapon-mode-${range}-range-band-min`}
          name="min"
          label="Min"
          value={rangeBandFields.min}
          onChange={onChange}
          error={isMinInputError(rangeBandFields)}
          placeholder={placeholder[0]}
          width={weaponRangeInputWidth}
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
          className="weapon-mode-max-range"
          disabled={isDisabled}
        />
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
