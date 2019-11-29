import React from 'react';
import { WeaponInfo } from '../../../../pages/WeaponEditor/WeaponInfo/WeaponInfo';
import { mount, ReactWrapper } from 'enzyme';
import { ManagedContent } from '../../../../components/ManagedContent/ManagedContent';
import { Button } from '../../../../components/Button/Button';
import { SideDrawer } from '../../../../components/SideDrawer/SideDrawer';

describe('<WeaponInfo />', () => {
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

  it('should start out with warn set to false', () => {
    const addWeaponInfo = jest.fn();
    wrapper = mount(<WeaponInfo addWeaponInfo={addWeaponInfo} />);

    const managedContent = wrapper.find(ManagedContent);

    expect(managedContent.props().warn).toBe(false);
  });

  it('should set warn to true if any content is edited', () => {
    const addWeaponInfo = jest.fn();
    wrapper = mount(<WeaponInfo addWeaponInfo={addWeaponInfo} />);

    wrapper
      .find(ManagedContent)
      .find(Button)
      .simulate('click');

    wrapper
      .find('#weapon-info-name')
      .hostNodes()
      .simulate('change', { target: { name: 'name', value: 'foo' } });

    const managedContent = wrapper.find(ManagedContent);

    expect(managedContent.props().warn).toBe(true);
  });

  it('should call addWeaponInfo if the form is submitted', () => {
    const addWeaponInfo = jest.fn();

    const weaponInfo = { id: '1234', name: 'foo', wikiLink: 'bar' };

    wrapper = mount(
      <WeaponInfo addWeaponInfo={addWeaponInfo} weaponInfo={weaponInfo} />,
    );

    wrapper
      .find(ManagedContent)
      .find(Button)
      .simulate('click');

    wrapper
      .find('#side-drawer-form-submit')
      .hostNodes()
      .simulate('click');

    expect(addWeaponInfo).toBeCalledWith(weaponInfo);
  });
});
