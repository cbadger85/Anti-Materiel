import { Weapon } from '@anti-materiel/types';
import { configureStore } from '@reduxjs/toolkit';
import { mount, ReactWrapper } from 'enzyme';
import React from 'react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router';
import { Route } from 'react-router-dom';
import { Button } from '../../../components/Button/Button';
import { ConfirmModal } from '../../../components/Modal/ConfirmModal';
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

const weapon2: Weapon = {
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

  it('should have no content if there is no id in the path', () => {
    const store = configureStore({
      reducer: rootReducer,
      preloadedState: {
        weapons: [weapon],
      },
    });

    wrapper = mount(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/weapon-editor']}>
          <Route exact path="/weapon-editor">
            <WeaponEditor />
          </Route>
        </MemoryRouter>
      </Provider>,
    );

    const emptyContent = wrapper
      .find(WeaponEditor)
      .find('.empty-content')
      .hostNodes();

    expect(emptyContent).toHaveLength(2);
  });

  it('should have content if there is an id in the path', () => {
    const store = configureStore({
      reducer: rootReducer,
      preloadedState: {
        weapons: [weapon],
      },
    });

    wrapper = mount(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/weapon-editor/1234']}>
          <Route exact path="/weapon-editor/:id">
            <WeaponEditor />
          </Route>
        </MemoryRouter>
      </Provider>,
    );

    const emptyContent = wrapper
      .find(WeaponEditor)
      .find('.empty-content')
      .hostNodes();

    expect(emptyContent).toHaveLength(0);
  });

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
        <MemoryRouter initialEntries={['/weapon-editor/1234']}>
          <Route exact path="/weapon-editor/:id">
            <WeaponEditor />
          </Route>
        </MemoryRouter>
      </Provider>,
    );

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
        <MemoryRouter initialEntries={['/weapon-editor/1234']}>
          <Route exact path="/weapon-editor/:id">
            <WeaponEditor />
          </Route>
        </MemoryRouter>
      </Provider>,
    );

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

  it('should have a disabled save button if two modes have the same name', () => {
    const store = configureStore({
      reducer: rootReducer,
      preloadedState: {
        weapons: [weapon2],
      },
    });

    wrapper = mount(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/weapon-editor/1234']}>
          <Route exact path="/weapon-editor/:id">
            <WeaponEditor />
          </Route>
        </MemoryRouter>
      </Provider>,
    );

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

    expect(saveButton.props().disabled).toBe(true);
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
          <MemoryRouter
            initialEntries={['/weapon-editor/1234']}
            getUserConfirmation={(message, callback) => callback(false)}
          >
            <Route exact path="/weapon-editor/:id">
              <WeaponEditor />
            </Route>
          </MemoryRouter>
        </ToastProvider>
      </Provider>,
    );

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
        <MemoryRouter
          initialEntries={['/weapon-editor/1234']}
          getUserConfirmation={(message, callback) => callback(false)}
        >
          <Route exact path="/weapon-editor/:id">
            <WeaponEditor />
          </Route>
        </MemoryRouter>
      </Provider>,
    );

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

  it('should prompt with a modal if you remove an item', () => {
    const store = configureStore({
      reducer: rootReducer,
      preloadedState: {
        weapons: [weapon],
      },
    });

    wrapper = mount(
      <Provider store={store}>
        <MemoryRouter
          initialEntries={['/weapon-editor/1234']}
          getUserConfirmation={(message, callback) => callback(false)}
        >
          <Route exact path="/weapon-editor/:id">
            <WeaponEditor />
          </Route>
        </MemoryRouter>
      </Provider>,
    );

    wrapper
      .find('#weapon-editor-delete-button')
      .hostNodes()
      .simulate('click');

    const modal = wrapper.find(ConfirmModal).last();

    expect(modal.props().isShown).toBe(true);
  });

  it('should hide the modal if cancel is clicked', () => {
    const store = configureStore({
      reducer: rootReducer,
      preloadedState: {
        weapons: [weapon],
      },
    });

    wrapper = mount(
      <Provider store={store}>
        <MemoryRouter
          initialEntries={['/weapon-editor/1234']}
          getUserConfirmation={(message, callback) => callback(false)}
        >
          <Route exact path="/weapon-editor/:id">
            <WeaponEditor />
          </Route>
        </MemoryRouter>
      </Provider>,
    );

    wrapper
      .find('#weapon-editor-delete-button')
      .hostNodes()
      .simulate('click');

    wrapper
      .find(ConfirmModal)
      .last()
      .find(Button)
      .first()
      .simulate('click');

    const modal = wrapper.find(ConfirmModal).last();

    expect(modal.props().isShown).toBe(false);
  });

  it('should hide the modal if ok is clicked', () => {
    const store = configureStore({
      reducer: rootReducer,
      preloadedState: {
        weapons: [weapon],
      },
    });

    wrapper = mount(
      <Provider store={store}>
        <MemoryRouter
          initialEntries={['/weapon-editor/1234']}
          getUserConfirmation={(message, callback) => callback(false)}
        >
          <Route exact path="/weapon-editor/:id">
            <WeaponEditor />
          </Route>
        </MemoryRouter>
      </Provider>,
    );

    wrapper
      .find('#weapon-editor-delete-button')
      .hostNodes()
      .simulate('click');

    wrapper
      .find(ConfirmModal)
      .last()
      .find(Button)
      .last()
      .simulate('click');

    const modal = wrapper.find(ConfirmModal);

    expect(modal).toHaveLength(0);
  });

  it('should remove the item if ok is clicked', () => {
    const store = configureStore({
      reducer: rootReducer,
      preloadedState: {
        weapons: [weapon],
      },
    });

    wrapper = mount(
      <Provider store={store}>
        <MemoryRouter
          initialEntries={['/weapon-editor/1234']}
          getUserConfirmation={(message, callback) => callback(false)}
        >
          <Route exact path="/weapon-editor/:id">
            <WeaponEditor />
          </Route>
        </MemoryRouter>
      </Provider>,
    );

    wrapper
      .find('#weapon-editor-delete-button')
      .hostNodes()
      .simulate('click');

    wrapper
      .find(ConfirmModal)
      .last()
      .find(Button)
      .last()
      .simulate('click');

    const item = wrapper.find(SidePanelItem);

    expect(item).toHaveLength(0);
  });

  it('should show the toast when removed', () => {
    const store = configureStore({
      reducer: rootReducer,
      preloadedState: {
        weapons: [weapon],
      },
    });

    wrapper = mount(
      <Provider store={store}>
        <ToastProvider>
          <MemoryRouter
            initialEntries={['/weapon-editor/1234']}
            getUserConfirmation={(message, callback) => callback(false)}
          >
            <Route exact path="/weapon-editor/:id">
              <WeaponEditor />
            </Route>
          </MemoryRouter>
        </ToastProvider>
      </Provider>,
    );

    wrapper
      .find('#weapon-editor-delete-button')
      .hostNodes()
      .simulate('click');

    wrapper
      .find(ConfirmModal)
      .last()
      .find(Button)
      .last()
      .simulate('click');

    const toast = wrapper.find(Toast);

    expect(toast).toHaveLength(1);
  });
});
