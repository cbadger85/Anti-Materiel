import { mount, ReactWrapper } from 'enzyme';
import React from 'react';
import ReactSelect from 'react-select';
import { MultiSelect } from '../../components/MultiSelect/MultiSelect';

describe('<MultiSelect />', () => {
  let wrapper: ReactWrapper<any, Readonly<{}>, React.Component<{}, {}, any>>;

  afterEach(() => {
    wrapper.unmount();
  });

  it('should add selected items to the list', () => {
    let fieldName = '';
    let fieldValue = [''];

    const name = 'field1';
    const label = 'Select';
    const options = [
      {
        label: 'option1',
        value: '1',
      },
      {
        label: 'option2',
        value: '2',
      },
    ];

    const list = ['1'];

    wrapper = mount(
      <MultiSelect
        name={name}
        label={label}
        options={options}
        list={list}
        onChange={(name, value) => {
          fieldName = name;
          fieldValue = value;
        }}
      />,
    );

    wrapper
      .find(ReactSelect)
      .props()
      .onChange({ value: '2' });

    const expectedValue = ['1', '2'];

    expect(fieldValue).toEqual(expectedValue);
    expect(fieldName).toBe(name);
  });

  it('should not add selected items to the list if it is already there', () => {
    let fieldName = '';
    let fieldValue = [''];

    const name = 'field1';
    const label = 'Select';
    const options = [
      {
        label: 'option1',
        value: '1',
      },
      {
        label: 'option2',
        value: '2',
      },
    ];

    const list = ['1'];

    wrapper = mount(
      <MultiSelect
        name={name}
        label={label}
        options={options}
        list={list}
        onChange={(name, value) => {
          fieldName = name;
          fieldValue = value;
        }}
      />,
    );

    wrapper
      .find(ReactSelect)
      .props()
      .onChange({ value: '1' });

    const expectedValue = ['1'];

    expect(fieldValue).toEqual(expectedValue);
    expect(fieldName).toBe(name);
  });

  it('should remove an item from the list when the delete button is pressed', () => {
    let fieldName = '';
    let fieldValue = [''];

    const name = 'field1';
    const label = 'Select';
    const options = [
      {
        label: 'option1',
        value: '1',
      },
      {
        label: 'option2',
        value: '2',
      },
    ];

    const list = ['1', '2'];

    wrapper = mount(
      <MultiSelect
        name={name}
        label={label}
        options={options}
        list={list}
        onChange={(name, value) => {
          fieldName = name;
          fieldValue = value;
        }}
      />,
    );

    wrapper
      .find('button')
      .first()
      .simulate('click');

    const expectedValue = ['2'];

    expect(fieldValue).toEqual(expectedValue);
    expect(fieldName).toBe(name);
  });

  it('should display the error state when the input is invalid', () => {
    let fieldName = '';
    let fieldValue = [''];

    const name = 'field1';
    const label = 'Select';
    const options = [
      {
        label: 'option1',
        value: '1',
      },
      {
        label: 'option2',
        value: '2',
      },
    ];

    const list = ['1', '2'];

    wrapper = mount(
      <MultiSelect
        name={name}
        label={label}
        options={options}
        list={list}
        onChange={(name, value) => {
          fieldName = name;
          fieldValue = value;
        }}
        error
      />,
    );

    wrapper
      .find('button')
      .first()
      .simulate('click');

    const error = wrapper.find('.__error');

    expect(error).toHaveLength(1);
  });
});
