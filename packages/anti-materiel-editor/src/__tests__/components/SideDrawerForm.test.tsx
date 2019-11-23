import React from 'react';
import { SideDrawerForm } from '../../components/SideDrawerForm/SideDrawerForm';
import { mount, shallow, ReactWrapper } from 'enzyme';

describe('todo', () => {
  let wrapper: ReactWrapper<any, Readonly<{}>, React.Component<{}, {}, any>>;

  afterEach(() => {
    if (wrapper && wrapper.length) {
      wrapper.unmount();
    }
  });

  const title = 'Test Title';
  it('should display the title', () => {
    const wrapper = shallow(
      <SideDrawerForm onCancel={jest.fn} onSubmit={jest.fn} title={title} />,
    );

    const foundTitle = wrapper.find('h2');

    expect(foundTitle.text()).toBe(title);
  });

  it('should call onSubmit when the submit button is pressed and it isnt disabled', () => {
    const onSubmit = jest.fn();
    const wrapper = shallow(
      <SideDrawerForm onCancel={jest.fn} onSubmit={onSubmit} title={title} />,
    );

    wrapper.find('#side-drawer-form-submit').simulate('click');

    expect(onSubmit).toBeCalled();
  });

  it('should not call onSubmit when the submit button is pressed and it is disabled', () => {
    const onSubmit = jest.fn();
    wrapper = mount(
      <SideDrawerForm
        onCancel={jest.fn}
        onSubmit={onSubmit}
        title={title}
        disableSubmit
      />,
    );

    wrapper
      .find('#side-drawer-form-submit')
      .last()
      .simulate('click');

    expect(onSubmit).toBeCalledTimes(0);
  });
});
