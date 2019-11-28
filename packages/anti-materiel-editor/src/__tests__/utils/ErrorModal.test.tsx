import React from 'react';
import ReactDOM from 'react-dom';
import { ErrorModal } from '../../utils/ErrorModal';

jest.mock('react-dom', () => ({
  render: jest.fn(),
}));

describe('ErrorModal', () => {
  //@ts-ignore
  const modalRoot = global.document.createElement('div');
  modalRoot.setAttribute('id', 'modal-root');
  //@ts-ignore
  const body = global.document.querySelector('body');
  body.appendChild(modalRoot);

  it('should call render when the function is called', () => {
    ErrorModal('error!');

    expect(ReactDOM.render).toBeCalled();
  });
});
