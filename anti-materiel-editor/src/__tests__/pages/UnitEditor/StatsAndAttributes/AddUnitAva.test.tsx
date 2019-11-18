import React from 'react';
import { mount, ReactWrapper } from 'enzyme';
import { AddUnitAVA } from '../../../../pages/UnitEditor/StatsAndAttributes/AddUnitAva/AddUnitAVA';
import ReactSelect from 'react-select';
import { act } from 'react-dom/test-utils';

describe('<AddUnitAva />', () => {
  let wrapper: ReactWrapper<any, Readonly<{}>, React.Component<{}, {}, any>>;
  let root: any;

  beforeEach(() => {
    root = document.createElement('div');
    root.id = 'root';
    document.body.appendChild(root);
  });

  afterEach(() => {
    if (wrapper && wrapper.length) {
      wrapper.unmount();
    }
    document.body.removeChild(root);
  });

  it('should prevent adding a ava selections if the fields are blank', () => {
    const addUnitAva = jest.fn();

    wrapper = mount(
      <AddUnitAVA
        addUnitAva={addUnitAva}
        removeUnitAva={jest.fn}
        updateAvaList={jest.fn}
        ava={[]}
      />,
      { attachTo: root },
    );

    wrapper
      .find('#add-unit-ava-button')
      .last()
      .simulate('click');

    expect(addUnitAva).toBeCalledTimes(0);
  });

  it('should add an ava if the fields are correct', () => {
    const addUnitAva = jest.fn();

    act(() => {
      wrapper = mount(
        <AddUnitAVA
          addUnitAva={addUnitAva}
          removeUnitAva={jest.fn}
          updateAvaList={jest.fn}
          ava={[]}
        />,
        { attachTo: root },
      );
    });

    act(() => {
      wrapper
        .find(ReactSelect)
        .props()
        .onChange({ value: 'Panoceania' });

      wrapper
        .find('#add-ava-input')
        .last()
        .simulate('change', { target: { name: 'ava', value: 't' } });
    });

    act(() => {
      wrapper
        .find('#add-unit-ava-button')
        .last()
        .simulate('click');
    });

    expect(addUnitAva).toHaveBeenCalledWith({
      sectorial: 'Panoceania',
      ava: 'T',
    });
  });

  it('should show the ava header if items are present', () => {
    wrapper = mount(
      <AddUnitAVA
        addUnitAva={jest.fn}
        removeUnitAva={jest.fn}
        updateAvaList={jest.fn}
        ava={[{ sectorial: 'Panoceania', ava: 'T' }]}
      />,
      { attachTo: root },
    );

    const sectorialHeader = wrapper.find(
      '.list-item-header .list-item-ava__sectorial',
    );
    const avaHeader = wrapper.find('.list-item-header .list-item-ava__ava');

    expect(sectorialHeader.text()).toBe('Sectorial');
    expect(avaHeader.text()).toBe('AVA');
  });

  it('should not show the ava header if no items are present', () => {
    wrapper = mount(
      <AddUnitAVA
        addUnitAva={jest.fn}
        removeUnitAva={jest.fn}
        updateAvaList={jest.fn}
        ava={[]}
      />,
      { attachTo: root },
    );

    const listItemHeader = wrapper.find('.list-item-header');

    expect(listItemHeader).toHaveLength(0);
  });

  it('should show list items that are passed in', () => {
    wrapper = mount(
      <AddUnitAVA
        addUnitAva={jest.fn}
        removeUnitAva={jest.fn}
        updateAvaList={jest.fn}
        ava={[{ sectorial: 'Panoceania', ava: 'T' }]}
      />,
      { attachTo: root },
    );

    const sectorial = wrapper.find('.list-item-ava__sectorial').last();
    const ava = wrapper.find('.list-item-ava__ava').last();

    expect(sectorial.text()).toBe('Panoceania');
    expect(ava.text()).toBe('T');
  });

  it('should delete an item when the delete button is pressed', () => {
    const removeUnitAva = jest.fn();

    wrapper = mount(
      <AddUnitAVA
        addUnitAva={jest.fn}
        removeUnitAva={removeUnitAva}
        updateAvaList={jest.fn}
        ava={[{ sectorial: 'Panoceania', ava: 'T' }]}
      />,
      { attachTo: root },
    );

    wrapper
      .find('#ava-list-item-delete')
      .last()
      .simulate('click');

    expect(removeUnitAva).toHaveBeenCalled();
  });
});
