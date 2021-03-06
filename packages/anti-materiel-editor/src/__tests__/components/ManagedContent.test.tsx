import React from 'react';
import { mount, ReactWrapper } from 'enzyme';
import { ManagedContent } from '../../components/ManagedContent/ManagedContent';
import { SideDrawer } from '../../components/SideDrawer/SideDrawer';
import { ConfirmModal } from '../../components/Modal/ConfirmModal';
import { Plus, Edit2 } from 'react-feather';
import { Button } from '../../components/Button/Button';

describe('<ManagedContent />', () => {
  let wrapper: ReactWrapper<any, Readonly<{}>, React.Component<{}, {}, any>>;

  // add a div with #modal-root id to the global body
  //@ts-ignore
  const modalRoot = global.document.createElement('div');
  modalRoot.setAttribute('id', 'modal-root');
  //@ts-ignore
  const body = global.document.querySelector('body');
  body.appendChild(modalRoot);

  afterEach(() => {
    wrapper.unmount();
  });

  it('should display the title', () => {
    wrapper = mount(
      <ManagedContent title="test" content={jest.fn()} form={jest.fn()} />,
    );

    const title = wrapper.find('h2');

    expect(title.text()).toBe('test');
  });

  it('should show the add icon when edit is false', () => {
    wrapper = mount(
      <ManagedContent title="test" content={jest.fn()} form={jest.fn()} />,
    );

    const addIcon = wrapper.find(Plus);

    expect(addIcon).toHaveLength(1);
  });

  it('should show the edit icon when edit is true', () => {
    wrapper = mount(
      <ManagedContent title="test" content={jest.fn()} form={jest.fn()} edit />,
    );

    const editIcon = wrapper.find(Edit2);

    expect(editIcon).toHaveLength(1);
  });

  it('should should show the SideDrawer when the button is pressed', () => {
    wrapper = mount(
      <ManagedContent title="test" content={jest.fn()} form={jest.fn()} />,
    );

    const button = wrapper.find('button');

    button.simulate('click');

    const sideDrawer = wrapper.find(SideDrawer);

    expect(sideDrawer).toHaveLength(1);
  });

  it('should show the modal when closing the side drawer if warn is true', () => {
    wrapper = mount(
      <ManagedContent title="test" content={jest.fn()} form={jest.fn()} warn />,
    );

    const button = wrapper.find('button');

    button.simulate('click');

    const sideDrawer = wrapper.find(SideDrawer);
    const background = sideDrawer.find('#opaque-background').last();

    background.simulate('click');

    const confirmModal = wrapper.find(ConfirmModal);

    expect(confirmModal).toHaveLength(1);
  });

  it('should close the modal when cancel is clicked but leave the SideDrawer open', () => {
    wrapper = mount(
      <ManagedContent title="test" content={jest.fn()} form={jest.fn()} warn />,
    );

    const button = wrapper.find('button');

    button.simulate('click');

    const sideDrawer = wrapper.find(SideDrawer);
    const background = sideDrawer.find('#opaque-background').last();

    background.simulate('click');

    const confirmModal = wrapper.find(ConfirmModal);

    confirmModal
      .find(Button)
      .first()
      .simulate('click');

    const closedConfirmModal = wrapper.find(ConfirmModal);

    const openedSideDrawer = wrapper.find(SideDrawer);

    expect(closedConfirmModal.props().isShown).toBe(false);
    expect(openedSideDrawer.props().isOpen).toBe(true);
  });

  it('should close the modal and the SideDrawer when ok is clicked', () => {
    wrapper = mount(
      <ManagedContent title="test" content={jest.fn()} form={jest.fn()} warn />,
    );

    const button = wrapper.find('button');

    button.simulate('click');

    const sideDrawer = wrapper.find(SideDrawer);
    const background = sideDrawer.find('#opaque-background').last();

    background.simulate('click');

    const confirmModal = wrapper.find(ConfirmModal);

    confirmModal
      .find(Button)
      .last()
      .simulate('click');

    const closedConfirmModal = wrapper.find(ConfirmModal);

    const closedSideDrawer = wrapper.find(SideDrawer);

    expect(closedConfirmModal.props().isShown).toBe(false);
    expect(closedSideDrawer.props().isOpen).toBe(false);
  });

  it('should close the side drawer if warn is false', () => {
    wrapper = mount(
      <ManagedContent title="test" content={jest.fn()} form={jest.fn()} />,
    );

    const button = wrapper.find('button');

    button.simulate('click');

    const openedSideDrawer = wrapper.find(SideDrawer);

    const background = openedSideDrawer.find('#opaque-background').first();
    background.simulate('click');

    const closedSideDrawer = wrapper.find(SideDrawer);

    expect(closedSideDrawer.props().isOpen).toBe(false);
  });

  it('should call onCloseSideDrawer when the SideDrawer is closed', () => {
    const onCloseSideDrawer = jest.fn();
    wrapper = mount(
      <ManagedContent
        title="test"
        content={jest.fn()}
        form={jest.fn()}
        onCloseSideDrawer={onCloseSideDrawer}
      />,
    );

    const button = wrapper.find('button');

    button.simulate('click');

    const openedSideDrawer = wrapper.find(SideDrawer);

    const background = openedSideDrawer.find('#opaque-background').first();
    background.simulate('click');

    expect(onCloseSideDrawer).toBeCalled();
  });
});
