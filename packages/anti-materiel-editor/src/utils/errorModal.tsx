import React from 'react';
import ReactDOM from 'react-dom';
import { Modal } from '../components/Modal/Modal';
import { Button } from '../components/Button/Button';

export const ErrorModal = (errorMessage: string): void => {
  const container = document.createElement('div');
  const root = document.getElementById('modal-root') as Element;
  document.body.appendChild(root);

  const closeModal = (): void => {
    ReactDOM.unmountComponentAtNode(container);
  };

  ReactDOM.render(
    <Modal isShown={true}>
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
    </Modal>,
    container,
  );
};
