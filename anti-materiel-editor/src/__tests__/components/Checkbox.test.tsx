import React from 'react';
import { Checkbox } from '../../components/Checkbox/Checkbox';
import { shallow } from 'enzyme';

describe('<Checbox />', () => {
  const name = 'foo';
  const label = 'bar';

  it('should be checked when clicked', () => {
    let fieldName = '';
    let fieldValue = false;

    const wrapper = shallow(
      <Checkbox
        name={name}
        label={label}
        onChange={(name, value) => {
          fieldName = name;
          fieldValue = value as boolean;
        }}
        checked={fieldValue}
      />,
    );

    const expectedValue = true;

    wrapper
      .find('input')
      .simulate('change', { target: { name, checked: expectedValue } });

    expect(fieldValue).toBe(expectedValue);
    expect(fieldName).toBe(name);
  });

  it('should show the label passed in', () => {
    const wrapper = shallow(
      <Checkbox name={name} label={label} onChange={jest.fn} checked />,
    );

    const labelText = wrapper.find('label').text();

    expect(labelText).toBe(label);
  });
});
