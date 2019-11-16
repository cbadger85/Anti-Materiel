import { shallow } from 'enzyme';
import React from 'react';
import { Input } from '../../components/Input/Input';

describe('<Input />', () => {
  let fieldName = '';
  let fieldValue = '';

  const name = 'field1';
  const label = 'field 1';

  it('should provide the name and value of the input in the onChange callback', () => {
    const wrapper = shallow(
      <Input
        name={name}
        label={label}
        onChange={(name, value) => {
          fieldName = name;
          fieldValue = value as string;
        }}
        value=""
      />,
    );

    const expectedValue = 'data';

    wrapper
      .find('input')
      .simulate('change', { target: { name, value: expectedValue } });

    expect(fieldValue).toBe(expectedValue);
    expect(fieldName).toBe(name);
  });

  it('should display the provided label', () => {
    const wrapper = shallow(
      <Input
        name={name}
        label={label}
        onChange={(name, value) => {
          fieldName = name;
          fieldValue = value as string;
        }}
        value=""
      />,
    );

    const labelText = wrapper.find('label').text();

    expect(labelText).toBe(label);
  });

  it('should diplay the error state when error is true', () => {
    const wrapper = shallow(
      <Input
        name={name}
        label={label}
        onChange={(name, value) => {
          fieldName = name;
          fieldValue = value as string;
        }}
        value=""
        error
      />,
    );

    wrapper.find('input').simulate('blur');

    const classes = wrapper.find('input').props().className;

    expect(classes).toContain('input__field--error');
  });
});
