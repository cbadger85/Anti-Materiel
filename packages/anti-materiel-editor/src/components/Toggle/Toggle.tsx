import React from 'react';
import uuid from 'uuid/v4';
import './Toggle.scss';

export const Toggle: React.FC<ToggleProps> = ({
  label,
  id,
  name,
  checked,
  onChange,
  disabled,
}) => {
  const getId = (): string => {
    if (id) {
      return id;
    }

    if (name) {
      return name;
    }

    return uuid();
  };

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    onChange(e.target.checked);
  };

  const toggleId = getId();

  return (
    <div className="toggle">
      <input
        type="checkbox"
        checked={checked}
        onChange={handleOnChange}
        id={toggleId}
        disabled
      />
      <label className="toggle__label" htmlFor={toggleId}>
        {label}
      </label>
    </div>
  );
};

interface ToggleProps {
  label?: string;
  id?: string;
  name?: string;
  disabled?: boolean;
  checked?: boolean;
  onChange: (checked: boolean) => void;
}
