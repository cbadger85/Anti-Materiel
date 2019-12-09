import { Equipment } from '@anti-materiel/types';
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
import { EquipmentEditor } from '../../../pages/EquipmentEditor/EquipmentEditor';
import { EquipmentInfo } from '../../../pages/EquipmentEditor/EquipmentInfo';
import { EquipmentInfoForm } from '../../../pages/EquipmentEditor/EquipmentInfoForm';
import rootReducer from '../../../store/rootReducer';

const equipment: Equipment = {
  id: '1234',
  name: 'foo',
  wikiLink: '',
};

describe('<EquipmentEditor />', () => {
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
        equipment: [equipment],
      },
    });

    wrapper = mount(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/equipment']}>
          <Route exact path="/equipment">
            <EquipmentEditor />
          </Route>
        </MemoryRouter>
      </Provider>,
    );

    const emptyContent = wrapper
      .find(EquipmentEditor)
      .find('.empty-content')
      .hostNodes();

    expect(emptyContent).toHaveLength(1);
  });

  it('should have content if there is an id in the path', () => {
    const store = configureStore({
      reducer: rootReducer,
      preloadedState: {
        equipment: [equipment],
      },
    });

    wrapper = mount(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/equipment/1234']}>
          <Route exact path="/equipment/:id">
            <EquipmentEditor />
          </Route>
        </MemoryRouter>
      </Provider>,
    );

    const emptyContent = wrapper
      .find(EquipmentEditor)
      .find('.empty-content')
      .hostNodes();

    expect(emptyContent).toHaveLength(0);
  });

  it('should have a disabled save button if nothing has been added', () => {
    const store = configureStore({
      reducer: rootReducer,
      preloadedState: {
        equipment: [],
      },
    });

    wrapper = mount(
      <Provider store={store}>
        <MemoryRouter>
          <EquipmentEditor />
        </MemoryRouter>
      </Provider>,
    );

    const saveButton = wrapper.find('#editor-save-button').hostNodes();

    expect(saveButton.props().disabled).toBe(true);
  });

  it('should have a disabled save button if equipment is loaded but nothing is edited', () => {
    const store = configureStore({
      reducer: rootReducer,
      preloadedState: {
        equipment: [equipment],
      },
    });

    wrapper = mount(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/equipment/1234']}>
          <Route exact path="/equipment/:id">
            <EquipmentEditor />
          </Route>
        </MemoryRouter>
      </Provider>,
    );

    const saveButton = wrapper.find('#editor-save-button').hostNodes();

    expect(saveButton.props().disabled).toBe(true);
  });

  it('should not have a disabled save button if the content has been changed', () => {
    const store = configureStore({
      reducer: rootReducer,
      preloadedState: {
        equipment: [equipment],
      },
    });

    wrapper = mount(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/equipment/1234']}>
          <Route exact path="/equipment/:id">
            <EquipmentEditor />
          </Route>
        </MemoryRouter>
      </Provider>,
    );

    wrapper
      .find(EquipmentInfo)
      .find(Button)
      .simulate('click');

    wrapper
      .find(EquipmentInfoForm)
      .find('input')
      .first()
      .simulate('change', { target: { name: 'name', value: 'baz' } });

    wrapper
      .find('#side-drawer-form-submit')
      .hostNodes()
      .simulate('click');

    const saveButton = wrapper.find('#editor-save-button').hostNodes();

    expect(saveButton.props().disabled).toBe(false);
  });

  it('should show a toast after save', () => {
    const store = configureStore({
      reducer: rootReducer,
      preloadedState: {
        equipment: [equipment],
      },
    });

    wrapper = mount(
      <Provider store={store}>
        <ToastProvider>
          <MemoryRouter
            initialEntries={['/equipment/1234']}
            getUserConfirmation={(message, callback) => callback(false)}
          >
            <Route exact path="/equipment/:id">
              <EquipmentEditor />
            </Route>
          </MemoryRouter>
        </ToastProvider>
      </Provider>,
    );

    wrapper
      .find(EquipmentInfo)
      .find(Button)
      .simulate('click');

    wrapper
      .find(EquipmentInfoForm)
      .find('input')
      .first()
      .simulate('change', { target: { name: 'name', value: 'baz' } });

    wrapper
      .find('#side-drawer-form-submit')
      .hostNodes()
      .simulate('click');

    wrapper
      .find('#editor-save-button')
      .hostNodes()
      .simulate('click');

    const toast = wrapper.find(Toast);

    expect(toast).toHaveLength(1);
  });

  it('should add the equipment to the equipment list', () => {
    const store = configureStore({
      reducer: rootReducer,
      preloadedState: {
        equipment: [equipment],
      },
    });

    wrapper = mount(
      <Provider store={store}>
        <MemoryRouter
          initialEntries={['/equipment/1234']}
          getUserConfirmation={(message, callback) => callback(false)}
        >
          <Route exact path="/equipment/:id">
            <EquipmentEditor />
          </Route>
        </MemoryRouter>
      </Provider>,
    );

    wrapper
      .find(EquipmentInfo)
      .find(Button)
      .simulate('click');

    wrapper
      .find(EquipmentInfoForm)
      .find('input')
      .first()
      .simulate('change', { target: { name: 'name', value: 'baz' } });

    wrapper
      .find('#side-drawer-form-submit')
      .hostNodes()
      .simulate('click');

    wrapper
      .find('#editor-save-button')
      .hostNodes()
      .simulate('click');

    const item = wrapper.find(SidePanelItem).find('span');

    expect(item.text()).toBe('baz');
  });

  it('should prompt with a modal if you remove an item', () => {
    const store = configureStore({
      reducer: rootReducer,
      preloadedState: {
        equipment: [equipment],
      },
    });

    wrapper = mount(
      <Provider store={store}>
        <MemoryRouter
          initialEntries={['/equipment/1234']}
          getUserConfirmation={(message, callback) => callback(false)}
        >
          <Route exact path="/equipment/:id">
            <EquipmentEditor />
          </Route>
        </MemoryRouter>
      </Provider>,
    );

    wrapper
      .find('#editor-delete-button')
      .hostNodes()
      .simulate('click');

    const modal = wrapper.find(ConfirmModal).last();

    expect(modal.props().isShown).toBe(true);
  });

  it('should hide the modal if cancel is clicked', () => {
    const store = configureStore({
      reducer: rootReducer,
      preloadedState: {
        equipment: [equipment],
      },
    });

    wrapper = mount(
      <Provider store={store}>
        <MemoryRouter
          initialEntries={['/equipment/1234']}
          getUserConfirmation={(message, callback) => callback(false)}
        >
          <Route exact path="/equipment/:id">
            <EquipmentEditor />
          </Route>
        </MemoryRouter>
      </Provider>,
    );

    wrapper
      .find('#editor-delete-button')
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
        equipment: [equipment],
      },
    });

    wrapper = mount(
      <Provider store={store}>
        <MemoryRouter
          initialEntries={['/equipment/1234']}
          getUserConfirmation={(message, callback) => callback(false)}
        >
          <Route exact path="/equipment/:id">
            <EquipmentEditor />
          </Route>
        </MemoryRouter>
      </Provider>,
    );

    wrapper
      .find('#editor-delete-button')
      .hostNodes()
      .simulate('click');

    wrapper
      .find(ConfirmModal)
      .last()
      .find(Button)
      .last()
      .simulate('click');

    const modal = wrapper.find(ConfirmModal).last();

    expect(modal.props().isShown).toBe(false);
  });

  it('should remove the item if ok is clicked', () => {
    const store = configureStore({
      reducer: rootReducer,
      preloadedState: {
        equipment: [equipment],
      },
    });

    wrapper = mount(
      <Provider store={store}>
        <MemoryRouter
          initialEntries={['/equipment/1234']}
          getUserConfirmation={(message, callback) => callback(false)}
        >
          <Route exact path="/equipment/:id">
            <EquipmentEditor />
          </Route>
        </MemoryRouter>
      </Provider>,
    );

    wrapper
      .find('#editor-delete-button')
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
        equipment: [equipment],
      },
    });

    wrapper = mount(
      <Provider store={store}>
        <ToastProvider>
          <MemoryRouter
            initialEntries={['/equipment/1234']}
            getUserConfirmation={(message, callback) => callback(false)}
          >
            <Route exact path="/equipment/:id">
              <EquipmentEditor />
            </Route>
          </MemoryRouter>
        </ToastProvider>
      </Provider>,
    );

    wrapper
      .find('#editor-delete-button')
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
