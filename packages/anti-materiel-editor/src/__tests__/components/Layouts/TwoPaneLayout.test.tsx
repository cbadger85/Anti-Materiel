import { shallow, ReactWrapper, mount } from 'enzyme';
import React from 'react';
import { TwoPaneLayout } from '../../../components/Layouts/TwoPaneLayout';
import { ConfirmModal } from '../../../components/Modal/ConfirmModal';
import { Button } from '../../../components/Button/Button';
import { MemoryRouter } from 'react-router-dom';

describe('<TwoPaneLayout />', () => {
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

  it('Shows the provided side panel', () => {
    const SidePanel = jest.fn();

    wrapper = mount(
      <MemoryRouter
        getUserConfirmation={(message, callback) => callback(false)}
      >
        <TwoPaneLayout
          title=""
          uri="test"
          mainContent={jest.fn()}
          sidePanelContent={SidePanel}
          onSave={jest.fn()}
          onDelete={jest.fn()}
        />
      </MemoryRouter>,
    );

    expect(SidePanel).toHaveBeenCalledWith('test');
  });

  it('Shows the provided main content', () => {
    const Main = jest.fn();

    wrapper = mount(
      <MemoryRouter
        getUserConfirmation={(message, callback) => callback(false)}
      >
        <TwoPaneLayout
          title=""
          uri="test"
          mainContent={Main}
          sidePanelContent={jest.fn()}
          onSave={jest.fn()}
          onDelete={jest.fn()}
        />
      </MemoryRouter>,
    );

    expect(Main).toHaveBeenCalled();
  });

  it('Shows the title', () => {
    const title = 'test title';

    wrapper = mount(
      <MemoryRouter
        getUserConfirmation={(message, callback) => callback(false)}
      >
        <TwoPaneLayout
          title={title}
          uri="test"
          mainContent={jest.fn()}
          sidePanelContent={jest.fn()}
          onSave={jest.fn()}
          onDelete={jest.fn()}
        />
      </MemoryRouter>,
    );

    const foundTitle = wrapper.find('h1');

    expect(foundTitle.text()).toBe(title);
  });

  it('should disable the save button', () => {
    wrapper = mount(
      <MemoryRouter
        getUserConfirmation={(message, callback) => callback(false)}
      >
        <TwoPaneLayout
          title=""
          uri="test"
          mainContent={jest.fn()}
          sidePanelContent={jest.fn()}
          onSave={jest.fn()}
          onDelete={jest.fn()}
          isSaveDisabled
        />
      </MemoryRouter>,
    );

    const saveButton = wrapper.find('#editor-save-button').hostNodes();

    expect(saveButton.props().disabled).toBe(true);
  });

  it('should enable the save button', () => {
    wrapper = mount(
      <MemoryRouter
        getUserConfirmation={(message, callback) => callback(false)}
      >
        <TwoPaneLayout
          title=""
          uri="test"
          mainContent={jest.fn()}
          sidePanelContent={jest.fn()}
          onSave={jest.fn()}
          onDelete={jest.fn()}
        />
      </MemoryRouter>,
    );

    const saveButton = wrapper.find('#editor-save-button').hostNodes();

    expect(saveButton.props().disabled).toBeFalsy();
  });

  it('should call onSave', () => {
    const onSave = jest.fn();

    wrapper = mount(
      <MemoryRouter
        getUserConfirmation={(message, callback) => callback(false)}
      >
        <TwoPaneLayout
          title=""
          uri="test"
          mainContent={jest.fn()}
          sidePanelContent={jest.fn()}
          onSave={onSave}
          onDelete={jest.fn()}
        />
      </MemoryRouter>,
    );

    wrapper
      .find('#editor-save-button')
      .hostNodes()
      .simulate('click');

    expect(onSave).toBeCalled();
  });

  it('should hide the delete button', () => {
    wrapper = mount(
      <MemoryRouter
        getUserConfirmation={(message, callback) => callback(false)}
      >
        <TwoPaneLayout
          title=""
          uri="test"
          mainContent={jest.fn()}
          sidePanelContent={jest.fn()}
          onSave={jest.fn()}
          onDelete={jest.fn()}
        />
      </MemoryRouter>,
    );

    const deleteButton = wrapper.find('#editor-delete-button').hostNodes();

    expect(deleteButton.exists()).toBe(false);
  });

  it('should show the delete button', () => {
    wrapper = mount(
      <MemoryRouter
        getUserConfirmation={(message, callback) => callback(false)}
      >
        <TwoPaneLayout
          title=""
          uri="test"
          mainContent={jest.fn()}
          sidePanelContent={jest.fn()}
          onSave={jest.fn()}
          onDelete={jest.fn()}
          isDeleteShown
        />
      </MemoryRouter>,
    );

    const deleteButton = wrapper.find('#editor-delete-button').hostNodes();

    expect(deleteButton.exists()).toBe(true);
  });

  it('should show the confirmation modal', () => {
    const onDelete = jest.fn();

    wrapper = mount(
      <MemoryRouter
        getUserConfirmation={(message, callback) => callback(false)}
      >
        <TwoPaneLayout
          title=""
          uri="test"
          mainContent={jest.fn()}
          sidePanelContent={jest.fn()}
          onSave={jest.fn()}
          onDelete={onDelete}
          isDeleteShown
        />
      </MemoryRouter>,
    );

    wrapper
      .find('#editor-delete-button')
      .hostNodes()
      .simulate('click');

    const confirmModal = wrapper.find(ConfirmModal);

    expect(confirmModal.props().isShown).toBe(true);
  });

  it('should hide the modal when cancel is clicked', () => {
    const onDelete = jest.fn();

    wrapper = mount(
      <MemoryRouter
        getUserConfirmation={(message, callback) => callback(false)}
      >
        <TwoPaneLayout
          title=""
          uri="test"
          mainContent={jest.fn()}
          sidePanelContent={jest.fn()}
          onSave={jest.fn()}
          onDelete={onDelete}
          isDeleteShown
        />
      </MemoryRouter>,
    );

    wrapper
      .find('#editor-delete-button')
      .hostNodes()
      .simulate('click');

    wrapper
      .find(ConfirmModal)
      .find(Button)
      .first()
      .simulate('click');

    const confirmModal = wrapper.find(ConfirmModal);

    expect(confirmModal.props().isShown).toBe(false);
  });

  it('should call onDelete when ok is clicked', () => {
    const onDelete = jest.fn();

    wrapper = mount(
      <MemoryRouter
        getUserConfirmation={(message, callback) => callback(false)}
      >
        <TwoPaneLayout
          title=""
          uri="test"
          mainContent={jest.fn()}
          sidePanelContent={jest.fn()}
          onSave={jest.fn()}
          onDelete={onDelete}
          isDeleteShown
        />
      </MemoryRouter>,
    );

    wrapper
      .find('#editor-delete-button')
      .hostNodes()
      .simulate('click');

    wrapper
      .find(ConfirmModal)
      .find(Button)
      .last()
      .simulate('click');

    expect(onDelete).toBeCalled();
  });

  it('should hide the modal when ok is clicked', () => {
    const onDelete = jest.fn();

    wrapper = mount(
      <MemoryRouter
        getUserConfirmation={(message, callback) => callback(false)}
      >
        <TwoPaneLayout
          title=""
          uri="test"
          mainContent={jest.fn()}
          sidePanelContent={jest.fn()}
          onSave={jest.fn()}
          onDelete={onDelete}
          isDeleteShown
        />
      </MemoryRouter>,
    );

    wrapper
      .find('#editor-delete-button')
      .hostNodes()
      .simulate('click');

    wrapper
      .find(ConfirmModal)
      .find(Button)
      .last()
      .simulate('click');

    const confirmModal = wrapper.find(ConfirmModal);

    expect(confirmModal.props().isShown).toBe(false);
  });
});
