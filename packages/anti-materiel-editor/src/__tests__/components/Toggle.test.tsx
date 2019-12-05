import React from 'react';
import { Toggle } from '../../components/Toggle/Toggle';
import { shallow } from 'enzyme';

jest.mock('uuid/v4', () => jest.fn().mockReturnValue('1234'));

describe('<Toggle />', () => {
  it('should use the id if one is provided', () => {
    const onChange = jest.fn();
    const id = 'testId';
    const name = 'testName';

    const wrapper = shallow(
      <Toggle onChange={onChange} checked={true} id={id} name={name} />,
    );

    const input = wrapper.find('input');
    const label = wrapper.find('label');

    expect(input.props().id).toBe(id);
    expect(label.props().htmlFor).toBe(id);
  });

  it('should use the name if no id is provided', () => {
    const onChange = jest.fn();
    const name = 'testName';

    const wrapper = shallow(
      <Toggle onChange={onChange} checked={true} name={name} />,
    );

    const input = wrapper.find('input');
    const label = wrapper.find('label');

    expect(input.props().id).toBe(name);
    expect(label.props().htmlFor).toBe(name);
  });

  it('should use the generated uuid if no name or id is provided', () => {
    const onChange = jest.fn();

    const wrapper = shallow(<Toggle onChange={onChange} checked={true} />);

    const input = wrapper.find('input');
    const label = wrapper.find('label');

    expect(input.props().id).toBe('1234');
    expect(label.props().htmlFor).toBe('1234');
  });

  it('should call onChange when the label is clicked', () => {
    const onChange = jest.fn();

    const wrapper = shallow(<Toggle onChange={onChange} checked={true} />);

    wrapper.find('input').simulate('change', { target: { checked: false } });

    expect(onChange).toBeCalledWith(false);
  });
});
