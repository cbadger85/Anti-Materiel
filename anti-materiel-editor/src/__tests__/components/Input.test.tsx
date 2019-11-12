import { shallow } from 'enzyme';
import React from 'react';
import { Input } from '../../components/Input/Input';

describe('<Input />', () => {
  let fieldName: string = '';
  let fieldValue: string = '';

  const name = 'field1';
  const label = 'field 1';

  const wrapper = shallow(
    <Input
      name={name}
      label={label}
      onChange={(name, value) => {
        fieldName = name;
        fieldValue = value;
      }}
    />,
  );

  it('should provide the name and value of the input in the onChange callback', () => {
    const expectedValue = 'data';

    wrapper
      .find('input')
      .simulate('change', { target: { name, value: expectedValue } });

    expect(fieldValue).toBe(expectedValue);
    expect(fieldName).toBe(name);
  });

  it('should display the provided label', () => {
    const labelText = wrapper.find('label').text();

    expect(labelText).toBe(label);
  });
});
