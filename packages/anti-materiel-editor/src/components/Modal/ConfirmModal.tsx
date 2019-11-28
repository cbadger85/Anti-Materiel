import React from 'react';
import { Modal } from './Modal';
import { Button } from '../Button/Button';

export const ConfirmModal: React.FC<ConfirmModalProps> = ({
  text = 'Are you sure you want to discard changes?',
  onConfirm,
  onCancel,
  isShown,
}) => {
  return (
    <Modal isShown={isShown}>
      <div className="modal__text">{text}</div>
      <div className="modal__button-group modal__button-group--confirm">
        <Button
          onClick={onCancel}
          color="transparent-light"
          width="7rem"
          id="confirm-modal-cancel"
        >
          Cancel
        </Button>
        <Button
          onClick={onConfirm}
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

interface ConfirmModalProps {
  onConfirm: () => void;
  onCancel: () => void;
  text?: React.ReactText | JSX.Element;
  isShown?: boolean;
}
