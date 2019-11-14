import React from 'react';
import { useSideDrawer } from '../../components/SideDrawer';
import { Button } from '../../components/Button/Button';

export const SideDrawerButtonGroup: React.FC<SideDrawerButtonGroup> = ({
  onSubmit,
  edit,
  isDisabled,
}) => {
  const { closeSideDrawer } = useSideDrawer();

  return (
    <div className="side-drawer-contents-button-container">
      <Button color="transparent-dark" width="7rem" onClick={closeSideDrawer}>
        Cancel
      </Button>
      <Button
        color="primary"
        width="7rem"
        onClick={onSubmit}
        disabled={isDisabled}
      >
        {edit ? 'Edit' : 'Add'}
      </Button>
    </div>
  );
};

interface SideDrawerButtonGroup {
  onSubmit: () => void;
  isDisabled?: boolean;
  edit?: boolean;
}
