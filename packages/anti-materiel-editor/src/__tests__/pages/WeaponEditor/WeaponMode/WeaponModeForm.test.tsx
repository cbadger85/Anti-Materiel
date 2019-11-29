import React from 'react';
import { ReactWrapper, mount } from 'enzyme';
import { WeaponModeForm } from '../../../../pages/WeaponEditor/WeaponMode/WeaponModeForm';
import { Input } from '../../../../components/Input/Input';
import { ItemForm } from '../../../../pages/WeaponEditor/WeaponMode/ItemForm';
import { Button } from '../../../../components/Button/Button';

describe('<WeaponModeForm />', () => {
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

  const initialData = {
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
  };

  it('should submit the data when the form is filled out and the submit button is pressed', () => {
    const onSubmit = jest.fn();

    wrapper = mount(
      <WeaponModeForm
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

  it('should call onDataChange if the there is no initialData and the fields have data', () => {
    const onDataChange = jest.fn();
    wrapper = mount(
      <WeaponModeForm
        closeSideDrawer={jest.fn()}
        onCancel={jest.fn()}
        onDataChange={jest.fn()}
        onSubmit={jest.fn()}
        initialData={initialData}
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
      <WeaponModeForm
        closeSideDrawer={jest.fn()}
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

  it('should call addItem when adding a list item', () => {
    const onSubmit = jest.fn();

    const initialData = {
      name: 'ML (blast mode)',
      damage: '14',
      burst: '1',
      ammo: [],
      combinedAmmo: false,
      traits: [{ name: 'anti-materiel', wikiLink: 'foo.com' }],
      shortRangeBand: { min: '0', max: '8', modifier: '-3' },
      mediumRangeBand: { min: '8', max: '24', modifier: '0' },
      longRangeBand: { min: '24', max: '40', modifier: '+3' },
      maximumRangeBand: { min: '40', max: '96', modifier: '-3' },
    };

    wrapper = mount(
      <WeaponModeForm
        closeSideDrawer={jest.fn()}
        onCancel={jest.fn()}
        onDataChange={jest.fn()}
        onSubmit={onSubmit}
        initialData={initialData}
      />,
    );

    wrapper
      .find('#weapon-mode-add-ammo-name')
      .hostNodes()
      .simulate('change', { target: { name: 'name', value: 'foo' } });

    wrapper
      .find('#weapon-mode-add-ammo-wiki-link')
      .hostNodes()
      .simulate('change', { target: { name: 'wikiLink', value: 'bar' } });

    wrapper
      .find('#weapon-mode-add-ammo-button')
      .hostNodes()
      .simulate('click');

    wrapper
      .find('#side-drawer-form-submit')
      .hostNodes()
      .simulate('click');

    expect(onSubmit).toHaveBeenCalledWith({
      ...initialData,
      ammo: [{ name: 'foo', wikiLink: 'bar' }],
    });
  });

  it('should not add the item if it already exists', () => {
    const onSubmit = jest.fn();

    const initialData = {
      name: 'ML (blast mode)',
      damage: '14',
      burst: '1',
      ammo: [{ name: 'foo', wikiLink: 'bar' }],
      combinedAmmo: false,
      traits: [{ name: 'anti-materiel', wikiLink: 'foo.com' }],
      shortRangeBand: { min: '0', max: '8', modifier: '-3' },
      mediumRangeBand: { min: '8', max: '24', modifier: '0' },
      longRangeBand: { min: '24', max: '40', modifier: '+3' },
      maximumRangeBand: { min: '40', max: '96', modifier: '-3' },
    };

    wrapper = mount(
      <WeaponModeForm
        closeSideDrawer={jest.fn()}
        onCancel={jest.fn()}
        onDataChange={jest.fn()}
        onSubmit={onSubmit}
        initialData={initialData}
      />,
    );

    wrapper
      .find('#weapon-mode-add-ammo-name')
      .hostNodes()
      .simulate('change', { target: { name: 'name', value: 'foo' } });

    wrapper
      .find('#weapon-mode-add-ammo-wiki-link')
      .hostNodes()
      .simulate('change', { target: { name: 'wikiLink', value: 'bar' } });

    wrapper
      .find('#weapon-mode-add-ammo-button')
      .hostNodes()
      .simulate('click');

    wrapper
      .find('#side-drawer-form-submit')
      .hostNodes()
      .simulate('click');

    expect(onSubmit).toHaveBeenCalledWith(initialData);
  });

  it('should remove an item from the list when the delete button is pressed', () => {
    const onSubmit = jest.fn();

    const initialData = {
      name: 'ML (blast mode)',
      damage: '14',
      burst: '1',
      ammo: [{ name: 'faa', wikiLink: 'bor' }],
      combinedAmmo: false,
      traits: [{ name: 'anti-materiel', wikiLink: 'foo.com' }],
      shortRangeBand: { min: '0', max: '8', modifier: '-3' },
      mediumRangeBand: { min: '8', max: '24', modifier: '0' },
      longRangeBand: { min: '24', max: '40', modifier: '+3' },
      maximumRangeBand: { min: '40', max: '96', modifier: '-3' },
    };

    wrapper = mount(
      <WeaponModeForm
        closeSideDrawer={jest.fn()}
        onCancel={jest.fn()}
        onDataChange={jest.fn()}
        onSubmit={onSubmit}
        initialData={initialData}
      />,
    );

    wrapper
      .find('#weapon-mode-add-ammo-name')
      .hostNodes()
      .simulate('change', { target: { name: 'name', value: 'foo' } });

    wrapper
      .find('#weapon-mode-add-ammo-wiki-link')
      .hostNodes()
      .simulate('change', { target: { name: 'wikiLink', value: 'bar' } });

    wrapper
      .find('#weapon-mode-add-ammo-button')
      .hostNodes()
      .simulate('click');

    wrapper
      .find('#faa-ammo-list-item-delete')
      .hostNodes()
      .simulate('click');

    wrapper
      .find('#side-drawer-form-submit')
      .hostNodes()
      .simulate('click');

    expect(onSubmit).toHaveBeenCalledWith({
      ...initialData,
      ammo: [{ name: 'foo', wikiLink: 'bar' }],
    });
  });
});
