import { mount, shallow } from 'enzyme';
import React from 'react';
import ReactSelect from 'react-select';
import { Select } from '../../components/Select/Select';

describe('<Select />', () => {
  let fieldName: string = '';
  let fieldValue: string = '';

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

  const wrapper = mount(
    <Select
      classNamePrefix="list"
      name={name}
      label={label}
      option={options}
      onChange={(name, value) => {
        fieldName = name;
        fieldValue = value;
      }}
    />,
  );

  it('should provide the name and value of the input in the onChange callback', () => {
    const expectedValue = '1';

    wrapper
      .find(ReactSelect)
      .props()
      .onChange({ value: '1' });

    expect(fieldName).toBe(name);
    expect(fieldValue).toBe(expectedValue);
  });

  it('should display the provided label', () => {
    const shallowWrapper = shallow(
      <Select
        classNamePrefix="list"
        name={name}
        label={label}
        option={options}
        onChange={(name, value) => {
          fieldName = name;
          fieldValue = value;
        }}
      />,
    );

    const labelText = shallowWrapper.find('span').text();

    expect(labelText).toBe(label);
  });
});
