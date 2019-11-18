import React from 'react';
import ReactDOM from 'react-dom';

export const Modal: React.FC<ModalProps> = ({ children, isShown }) => {
  if (!isShown) {
    return null;
  }

  return ReactDOM.createPortal(
    <div className="modal">{children}</div>,
    document.getElementById('modal-root') as Element,
  );
};

interface ModalProps {
  isShown?: boolean;
}
