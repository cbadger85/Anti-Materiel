import { Weapon } from '@anti-materiel/types';
import { configureStore } from '@reduxjs/toolkit';
import { mount, ReactWrapper } from 'enzyme';
import React from 'react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router';
import { Button } from '../../../components/Button/Button';
import { SidePanelItem } from '../../../components/SidePanelItem/SidePanelItem';
import { Toast } from '../../../components/Toasts/Toast';
import { ToastProvider } from '../../../components/Toasts/ToastProvider';
import { WeaponEditor } from '../../../pages/WeaponEditor/WeaponEditor';
import { WeaponInfo } from '../../../pages/WeaponEditor/WeaponInfo/WeaponInfo';
import { WeaponInfoForm } from '../../../pages/WeaponEditor/WeaponInfo/WeaponInfoForm';
import rootReducer from '../../../store/rootReducer';

const weapon: Weapon = {
  name: 'foo',
  id: '1234',
  wikiLink: undefined,
  weaponModes: [
    {
      name: 'bar',
      damage: '1',
      burst: '2',
      ammo: [],
      combinedAmmo: false,
      traits: [],
      weaponRange: {
        short: { min: '0', max: '8', modifier: '+3' },
        medium: { min: '8', max: '24', modifier: '-3' },
        long: undefined,
        maximum: undefined,
      },
    },
  ],
};

describe('<WeaponEditor />', () => {
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

  it('should have a disabled save button if nothing has been added', () => {
    const store = configureStore({
      reducer: rootReducer,
      preloadedState: {
        weapons: [],
      },
    });

    wrapper = mount(
      <Provider store={store}>
        <MemoryRouter>
          <WeaponEditor />
        </MemoryRouter>
      </Provider>,
    );

    const saveButton = wrapper.find('#weapon-editor-save-button').hostNodes();

    expect(saveButton.props().disabled).toBe(true);
  });

  it('should have a disabled save button if a weapon is loaded but nothing is edited', () => {
    const store = configureStore({
      reducer: rootReducer,
      preloadedState: {
        weapons: [weapon],
      },
    });

    wrapper = mount(
      <Provider store={store}>
        <MemoryRouter>
          <WeaponEditor />
        </MemoryRouter>
      </Provider>,
    );

    wrapper
      .find(SidePanelItem)
      .find('button')
      .simulate('click');

    const saveButton = wrapper.find('#weapon-editor-save-button').hostNodes();

    expect(saveButton.props().disabled).toBe(true);
  });

  it('should not have a disabled save button if the content has been changed', () => {
    const store = configureStore({
      reducer: rootReducer,
      preloadedState: {
        weapons: [weapon],
      },
    });

    wrapper = mount(
      <Provider store={store}>
        <MemoryRouter>
          <WeaponEditor />
        </MemoryRouter>
      </Provider>,
    );

    wrapper
      .find(SidePanelItem)
      .find('button')
      .simulate('click');

    wrapper
      .find(WeaponInfo)
      .find(Button)
      .simulate('click');

    wrapper
      .find(WeaponInfoForm)
      .find('input')
      .first()
      .simulate('change', { target: { name: 'name', value: 'baz' } });

    wrapper
      .find('#side-drawer-form-submit')
      .hostNodes()
      .simulate('click');

    const saveButton = wrapper.find('#weapon-editor-save-button').hostNodes();

    expect(saveButton.props().disabled).toBe(false);
  });

  it('should show a toast after save', () => {
    const store = configureStore({
      reducer: rootReducer,
      preloadedState: {
        weapons: [weapon],
      },
    });

    wrapper = mount(
      <Provider store={store}>
        <ToastProvider>
          <MemoryRouter>
            <WeaponEditor />
          </MemoryRouter>
        </ToastProvider>
      </Provider>,
    );

    wrapper
      .find(SidePanelItem)
      .find('button')
      .simulate('click');

    wrapper
      .find(WeaponInfo)
      .find(Button)
      .simulate('click');

    wrapper
      .find(WeaponInfoForm)
      .find('input')
      .first()
      .simulate('change', { target: { name: 'name', value: 'baz' } });

    wrapper
      .find('#side-drawer-form-submit')
      .hostNodes()
      .simulate('click');

    wrapper
      .find('#weapon-editor-save-button')
      .hostNodes()
      .simulate('click');

    const toast = wrapper.find(Toast);

    expect(toast).toHaveLength(1);
  });

  it('should add the weapon to the weapon list', () => {
    const store = configureStore({
      reducer: rootReducer,
      preloadedState: {
        weapons: [weapon],
      },
    });

    wrapper = mount(
      <Provider store={store}>
        <MemoryRouter>
          <WeaponEditor />
        </MemoryRouter>
      </Provider>,
    );

    wrapper
      .find(SidePanelItem)
      .find('button')
      .simulate('click');

    wrapper
      .find(WeaponInfo)
      .find(Button)
      .simulate('click');

    wrapper
      .find(WeaponInfoForm)
      .find('input')
      .first()
      .simulate('change', { target: { name: 'name', value: 'baz' } });

    wrapper
      .find('#side-drawer-form-submit')
      .hostNodes()
      .simulate('click');

    wrapper
      .find('#weapon-editor-save-button')
      .hostNodes()
      .simulate('click');

    const item = wrapper.find(SidePanelItem).find('span');

    expect(item.text()).toBe('baz');
  });
});
