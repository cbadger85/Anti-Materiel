import React from 'react';
import { shallow, mount, ReactWrapper } from 'enzyme';
import {
  WeaponModeRangeBandCell,
  ItemLink,
  WeaponModeAmmoCell,
  WeaponModeTraitsCell,
  WeaponModeContentItem,
  WeaponModesContent,
} from '../../../../pages/WeaponEditor/WeaponMode/WeaponModesContent';
import { Button } from '../../../../components/Button/Button';
import { ConfirmModal } from '../../../../components/Modal/ConfirmModal';

describe('<WeaonModeContent />', () => {
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

  const weaponModes = [
    {
      name: 'foo',
      damage: '12',
      burst: '1',
      ammo: [],
      combinedAmmo: false,
      traits: [],
    },
    {
      name: 'bar',
      damage: '12',
      burst: '1',
      ammo: [],
      combinedAmmo: false,
      traits: [],
    },
  ];

  it('should show the weaponModes if content is provided', () => {
    const wrapper = shallow(
      <WeaponModesContent
        weaponModes={weaponModes}
        editWeaponMode={jest.fn}
        removeWeaponMode={jest.fn}
      />,
    );

    const items = wrapper.find(WeaponModeContentItem);

    expect(items).toHaveLength(2);
  });

  it('should show the placeholder if no content is provided', () => {
    const wrapper = shallow(
      <WeaponModesContent
        weaponModes={[]}
        editWeaponMode={jest.fn}
        removeWeaponMode={jest.fn}
      />,
    );

    const placeholder = wrapper.find('.empty-content').hostNodes();

    expect(placeholder).toHaveLength(1);
  });

  describe('<WeaponModeRangeBandCell', () => {
    it('should show the range bands if they are provided', () => {
      const weaponRangeBand = { min: '0', max: '8', modifier: '0' };

      const wrapper = shallow(
        <WeaponModeRangeBandCell rangeBand={weaponRangeBand} />,
      );

      const expectedText = `0-8" 0`;

      expect(wrapper.text()).toBe(expectedText);
    });

    it('should show a placeholder if the rangebands are not provided', () => {
      const wrapper = shallow(<WeaponModeRangeBandCell />);

      const expectedText = `--`;

      expect(wrapper.text()).toBe(expectedText);
    });
  });

  describe('<ItemLink />', () => {
    it('should show an anchor tag if a wikiLink is provided', () => {
      const item = { name: 'foo', wikiLink: 'bar.com' };
      const wrapper = shallow(<ItemLink item={item} />);

      const anchor = wrapper.find('a').hostNodes();

      expect(anchor).toHaveLength(1);
    });

    it('should show a span if a wikiLink is not provided', () => {
      const item = { name: 'foo' };
      const wrapper = shallow(<ItemLink item={item} />);

      const anchor = wrapper.find('span').hostNodes();

      expect(anchor).toHaveLength(1);
    });
  });

  describe('<WeaponModeAmmoCell />', () => {
    it('should show a slash betwen the ammo if the ammo is provided but they are not combined', () => {
      const ammo = [{ name: 'AP' }, { name: 'Shock' }];

      wrapper = mount(<WeaponModeAmmoCell ammo={ammo} />);

      expect(wrapper.text()).toBe('AP/Shock');
    });

    it('should show a + betwen the ammo if the ammo is provided and they are not combined', () => {
      const ammo = [{ name: 'AP' }, { name: 'EXP' }];

      const wrapper = mount(<WeaponModeAmmoCell ammo={ammo} combinedAmmo />);

      expect(wrapper.text()).toBe('AP+EXP');
    });

    it('should show a placeholder if no ammo is provided', () => {
      wrapper = mount(<WeaponModeAmmoCell ammo={[]} />);

      expect(wrapper.text()).toBe('--');
    });
  });

  describe('<WeaponModeTraitsCell />', () => {
    it('should show a comma between traits', () => {
      const traits = [{ name: 'Suppressive Fire' }, { name: 'Non-Lootable' }];

      wrapper = mount(<WeaponModeTraitsCell traits={traits} />);

      expect(wrapper.text()).toBe('Suppressive Fire, Non-Lootable');
    });

    it('should show nothing if no traits are provided', () => {
      wrapper = mount(<WeaponModeTraitsCell traits={[]} />);

      expect(wrapper.text()).toBeFalsy();
    });
  });

  describe('<WeaponModeContentItem', () => {
    const weaponMode = {
      name: 'foo',
      damage: '12',
      burst: '1',
      ammo: [],
      combinedAmmo: false,
      traits: [],
    };
    const editWeaponMode = jest.fn();
    const removeWeaponMode = jest.fn();

    it('should call editWeaponMode if the edit button is pressed', () => {
      const wrapper = shallow(
        <WeaponModeContentItem
          weaponMode={weaponMode}
          editWeaponMode={editWeaponMode}
          removeWeaponMode={removeWeaponMode}
        />,
      );

      wrapper
        .find(Button)
        .first()
        .simulate('click');

      expect(editWeaponMode).toBeCalledWith('foo');
    });

    it('should show the modal if the delete button is pressed', () => {
      const wrapper = shallow(
        <WeaponModeContentItem
          weaponMode={weaponMode}
          editWeaponMode={editWeaponMode}
          removeWeaponMode={removeWeaponMode}
        />,
      );

      wrapper
        .find(Button)
        .last()
        .simulate('click');

      const modal = wrapper.find(ConfirmModal);

      expect(modal.props().isShown).toBe(true);
    });

    it('should close the modal if cancel is pressed', () => {
      wrapper = mount(
        <WeaponModeContentItem
          weaponMode={weaponMode}
          editWeaponMode={editWeaponMode}
          removeWeaponMode={removeWeaponMode}
        />,
      );

      wrapper
        .find(Button)
        .last()
        .simulate('click');

      wrapper
        .find(ConfirmModal)
        .find(Button)
        .first()
        .simulate('click');

      const modal = wrapper.find(ConfirmModal);

      expect(modal.props().isShown).toBe(false);
    });

    it('should call removeWeaponMode if the modal ok button is pressed', () => {
      wrapper = mount(
        <WeaponModeContentItem
          weaponMode={weaponMode}
          editWeaponMode={editWeaponMode}
          removeWeaponMode={removeWeaponMode}
        />,
      );

      wrapper
        .find(Button)
        .last()
        .simulate('click');

      wrapper
        .find(ConfirmModal)
        .find(Button)
        .last()
        .simulate('click');

      expect(removeWeaponMode).toBeCalledWith('foo');
    });
  });
});
