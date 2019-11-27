import React from 'react';
import {
  ItemForm,
  ListItem,
} from '../../../../pages/WeaponEditor/WeaponMode/ItemForm';
import { mount } from 'enzyme';
import { Button } from '../../../../components/Button/Button';
import { Input } from '../../../../components/Input/Input';

describe('<ItemForm />', () => {
  it('should have a disabled button when there is no data entered', () => {
    const wrapper = mount(
      <ItemForm
        items={[]}
        addItem={jest.fn()}
        removeItem={jest.fn()}
        id="ammo"
        placeholder="test"
      />,
    );

    const addButton = wrapper.find(Button);

    expect(addButton.props().disabled).toBe(true);
  });

  it('should display the list of items', () => {
    const wrapper = mount(
      <ItemForm
        items={[
          { name: 'foo', wikiLink: 'bar' },
          { name: 'bar', wikiLink: 'foo' },
        ]}
        addItem={jest.fn()}
        removeItem={jest.fn()}
        id="ammo"
        placeholder="test"
      />,
    );

    const list = wrapper.find(ListItem);

    expect(list).toHaveLength(2);
  });

  it('should add an item if the fields are valid', () => {
    const addItem = jest.fn();

    const wrapper = mount(
      <ItemForm
        items={[]}
        addItem={addItem}
        removeItem={jest.fn()}
        id="ammo"
        placeholder="test"
      />,
    );

    wrapper
      .find('input')
      .first()
      .simulate('change', { target: { name: 'name', value: 'foo' } });

    wrapper
      .find('input')
      .last()
      .simulate('change', { target: { name: 'wikiLink', value: 'bar' } });

    wrapper.find(Button).simulate('click');

    expect(addItem).toHaveBeenCalledWith({ name: 'foo', wikiLink: 'bar' });
  });

  it('should remove an item if the delete button is pressed', () => {
    const removeItem = jest.fn();

    const wrapper = mount(
      <ItemForm
        items={[{ name: 'foo', wikiLink: 'bar' }]}
        addItem={jest.fn()}
        removeItem={removeItem}
        id="ammo"
        placeholder="test"
      />,
    );

    wrapper
      .find(ListItem)
      .find(Button)
      .simulate('click');

    expect(removeItem).toHaveBeenCalledWith('foo');
  });
});
