import React from 'react';
import { Button } from '../Button/Button';
import './SideDrawerForm.scss';

export const SideDrawerForm: React.FC<SideDrawerFormProps> = ({
  children,
  title,
  onSubmit,
  onCancel,
  disableSubmit,
}) => {
  return (
    <div className="side-drawer-form__container">
      <div style={{ height: '100%' }}>
        <h2 className="side-drawer-form__heading">{title}</h2>
        {children}
      </div>
      <div className="side-drawer-form-button-container">
        <Button
          color="transparent-dark"
          width="7rem"
          id="side-drawer-form-cancel"
          onClick={onCancel}
        >
          Cancel
        </Button>
        <Button
          color="primary"
          width="7rem"
          id="side-drawer-form-submit"
          onClick={onSubmit}
          disabled={disableSubmit}
        >
          Save
        </Button>
      </div>
    </div>
  );
};

interface SideDrawerFormProps {
  title: string;
  onSubmit: () => void;
  disableSubmit?: boolean;
  onCancel: () => void;
}