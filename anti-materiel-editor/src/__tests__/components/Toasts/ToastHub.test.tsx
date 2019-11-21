import React, { useContext } from 'react';
import { mount, ReactWrapper } from 'enzyme';
import {
  ToastProvider,
  toastContext,
} from '../../../components/Toasts/ToastProvider';
import { ToastHub } from '../../../components/Toasts/ToastHub';
import { useToast } from '../../../components/Toasts/useToast';
import { Button } from '../../../components/Button/Button';
import { Toast } from '../../../components/Toasts/Toast';

const Dummy: React.FC = () => {
  const makeToast = useToast();

  return <Button onClick={() => makeToast('test')} />;
};

jest.useFakeTimers();

describe('<ToastHub />', () => {
  it('should remove the toast if the delete button is pressed', () => {
    const wrapper = mount(
      <ToastProvider>
        <Dummy />
      </ToastProvider>,
    );

    wrapper.find(Button).simulate('click');

    const toast = wrapper.find(Toast);

    wrapper
      .find(Button)
      .last()
      .simulate('click');

    const leaveAnimation = wrapper
      .find(Toast)
      .render()
      .attr().style;

    expect(leaveAnimation).toBe(
      'transform: translate3d(4rem,0,0); opacity: 0;',
    );
  });

  it('should remove the toast after the timer is out', () => {
    const wrapper = mount(
      <ToastProvider>
        <Dummy />
      </ToastProvider>,
    );

    wrapper.find(Button).simulate('click');

    expect(setTimeout).toBeCalled();
  });
});
