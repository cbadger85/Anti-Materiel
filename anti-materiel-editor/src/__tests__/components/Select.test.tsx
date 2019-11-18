import { mount, shallow, ReactWrapper } from 'enzyme';
import React from 'react';
import ReactSelect from 'react-select';
import { Select } from '../../components/Select/Select';

describe('<Select />', () => {
  let wrapper: ReactWrapper<any, Readonly<{}>, React.Component<{}, {}, any>>;

  afterEach(() => {
    if (wrapper.length) {
      wrapper.unmount();
    }
  });

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

  it('should provide the name and value of the input in the onChange callback', () => {
    let fieldName = '';
    let fieldValue = '';

    wrapper = mount(
      <Select
        classNamePrefix="list"
        name={name}
        label={label}
        option={options}
        onChange={(name, value) => {
          fieldName = name;
          fieldValue = value;
        }}
        selectedValue={fieldValue}
      />,
    );

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
        onChange={() => jest.fn()}
      />,
    );

    const labelText = shallowWrapper.find('span').text();

    expect(labelText).toBe(label);
  });

  it('should display the error state when the input is invalid', () => {
    let fieldName = '';
    let fieldValue = '';

    wrapper = mount(
      <Select
        classNamePrefix="list"
        name={name}
        label={label}
        option={options}
        onChange={(name, value) => {
          fieldName = name;
          fieldValue = value;
        }}
        value={fieldValue}
        error
      />,
    );

    wrapper
      .find(ReactSelect)
      .props()
      .onChange({ value: '1' });

    const error = wrapper.find('.__error');

    expect(error).toHaveLength(1);
  });
});
