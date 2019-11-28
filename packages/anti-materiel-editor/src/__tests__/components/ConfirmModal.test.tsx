import { shallow } from 'enzyme';
import React from 'react';
import { ConfirmModal } from '../../components/Modal/ConfirmModal';
import { Button } from '../../components/Button/Button';

describe('<ConfirmModal />', () => {
  const modalText = 'test';
  it('should display the text', () => {
    const wrapper = shallow(
      <ConfirmModal text={modalText} onCancel={jest.fn} onConfirm={jest.fn} />,
    );

    const text = wrapper.find('.modal__text');

    expect(text.text()).toBe(modalText);
  });

  it('should call onCancel when cancel is pressed', () => {
    const onCancel = jest.fn();

    const wrapper = shallow(
      <ConfirmModal text={modalText} onCancel={onCancel} onConfirm={jest.fn} />,
    );

    const cancelButton = wrapper.find(Button).first();
    cancelButton.simulate('click');

    expect(onCancel).toBeCalled();
  });

  it('should call onConfirm when ok is pressed', () => {
    const onConfirm = jest.fn();

    const wrapper = shallow(
      <ConfirmModal
        text={modalText}
        onCancel={jest.fn()}
        onConfirm={onConfirm}
      />,
    );

    const okButton = wrapper.find(Button).last();
    okButton.simulate('click');

    expect(onConfirm).toBeCalled();
  });
});
