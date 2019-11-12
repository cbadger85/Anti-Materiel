import React from 'react';
import './Checkbox.scss';

export const Checkbox: React.FC<CheckboxProps> = ({
  name,
  label,
  onChange,
  checked,
  className,
  style,
  ...props
}) => {
  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.name, e.target.checked);
  };

  return (
    <div className={`checkbox ${className ? className : ''}`} style={style}>
      <input
        type="checkbox"
        checked={checked}
        onChange={handleOnChange}
        name={name}
        id={name}
        {...props}
      />
      <label htmlFor={name} className="checkbox__label">
        {label}
      </label>
    </div>
  );
};

interface CheckboxProps
  extends Omit<
    React.DetailedHTMLProps<
      React.InputHTMLAttributes<HTMLInputElement>,
      HTMLInputElement
    >,
    'onChange'
  > {
  name: string;
  label: string;
  onChange: (key: string, value: boolean) => void;
}
