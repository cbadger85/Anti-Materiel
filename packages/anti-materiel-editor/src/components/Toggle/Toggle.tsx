import React from 'react';
import './Toggle.scss';

export const Toggle: React.FC<ToggleProps> = ({ label, checked, onChange }) => {
  return (
    <>
      <input
        type="checked"
        className="toggle"
        checked={checked}
        onChange={onChange}
      />
      <label>{label}</label>
    </>
  );
};

interface ToggleProps {
  label: string;
  checked?: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
