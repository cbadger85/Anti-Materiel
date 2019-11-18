import React from 'react';
import { Modal } from './Modal';
import { Button } from '../Button/Button';

export const ConfirmModal: React.FC<DiscardChangesModalProps> = ({
  text,
  closeModal,
  confirmAction,
  isShown,
}) => {
  const handleConfirm = (): void => {
    closeModal();
    confirmAction();
  };

  return (
    <Modal isShown={isShown}>
      <div className="modal__text">{text}</div>
      <div className="modal__button-group modal__button-group--confirm">
        <Button
          onClick={closeModal}
          color="transparent-light"
          width="7rem"
          id="confirm-modal-cancel"
        >
          Cancel
        </Button>
        <Button
          onClick={handleConfirm}
          color="secondary"
          width="7rem"
          id="confirm-modal-ok"
        >
          OK
        </Button>
      </div>
    </Modal>
  );
};

interface DiscardChangesModalProps {
  text: React.ReactText | JSX.Element;
  closeModal: () => void;
  confirmAction: () => void;
  isShown?: boolean;
}
