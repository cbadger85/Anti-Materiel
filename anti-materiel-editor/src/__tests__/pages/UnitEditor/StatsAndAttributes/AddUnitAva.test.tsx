import React from 'react';
import { mount } from 'enzyme';
import { AddUnitAVA } from '../../../../pages/UnitEditor/StatsAndAttributes/AddUnitAva/AddUnitAVA';
import ReactSelect from 'react-select';
import { act } from 'react-dom/test-utils';

describe('<AddUnitAva />', () => {
  it('should prevent adding a ava selections if the fields are blank', () => {
    const addUnitAva = jest.fn();

    const wrapper = mount(
      <AddUnitAVA
        addUnitAva={addUnitAva}
        removeUnitAva={jest.fn}
        updateAvaList={jest.fn}
        ava={[]}
      />,
    );

    wrapper
      .find('#add-unit-ava-button')
      .last()
      .simulate('click');

    expect(addUnitAva).toBeCalledTimes(0);
  });

  it('should add an ava if the fields are correct', () => {
    const addUnitAva = jest.fn();

    let wrapper: any;

    act(() => {
      wrapper = mount(
        <AddUnitAVA
          addUnitAva={addUnitAva}
          removeUnitAva={jest.fn}
          updateAvaList={jest.fn}
          ava={[]}
        />,
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

    expect(addUnitAva).toHaveBeenCalled();
  });

  it('should delete an item when the delete button is pressed', () => {
    const removeUnitAva = jest.fn();

    const wrapper = mount(
      <AddUnitAVA
        addUnitAva={jest.fn}
        removeUnitAva={removeUnitAva}
        updateAvaList={jest.fn}
        ava={[{ sectorial: 'Panoceania', ava: 'T' }]}
      />,
    );

    wrapper
      .find('#ava-list-item-delete')
      .last()
      .simulate('click');

    expect(removeUnitAva).toHaveBeenCalled();
  });
});
