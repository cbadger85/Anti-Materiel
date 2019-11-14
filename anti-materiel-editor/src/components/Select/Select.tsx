import React, { useEffect } from 'react';
import ReactSelect from 'react-select';
import { Props } from 'react-select/src/Select';
import { Styles } from 'react-select/src/styles';
import { OptionTypeBase } from 'react-select/src/types';
import './Select.scss';

export const Select: React.FC<SelectInputProps> = ({
  className,
  name,
  id,
  label,
  onChange,
  options,
  error,
  selectedValue,
  ...props
}) => {
  const customStyles: Styles = {
    control: (base, state) => ({
      ...base,
      boxShadow: 'none',
      border: state.isFocused ? '1px solid #e668a7' : '1px border #627d98',
      outline: state.isFocused ? '#e668a7' : 'none',
      '&:hover': state.isFocused
        ? { border: '1px solid #e668a7' }
        : { border: '1px border #627d98' },
      borderRadius: 0,
      backgroundColor: state.isDisabled ? '#bcccdc' : '#f0f4f8',
      color: '#102a43',
    }),
    menu: (base, state) => ({
      ...base,
      borderRadius: 0,
      backgroundColor: '#f0f4f8',
      color: '#102a43',
      borderColor: '#627d98',
    }),
    option: (base, state) => ({
      ...base,
      color: '#102a43',
    }),
    input: (base, state) => ({
      ...base,
      color: '#102a43',
      borderColor: '#627d98',
    }),
    placeholder: (base, state) => ({
      ...base,
      color: '#334e68',
    }),
    singleValue: (base, state) => ({
      ...base,
      color: '#334e68',
    }),
    dropdownIndicator: (base, state) => ({
      ...base,
      color: state.isDisabled ? '#829ab1' : '#627d98',
    }),
  };

  useEffect(() => {
    selectedValue && onChange(name, selectedValue, error);
  });

  const handleOnChange = (selected: OptionTypeBase) => {
    onChange(name, (selected as OptionTypeBase).value, error);
  };

  const getValue = () => {
    const value = options.find(
      (option: Option) => selectedValue && option.value === selectedValue,
    );

    return value;
  };

  return (
    <div className={`select-input ${className ? className : ''}`}>
      <label htmlFor={name}>
        <span className="select-input__label">{label}</span>
        <ReactSelect
          id={id}
          name={name}
          options={options}
          value={
            selectedValue && selectedValue
              ? getValue()
              : { label: 'Select...', value: '' }
          }
          {...props}
          styles={customStyles}
          onChange={handleOnChange}
        />
      </label>
    </div>
  );
};

interface SelectInputProps extends Omit<Props, 'onChange'> {
  className?: string;
  name: string;
  label: string;
  onChange: (name: string, selectedValue: string, isInvalid?: boolean) => void;
  error?: boolean;
  selectedValue?: string;
}

interface Option {
  label: string;
  value: string;
}
