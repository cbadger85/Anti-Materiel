import { shallow } from 'enzyme';
import React from 'react';
import { MasterPage } from '../../components/MasterPage/MasterPage';

describe('<MasterPage />', () => {
  it('Shows the provided side panel', () => {
    const SidePanel = jest.fn();

    const wrapper = shallow(
      <MasterPage
        title=""
        uri="test"
        mainContent={jest.fn}
        buttonRow={jest.fn}
        sidePanelContent={SidePanel}
      />,
    );

    expect(SidePanel).toHaveBeenCalledWith('test');
  });

  it('Shows the provided main content', () => {
    const Main = jest.fn();

    const wrapper = shallow(
      <MasterPage
        title=""
        uri="test"
        mainContent={Main}
        buttonRow={jest.fn}
        sidePanelContent={jest.fn}
      />,
    );

    expect(Main).toHaveBeenCalled();
  });

  it('Shows the provided buttons', () => {
    const ButtonRow = jest.fn();

    const wrapper = shallow(
      <MasterPage
        title=""
        uri="test"
        mainContent={jest.fn}
        buttonRow={ButtonRow}
        sidePanelContent={jest.fn}
      />,
    );

    expect(ButtonRow).toHaveBeenCalled();
  });

  it('Shows the title', () => {
    const title = 'test title';

    const wrapper = shallow(
      <MasterPage
        title={title}
        uri="test"
        mainContent={jest.fn}
        buttonRow={jest.fn}
        sidePanelContent={jest.fn}
      />,
    );

    const foundTitle = wrapper.find('h1');

    expect(foundTitle.text()).toBe(title);
  });
});
