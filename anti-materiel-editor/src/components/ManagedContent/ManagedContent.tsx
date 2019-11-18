import React, { useState } from 'react';
import { SideDrawer } from '../../components/SideDrawer/SideDrawer';
import { Button } from '../Button/Button';
import { AddIcon, EditIcon } from '../Icons';
import { Modal } from '../Modal/Modal';
import './ManagedContent.scss';

export const ManagedContent: React.FC<ManagedContentProps> = ({
  warn = true,
  edit,
  title,
  content,
  form,
}) => {
  const [isModalShown, setIsModalShown] = useState(false);
  const [isSideDrawerOpen, setIsSideDrawerOpen] = useState(false);

  const openSideDrawer = (): void => setIsSideDrawerOpen(true);

  const closeSideDrawer = (): void => setIsSideDrawerOpen(false);

  const handleCancel = (): void => {
    if (warn) {
      console.log('WARNING!');
      setIsModalShown(true);
      return;
    }
    closeSideDrawer();
  };

  return (
    <div className="managed-content__container">
      <h3 className={'managed-content__title'}>{title}</h3>
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
        {form(closeSideDrawer, handleCancel)}
      </SideDrawer>
      <Modal isShown={isModalShown}>
        Hello World
        <div>
          <Button
            onClick={() => setIsModalShown(false)}
            color="transparent-light"
          >
            Cancel
          </Button>
          <Button
            onClick={() => {
              setIsSideDrawerOpen(false);
              setIsModalShown(false);
            }}
            color="secondary"
          >
            Close
          </Button>
        </div>
      </Modal>
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
}
