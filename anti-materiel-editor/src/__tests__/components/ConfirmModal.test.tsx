import { shallow } from 'enzyme';
import React from 'react';
import { ConfirmModal } from '../../components/Modal/ConfirmModal';
import { Button } from '../../components/Button/Button';

describe('<ConfirmModal />', () => {
  const modalText = 'test';
  it('should display the text', () => {
    const wrapper = shallow(
      <ConfirmModal
        text={modalText}
        closeModal={jest.fn}
        confirmAction={jest.fn}
      />,
    );

    const text = wrapper.find('.modal__text');

    expect(text.text()).toBe(modalText);
  });

  it('should call closeModal when cancel is pressed', () => {
    const closeModal = jest.fn();

    const wrapper = shallow(
      <ConfirmModal
        text={modalText}
        closeModal={closeModal}
        confirmAction={jest.fn}
      />,
    );

    const cancelButton = wrapper.find(Button).first();
    cancelButton.simulate('click');

    expect(closeModal).toBeCalled();
  });

  it('should call closeModal  and confirmAction when ok is pressed', () => {
    const closeModal = jest.fn();
    const confirmAction = jest.fn();

    const wrapper = shallow(
      <ConfirmModal
        text={modalText}
        closeModal={closeModal}
        confirmAction={confirmAction}
      />,
    );

    const okButton = wrapper.find(Button).last();
    okButton.simulate('click');

    expect(closeModal).toBeCalled();
    expect(confirmAction).toBeCalled();
  });
});
