import React from 'react';
import { shallow, mount } from 'enzyme';
import { MasterPage } from '../../components/MasterPage/MasterPage';

// TODO write tests for this

describe('<MasterPage />', () => {
  it('Shows the provided side panel', () => {
    const SidePanel = jest.fn();

    const wrapper = shallow(
      <MasterPage
        pageTitle="test"
        mainContent={jest.fn}
        sidePanelContent={SidePanel}
      />,
    );

    expect(SidePanel).toHaveBeenCalled();
  });

  it('Shows the provided main content', () => {
    const Main = jest.fn();

    const wrapper = shallow(
      <MasterPage
        pageTitle="test"
        mainContent={jest.fn}
        sidePanelContent={Main}
      />,
    );

    expect(Main).toHaveBeenCalled();
  });
});
