import React from 'react';
import ReactDOM from 'react-dom';
import { errorModal, ErrorModalManager } from '../../utils/errorModal';
import { shallow } from 'enzyme';
import { Modal } from '../../components/Modal/Modal';
import { Button } from '../../components/Button/Button';

jest.mock('react-dom', () => ({
  render: jest.fn(),
}));

describe('errorModal', () => {
  describe('error modal is mounted', () => {
    //@ts-ignore
    const modalRoot = global.document.createElement('div');
    modalRoot.setAttribute('id', 'modal-root');
    //@ts-ignore
    const body = global.document.querySelector('body');
    body.appendChild(modalRoot);

    it('should call render when the function is called', () => {
      errorModal('error!');

      expect(ReactDOM.render).toBeCalled();
    });
  });

  describe('<ErrorModalManager />', () => {
    it('should start with the modal visible', () => {
      const wrapper = shallow(
        <ErrorModalManager errorMessage="error" unMount={jest.fn()} />,
      );

      const modal = wrapper.find(Modal);

      expect(modal.props().isShown).toBe(true);
    });

    it('should close the modal when the ok button is pressed', () => {
      const wrapper = shallow(
        <ErrorModalManager errorMessage="error" unMount={jest.fn()} />,
      );

      wrapper.find(Button).simulate('click');

      const modal = wrapper.find(Modal);

      expect(modal.props().isShown).toBe(false);
    });

    it('should call unmount when the ok button is pressed', () => {
      const unMount = jest.fn();
      const wrapper = shallow(
        <ErrorModalManager errorMessage="error" unMount={unMount} />,
      );

      wrapper.find(Button).simulate('click');

      expect(unMount).toBeCalled();
    });
  });
});
