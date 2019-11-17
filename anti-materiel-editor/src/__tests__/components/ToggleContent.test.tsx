import React from 'react';
import { ToggleContent } from '../../components/ToggleContent/ToggleContent';
import { mount } from 'enzyme';
import { Button } from '../../components/Button/Button';

describe('<ToggleContent />', () => {
  it('should not be shown by default', () => {
    const wrapper = mount(
      <ToggleContent
        toggle={show => <Button onClick={show} id="test-1" />}
        content={(isShown, hide) => (
          <div id="test-2">
            <Button onClick={hide} />
          </div>
        )}
        handleMount
      />,
    );

    const content = wrapper.find('div');

    expect(content).toHaveLength(0);
  });

  it('should be shown when toggled', () => {
    const wrapper = mount(
      <ToggleContent
        toggle={show => <Button onClick={show} id="test-1" />}
        content={(isShown, hide) => (
          <div id="test-2">
            <Button onClick={hide} />
          </div>
        )}
        handleMount
      />,
    );

    wrapper.find('button').simulate('click');

    const content = wrapper.find('div');

    expect(content).toHaveLength(1);
  });

  it('should toggle off when hide is called', () => {
    const wrapper = mount(
      <ToggleContent
        toggle={show => <Button onClick={show} id="test-1" />}
        content={(isShown, hide) => (
          <div id="test-2">
            <Button onClick={hide} />
          </div>
        )}
        handleMount
      />,
    );

    wrapper.find('button').simulate('click');

    const content = wrapper.find('div');

    expect(content).toHaveLength(1);

    wrapper
      .find('button')
      .last()
      .simulate('click');

    const hiddenContent = wrapper.find('div');

    expect(hiddenContent).toHaveLength(0);
  });
});
