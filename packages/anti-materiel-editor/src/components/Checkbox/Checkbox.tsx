import React, { useEffect } from 'react';
import './Checkbox.scss';
import { getClasses } from '../../utils/getClasses';

export const Checkbox: React.FC<CheckboxProps> = ({
  name,
  label,
  onChange,
  checked,
  className,
  style,
  error,
  fullRow = true,
  ...props
}) => {
  useEffect(() => {
    onChange(name, !!checked, error);
  });

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    onChange(e.target.name, e.target.checked, error);
  };

  return (
    <div
      className={getClasses(
        'checkbox',
        fullRow && 'checkbox--full-row',
        className,
      )}
      style={style}
    >
      <input
        type="checkbox"
        checked={checked}
        onChange={handleOnChange}
        name={name}
        id={props.id ? props.id : name}
        {...props}
      />
      <label htmlFor={props.id ? props.id : name} className="checkbox__label">
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
  fullRow?: boolean;
  label: string;
  onChange: (key: string, value: boolean, error?: boolean) => void;
  error?: boolean;
}
