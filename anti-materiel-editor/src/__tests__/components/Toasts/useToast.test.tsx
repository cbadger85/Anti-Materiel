import React from 'react';
import { mount } from 'enzyme';
import { ToastProvider } from '../../../components/Toasts/ToastProvider';
import { ToastHub } from '../../../components/Toasts/ToastHub';
import { useToast } from '../../../components/Toasts/useToast';
import { Button } from '../../../components/Button/Button';
import { Toast } from '../../../components/Toasts/Toast';

const Dummy: React.FC = () => {
  const makeToast = useToast();

  return <Button onClick={() => makeToast('test')} />;
};

describe('useToast', () => {
  const wrapper = mount(
    <ToastProvider>
      <Dummy />
      <ToastHub />
    </ToastProvider>,
  );

  it('should make a toast when makeToast is called', () => {
    wrapper.find(Button).simulate('click');

    const toast = wrapper.find(Toast);

    expect(toast).toHaveLength(1);
  });
});
