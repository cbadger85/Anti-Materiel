import React from 'react';
import { ToggleContent } from '../../components/ToggleContent/ToggleContent';
import { mount, ReactWrapper } from 'enzyme';
import { Button } from '../../components/Button/Button';

describe('<ToggleContent />', () => {
  let wrapper: ReactWrapper<any, Readonly<{}>, React.Component<{}, {}, any>>;

  afterEach(() => {
    if (wrapper && wrapper.length) {
      wrapper.unmount();
    }
  });

  it('should not be shown by default', () => {
    wrapper = mount(
      <ToggleContent
        toggle={show => <Button onClick={show} id="test-1" />}
        content={(isShown, hide) => (
          <div id="test-2">
            <Button onClick={hide} />
          </div>
        )}
      />,
    );

    const content = wrapper.find('div');

    expect(content).toHaveLength(0);
  });

  it('should be shown when toggled', () => {
    wrapper = mount(
      <ToggleContent
        toggle={show => <Button onClick={show} id="test-1" />}
        content={(isShown, hide) => (
          <div id="test-2">
            <Button onClick={hide} />
          </div>
        )}
      />,
    );

    wrapper.find('button').simulate('click');

    const content = wrapper.find('div');

    expect(content).toHaveLength(1);
  });

  it('should toggle off when hide is called', () => {
    wrapper = mount(
      <ToggleContent
        toggle={show => <Button onClick={show} id="test-1" />}
        content={(isShown, hide) => (
          <div id="test-2">
            <Button onClick={hide} />
          </div>
        )}
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
