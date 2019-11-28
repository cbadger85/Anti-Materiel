import React from 'react';
import ReactDOM from 'react-dom';
import { Modal } from '../components/Modal/Modal';
import { Button } from '../components/Button/Button';
import { useState } from 'react';

export const ErrorModalManager: React.FC<ModalManager> = ({
  unMount,
  errorMessage,
}) => {
  const [isShown, setIsShown] = useState(true);

  const closeModal = (): void => {
    setIsShown(false);
    unMount();
  };

  return (
    <Modal isShown={isShown} onClickOutside={closeModal}>
      <div className="modal__text">{errorMessage}</div>
      <div className="modal__button-group modal__button-group--ok">
        <Button
          onClick={closeModal}
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

interface ModalManager {
  unMount: () => void;
  errorMessage: string;
}

export const errorModal = (errorMessage: string): void => {
  const container = document.createElement('div');
  const root = document.getElementById('modal-root') as Element;
  document.body.appendChild(root);

  const unMount = (): void => {
    setTimeout(() => {
      ReactDOM.unmountComponentAtNode(container);
    }, 300);
  };

  ReactDOM.render(
    <ErrorModalManager errorMessage={errorMessage} unMount={unMount} />,
    container,
  );
};
