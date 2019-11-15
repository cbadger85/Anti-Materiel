import React, { useEffect, useState } from 'react';
import { FormValue } from '../../hooks/useForm.types';
import './Input.scss';
import { getClasses } from '../../utils/getClasses';

export const Input: React.FC<InputProps> = ({
  name,
  id,
  label,
  className,
  onChange,
  width,
  error,
  value,
  uppercase,
  ...props
}) => {
  const [isBlurred, setIsBlurred] = useState(false);
  const showError = isBlurred && error;

  useEffect(() => {
    onChange(name, uppercase ? value.toUpperCase() : value, error);
  });

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(
      e.target.name,
      uppercase ? e.target.value.toUpperCase() : e.target.value,
      error,
    );
  };

  return (
    <div className={`input ${className ? className : ''}`} style={{ width }}>
      <label htmlFor={name} className="input__label">
        {label}
        <input
          id={id}
          name={name}
          className={getClasses(
            'input__input-field',
            showError && 'input__field--error',
          )}
          onChange={handleOnChange}
          onBlur={() => setIsBlurred(true)}
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
  value: string;
  uppercase?: boolean;
}
