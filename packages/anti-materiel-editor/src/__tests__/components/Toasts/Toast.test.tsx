import React from 'react';
import { shallow } from 'enzyme';
import { Toast } from '../../../components/Toasts/Toast';
import { animated } from 'react-spring';
import { Button } from '../../../components/Button/Button';

describe('<Toast />', () => {
  const onDismiss = jest.fn();

  it('should show the text', () => {
    const wrapper = shallow(
      <Toast
        text="test"
        style={{ transform: 'translate3d(0px,0,0)', opacity: 1 } as any}
        onDismiss={onDismiss}
        color="info"
      />,
    );

    const text = wrapper.find('p');

    expect(text.text()).toBe('test');
  });

  it('should have the correct className for the background color', () => {
    const wrapper = shallow(
      <Toast
        text="test"
        style={{ transform: 'translate3d(0px,0,0)', opacity: 1 } as any}
        onDismiss={onDismiss}
        color="info"
      />,
    );

    const toastClasses = wrapper.find(animated.li).props().className;

    expect(toastClasses).toContain('toast--info');
  });

  it('should have a dark delete button if the color isnt warn', () => {
    const wrapper = shallow(
      <Toast
        text="test"
        style={{ transform: 'translate3d(0px,0,0)', opacity: 1 } as any}
        onDismiss={onDismiss}
        color="info"
      />,
    );

    const buttonColor = wrapper.find(Button).props().color;

    expect(buttonColor).toBe('delete-dark');
  });

  it('should have a light delete button if the color is warn', () => {
    const wrapper = shallow(
      <Toast
        text="test"
        style={{ transform: 'translate3d(0px,0,0)', opacity: 1 } as any}
        onDismiss={onDismiss}
        color="warn"
      />,
    );

    const buttonColor = wrapper.find(Button).props().color;

    expect(buttonColor).toBe('delete-light');
  });

  it('should call onDismiss if the button is pressed', () => {
    const wrapper = shallow(
      <Toast
        text="test"
        style={{ transform: 'translate3d(0px,0,0)', opacity: 1 } as any}
        onDismiss={onDismiss}
        color="info"
      />,
    );

    wrapper.find(Button).simulate('click');

    expect(onDismiss).toBeCalled();
  });
});
