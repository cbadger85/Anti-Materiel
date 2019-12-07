import React, { useState } from 'react';
import { Edit2, Plus } from 'react-feather';
import { SideDrawer } from '../../components/SideDrawer/SideDrawer';
import { color } from '../../styles/colors';
import { Button } from '../Button/Button';
import { ConfirmModal } from '../Modal/ConfirmModal';
import './ManagedContent.scss';

export const ManagedContent: React.FC<ManagedContentProps> = ({
  warn,
  edit,
  title,
  content,
  form,
  onCloseSideDrawer,
}) => {
  const [isModalShown, setIsModalShown] = useState(false);
  const [isSideDrawerOpen, setIsSideDrawerOpen] = useState(false);

  const openSideDrawer = (): void => setIsSideDrawerOpen(true);

  const handleCloseSideDrawer = (): void => {
    setIsSideDrawerOpen(false);
    onCloseSideDrawer && onCloseSideDrawer();
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

  const handleOnConfirmModal = (): void => {
    setIsModalShown(false);
    handleCloseSideDrawer();
  };

  return (
    <div className="managed-content__container">
      <h2 className={'managed-content__title'}>{title}</h2>
      <div className="mananged-content__content">{content(openSideDrawer)}</div>
      <Button
        onClick={openSideDrawer}
        color="secondary"
        className="managed-content__open-form-button"
        width="7.5rem"
      >
        {edit ? (
          <>
            <Edit2 color={color.supporting.indigo[0]} /> Edit
          </>
        ) : (
          <>
            <Plus color={color.supporting.indigo[0]} /> Add
          </>
        )}
      </Button>

      <SideDrawer isOpen={isSideDrawerOpen} closeSideDrawer={handleCancel}>
        {form(handleCloseSideDrawer, handleCancel)}
      </SideDrawer>
      <ConfirmModal
        onCancel={handleOnCancelModal}
        onConfirm={handleOnConfirmModal}
        isShown={isModalShown}
      />
    </div>
  );
};

interface ManagedContentProps {
  title: string;
  warn?: boolean;
  edit?: boolean;
  content: (openSideDrawer: () => void) => React.ReactNode;
  form: (
    closeSideDrawer: () => void,
    closeSideDrawerWarn: () => void,
  ) => React.ReactNode;
  onCloseSideDrawer?: () => void;
}
