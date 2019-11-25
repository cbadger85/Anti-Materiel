import React, { useState } from 'react';
import { SideDrawer } from '../../components/SideDrawer/SideDrawer';
import { Button } from '../Button/Button';
import { ConfirmModal } from '../Modal/ConfirmModal';
import { AddIcon, EditIcon } from '../Icons';
import './ManagedContent.scss';

export const ManagedContent: React.FC<ManagedContentProps> = ({
  warn,
  edit,
  title,
  content,
  form,
  onClearForm,
}) => {
  const [isModalShown, setIsModalShown] = useState(false);
  const [isSideDrawerOpen, setIsSideDrawerOpen] = useState(false);

  const openSideDrawer = (): void => setIsSideDrawerOpen(true);

  const handleCloseSideDrawer = (): void => {
    onClearForm();
    setIsSideDrawerOpen(false);
  };

  const handleCancel = (): void => {
    if (warn) {
      setIsModalShown(true);
      return;
    }

    handleCloseSideDrawer();
  };

  const handleOnCancelModal = (): void => {
    setIsModalShown(false);
  };

  return (
    <div className="managed-content__container">
      <h2 className={'managed-content__title'}>{title}</h2>
      <div className="mananged-content__content">{content()}</div>
      <Button
        onClick={openSideDrawer}
        color="secondary"
        className="managed-content__open-form-button"
        width="7.5rem"
      >
        {edit ? (
          <>
            <EditIcon color="secondary" /> Edit
          </>
        ) : (
          <>
            <AddIcon color="secondary" /> Add
          </>
        )}
      </Button>

      <SideDrawer isOpen={isSideDrawerOpen} closeSideDrawer={handleCancel}>
        {form(handleCloseSideDrawer, handleCancel)}
      </SideDrawer>
      <ConfirmModal
        text="Are you sure you want to discard changes?"
        closeModal={handleOnCancelModal}
        confirmAction={handleCloseSideDrawer}
        isShown={isModalShown}
      />
    </div>
  );
};

interface ManagedContentProps {
  title: string;
  warn?: boolean;
  edit?: boolean;
  content: () => React.ReactNode;
  form: (
    closeSideDrawer: () => void,
    closeSideDrawerWarn: () => void,
  ) => React.ReactNode;
  onClearForm: () => void;
}
