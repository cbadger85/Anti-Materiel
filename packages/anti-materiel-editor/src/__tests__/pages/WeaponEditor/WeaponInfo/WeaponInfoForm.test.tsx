import { mount, ReactWrapper } from 'enzyme';
import React from 'react';
import { Input } from '../../../../components/Input/Input';
import { WeaponInfoForm } from '../../../../pages/WeaponEditor/WeaponInfo/WeaponInfoForm';
import uuid from 'uuid/v4';

jest.mock('uuid/v4', () => jest.fn().mockReturnValue('5678'));

describe('<WeaponInfoForm />', () => {
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

  const initialData = { name: 'test', wikiLink: 'www.test.com', id: '1234' };

  it('should submit the data when the form is filled out and the submit button is pressed', () => {
    const onSubmit = jest.fn();
    wrapper = mount(
      <WeaponInfoForm
        closeSideDrawer={jest.fn()}
        onCancel={jest.fn()}
        onDataChange={jest.fn()}
        onSubmit={onSubmit}
        initialData={initialData}
      />,
    );

    wrapper
      .find('#side-drawer-form-submit')
      .last()
      .simulate('click');

    expect(onSubmit).toHaveBeenCalledWith(initialData);
  });

  it('should close the side drawer after the form is submitted', () => {
    const closeSideDrawer = jest.fn();
    wrapper = mount(
      <WeaponInfoForm
        closeSideDrawer={closeSideDrawer}
        onCancel={jest.fn()}
        onDataChange={jest.fn()}
        onSubmit={jest.fn()}
        initialData={initialData}
      />,
    );

    wrapper
      .find('#side-drawer-form-submit')
      .last()
      .simulate('click');

    expect(closeSideDrawer).toHaveBeenCalled();
  });

  it('should call onDataChange if the there is no initialData and the fields have data', () => {
    const onDataChange = jest.fn();
    wrapper = mount(
      <WeaponInfoForm
        closeSideDrawer={jest.fn()}
        onCancel={jest.fn()}
        onDataChange={onDataChange}
        onSubmit={jest.fn()}
      />,
    );

    wrapper
      .find(Input)
      .first()
      .simulate('change', { target: { name: 'name', value: 'test' } });

    wrapper
      .find('#side-drawer-form-cancel')
      .last()
      .simulate('click');

    expect(onDataChange).not.toHaveBeenCalledWith(true);
  });

  it('should not allow submission if the data is invalid', () => {
    const closeSideDrawer = jest.fn();
    wrapper = mount(
      <WeaponInfoForm
        closeSideDrawer={closeSideDrawer}
        onCancel={jest.fn()}
        onDataChange={jest.fn()}
        onSubmit={jest.fn()}
      />,
    );

    wrapper
      .find('#side-drawer-form-submit')
      .last()
      .simulate('click');

    expect(closeSideDrawer).not.toHaveBeenCalled();
  });

  it('should generate a new uuid if there is no initial id', () => {
    const onSubmit = jest.fn();

    wrapper = mount(
      <WeaponInfoForm
        closeSideDrawer={jest.fn()}
        onCancel={jest.fn()}
        onDataChange={jest.fn()}
        onSubmit={onSubmit}
        initialData={{ name: 'test', wikiLink: 'test.com' }}
      />,
    );

    wrapper
      .find('#side-drawer-form-submit')
      .last()
      .simulate('click');

    expect(uuid).toHaveBeenCalled();
  });
});
