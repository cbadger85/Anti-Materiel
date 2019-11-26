import React from 'react';
import { mount, ReactWrapper } from 'enzyme';
import { ManagedContent } from '../../components/ManagedContent/ManagedContent';
import { SideDrawer } from '../../components/SideDrawer/SideDrawer';
import { ConfirmModal } from '../../components/Modal/ConfirmModal';
import { AddIcon, EditIcon } from '../../components/Icons';

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
      <ManagedContent
        title="test"
        content={jest.fn()}
        form={jest.fn()}
        onClearForm={jest.fn()}
      />,
    );

    const title = wrapper.find('h2');

    expect(title.text()).toBe('test');
  });

  it('should show the AddIcon when edit is false', () => {
    wrapper = mount(
      <ManagedContent
        title="test"
        content={jest.fn()}
        form={jest.fn()}
        onClearForm={jest.fn()}
      />,
    );

    const addIcon = wrapper.find(AddIcon);

    expect(addIcon).toHaveLength(1);
  });

  it('should show the EditIcon when edit is true', () => {
    wrapper = mount(
      <ManagedContent
        title="test"
        content={jest.fn()}
        form={jest.fn()}
        edit
        onClearForm={jest.fn()}
      />,
    );

    const editIcon = wrapper.find(EditIcon);

    expect(editIcon).toHaveLength(1);
  });

  it('should should show the SideDrawer when the button is pressed', () => {
    wrapper = mount(
      <ManagedContent
        title="test"
        content={jest.fn()}
        form={jest.fn()}
        onClearForm={jest.fn()}
      />,
    );

    const button = wrapper.find('button');

    button.simulate('click');

    const sideDrawer = wrapper.find(SideDrawer);

    expect(sideDrawer).toHaveLength(1);
  });

  it('should show the modal when closing the side drawer if warn is true', () => {
    wrapper = mount(
      <ManagedContent
        title="test"
        content={jest.fn()}
        form={jest.fn()}
        warn
        onClearForm={jest.fn()}
      />,
    );

    const button = wrapper.find('button');

    button.simulate('click');

    const sideDrawer = wrapper.find(SideDrawer);
    const background = sideDrawer.find('#opaque-background').last();

    background.simulate('click');

    const confirmModal = wrapper.find(ConfirmModal);

    expect(confirmModal).toHaveLength(1);
  });

  it('should close the side drawer if warn is false', () => {
    wrapper = mount(
      <ManagedContent
        title="test"
        content={jest.fn()}
        form={jest.fn()}
        onClearForm={jest.fn()}
      />,
    );

    const button = wrapper.find('button');

    button.simulate('click');

    const openedSideDrawer = wrapper.find(SideDrawer);

    const background = openedSideDrawer.find('#opaque-background').first();
    background.simulate('click');

    const closedSideDrawer = wrapper.find(SideDrawer);

    expect(closedSideDrawer.props().isOpen).toBe(false);
  });

  it('should close the side drawer if warn is false', () => {
    const onClearForm = jest.fn();
    wrapper = mount(
      <ManagedContent
        title="test"
        content={jest.fn()}
        form={jest.fn()}
        onClearForm={onClearForm}
      />,
    );

    const button = wrapper.find('button');

    button.simulate('click');

    const openedSideDrawer = wrapper.find(SideDrawer);

    const background = openedSideDrawer.find('#opaque-background').first();
    background.simulate('click');

    expect(onClearForm).toBeCalled();
  });
});
