import React from 'react';
import uuid from 'uuid/v4';
import './Toggle.scss';

export const Toggle: React.FC<ToggleProps> = ({
  label,
  id,
  name,
  checked,
  onChange,
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

  const toggleId = getId();

  return (
    <div className="toggle">
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        id={toggleId}
      />
      <label className="toggle__label" htmlFor={toggleId}>
        {label}
      </label>
    </div>
  );
};

interface ToggleProps {
  label: string;
  id?: string;
  name?: string;
  checked?: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
