import React from 'react';
import './Input.scss';

export const Input: React.FC<InputProps> = ({
  name,
  id,
  label,
  className,
  onChange,
  width,
  ...props
}) => {
  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.name, e.target.value);
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
  onChange: (key: string, value: string) => void;
}
