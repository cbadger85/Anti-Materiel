import { mount } from 'enzyme';
import React from 'react';
import { SideDrawerContext } from '../../components/SideDrawer';
import { Router } from '../../components/SideDrawer/Router';

beforeEach(() => {
  jest.clearAllMocks();
});

const PageOne = () => <div id="test">Page One</div>;

describe('<Router />', () => {
  it('should show PageOne', () => {
    const sideDrawerContextValues = {
      isSideDrawerOpen: false,
      openSideDrawer: jest.fn(),
      closeSideDrawer: jest.fn(),
      route: 'one',
      setRoute: jest.fn(),
    };

    const wrapper = mount(
      <SideDrawerContext.Provider value={sideDrawerContextValues}>
        <Router routes={{ one: PageOne }} />
      </SideDrawerContext.Provider>,
    );

    const pageOne = wrapper.find('#test');

    expect(pageOne).toHaveLength(1);
  });

  it('should return null if there is no route specified', () => {
    const sideDrawerContextValues = {
      isSideDrawerOpen: false,
      openSideDrawer: jest.fn(),
      closeSideDrawer: jest.fn(),
      route: '',
      setRoute: jest.fn(),
    };

    const wrapper = mount(
      <SideDrawerContext.Provider value={sideDrawerContextValues}>
        <Router routes={{ one: PageOne }} />
      </SideDrawerContext.Provider>,
    );

    const router = wrapper.find(Router);

    expect(router.html()).toBe(null);
  });
});
