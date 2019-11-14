import React, { useEffect } from 'react';
import { FormValue } from '../../hooks/useForm.types';
import './Input.scss';

export const Input: React.FC<InputProps> = ({
  name,
  id,
  label,
  className,
  onChange,
  width,
  error,
  value,
  ...props
}) => {
  useEffect(() => {
    onChange(name, value, error);
  });

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.name, e.target.value, error);
  };

  return (
    <div className={`input ${className ? className : ''}`} style={{ width }}>
      <label htmlFor={name} className="input__label">
        {label}
        <input
          id={id}
          name={name}
          className="input__input-field"
          onChange={handleOnChange}
          value={value}
          {...props}
        />
      </label>
    </div>
  );
};

interface InputProps
  extends Omit<
    React.DetailedHTMLProps<
      React.InputHTMLAttributes<HTMLInputElement>,
      HTMLInputElement
    >,
    'onChange'
  > {
  name: string;
  label: string;
  onChange: (key: string, value: FormValue, isInvalid?: boolean) => void;
  error?: boolean;
  // fieldState: { value: FormValue; isInvalid?: boolean };
  value: string;
}
