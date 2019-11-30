import { mount, ReactWrapper, shallow } from 'enzyme';
import React from 'react';
import { Button } from '../../../../components/Button/Button';
import { ManagedContent } from '../../../../components/ManagedContent/ManagedContent';
import { WeaponMode } from '../../../../pages/WeaponEditor/WeaponMode/WeaponMode';
import { WeaponModeForm } from '../../../../pages/WeaponEditor/WeaponMode/WeaponModeForm';
import { WeaponModesContent } from '../../../../pages/WeaponEditor/WeaponMode/WeaponModesContent';

describe('<WeaonMode />', () => {
  let wrapper: ReactWrapper<any, Readonly<{}>, React.Component<{}, {}, any>>;

  afterEach(() => {
    if (wrapper && wrapper.length > 0) {
      wrapper.unmount();
    }
  });

  // add a div with #modal-root id to the global body
  //@ts-ignore
  const modalRoot = global.document.createElement('div');
  modalRoot.setAttribute('id', 'modal-root');
  //@ts-ignore
  const body = global.document.querySelector('body');
  body.appendChild(modalRoot);

  const updateWeaponModes = jest.fn();
  const removeWeaponMode = jest.fn();

  const weaponModes = [
    {
      name: 'ML (blast mode)',
      damage: '14',
      burst: '1',
      ammo: [{ name: 'EXP', wikiLink: 'foo.com' }],
      combinedAmmo: false,
      traits: [{ name: 'anti-materiel', wikiLink: 'foo.com' }],
      shortRangeBand: { min: '0', max: '8', modifier: '-3' },
      mediumRangeBand: { min: '8', max: '24', modifier: '0' },
      longRangeBand: { min: '24', max: '40', modifier: '+3' },
      maximumRangeBand: { min: '40', max: '96', modifier: '-3' },
    },
  ];

  it('should start with warn set to false', () => {
    const wrapper = shallow(
      <WeaponMode
        updateWeaponModes={updateWeaponModes}
        removeWeaponMode={removeWeaponMode}
        weaponModes={[]}
      />,
    );

    const managedContent = wrapper.find(ManagedContent);

    expect(managedContent.props().warn).toBe(false);
  });

  it('should set warn to true if any content is edited', () => {
    wrapper = mount(
      <WeaponMode
        updateWeaponModes={updateWeaponModes}
        removeWeaponMode={removeWeaponMode}
        weaponModes={[]}
      />,
    );

    wrapper
      .find(ManagedContent)
      .find(Button)
      .simulate('click');

    wrapper
      .find(WeaponModeForm)
      .find('input')
      .hostNodes()
      .first()
      .simulate('change', { target: { name: 'name', value: 'foo' } });

    const managedContent = wrapper.find(ManagedContent);

    expect(managedContent.props().warn).toBe(true);
  });

  it('should set the initialData to the weaponMode that edit is clicked on', () => {
    wrapper = mount(
      <WeaponMode
        updateWeaponModes={updateWeaponModes}
        removeWeaponMode={removeWeaponMode}
        weaponModes={weaponModes}
      />,
    );

    wrapper
      .find(WeaponModesContent)
      .find(Button)
      .first()
      .simulate('click');

    const weaponModeForm = wrapper.find(WeaponModeForm);

    expect(weaponModeForm.props().initialData).toEqual(weaponModes[0]);
  });

  it('should set initialData to undefined when the SideDrawer is closed', () => {
    wrapper = mount(
      <WeaponMode
        updateWeaponModes={updateWeaponModes}
        removeWeaponMode={removeWeaponMode}
        weaponModes={weaponModes}
      />,
    );

    wrapper
      .find(WeaponModesContent)
      .find(Button)
      .first()
      .simulate('click');

    wrapper
      .find('#side-drawer-form-cancel')
      .hostNodes()
      .simulate('click');

    const weaponModeForm = wrapper.find(WeaponModeForm);

    expect(weaponModeForm.props().initialData).toEqual(undefined);
  });
});
