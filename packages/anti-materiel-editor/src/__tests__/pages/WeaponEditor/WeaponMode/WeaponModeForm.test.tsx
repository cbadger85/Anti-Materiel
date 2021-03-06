import { mount, ReactWrapper } from 'enzyme';
import React from 'react';
import { WeaponModeForm } from '../../../../pages/WeaponEditor/WeaponMode/WeaponModeForm';
import uuid from 'uuid/v4';

jest.mock('uuid/v4', () => jest.fn().mockReturnValue('1234'));

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
    if (wrapper && wrapper.length > 0) {
      wrapper.unmount();
    }
  });

  const initialData = {
    id: '1234',
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
        onCancel={jest.fn()}
        onDataChange={onDataChange}
        onSubmit={jest.fn()}
        initialData={initialData}
      />,
    );

    wrapper
      .find('input')
      .first()
      .simulate('change', { target: { name: 'name', value: 'test' } });

    wrapper
      .find('#side-drawer-form-cancel')
      .last()
      .simulate('click');

    expect(onDataChange).lastCalledWith(true);
  });

  it('should not allow submission if the data is invalid', () => {
    wrapper = mount(
      <WeaponModeForm
        onCancel={jest.fn()}
        onDataChange={jest.fn()}
        onSubmit={jest.fn()}
      />,
    );

    const submitButton = wrapper.find('#side-drawer-form-submit').last();

    expect(submitButton.props().disabled).toBe(true);
  });

  it('should call onSubmit when adding a list item', () => {
    const onSubmit = jest.fn();

    const initialData = {
      id: '1234',
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

  it('should generate a uuid if none exists', () => {
    const onSubmit = jest.fn();

    const initialData = {
      id: '',
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

    expect(uuid).toHaveBeenCalled();
  });

  it('should not add the item if it already exists', () => {
    const onSubmit = jest.fn();

    const initialData = {
      id: '1234',
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
      id: '1234',
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
