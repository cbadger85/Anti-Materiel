import { mount, shallow } from 'enzyme';
import React from 'react';
import { Button } from '../../../components/Button/Button';
import { ToastHub } from '../../../components/Toasts/ToastHub';
import { Toast as ToastMessage } from '../../../components/Toasts/toastsTypes';
import { Toast } from '../../../components/Toasts/Toast';

beforeAll(done => {
  done();
});

jest.useFakeTimers();

describe('<ToastHub />', () => {
  it('should remove the toast if the delete button is pressed', () => {
    const toasts: ToastMessage[] = [
      { text: 'test', color: 'info', duration: 0, id: '1234' },
    ];

    const dismissToast = jest.fn();

    const wrapper = mount(
      <ToastHub toasts={toasts} dismissToast={dismissToast} />,
    );

    wrapper.find(Button).simulate('click');

    wrapper
      .find(Button)
      .last()
      .simulate('click');

    expect(dismissToast).toHaveBeenCalledWith('1234');
  });

  it('should remove the toast after the timer is out', () => {
    const toasts: ToastMessage[] = [
      { text: 'test', color: 'info', duration: 0, id: '1234' },
    ];
    const dismissToast = jest.fn();

    shallow(<ToastHub toasts={toasts} dismissToast={dismissToast} />);

    expect(setTimeout).toBeCalled();
  });

  it('should create a Toast if an array of toasts is passed in', () => {
    const toasts: ToastMessage[] = [
      { text: 'test', color: 'info', duration: 0, id: '1234' },
    ];
    const dismissToast = jest.fn();

    const wrapper = shallow(
      <ToastHub toasts={toasts} dismissToast={dismissToast} />,
    );

    const toast = wrapper.find(Toast);

    expect(toast).toHaveLength(1);
  });
});
