import { mount } from 'enzyme';
import React from 'react';
import { SideDrawer, SideDrawerContext } from '../../components/SideDrawer';

beforeEach(() => {
  jest.clearAllMocks();
});

describe('<SideDrawer />', () => {
  describe('SideDrawer Closed', () => {
    const sideDrawerContextValues = {
      isSideDrawerOpen: false,
      openSideDrawer: () => {},
      closeSideDrawer: () => {},
      route: '',
      setRoute: () => {},
    };

    const wrapper = mount(
      <SideDrawerContext.Provider value={sideDrawerContextValues}>
        <SideDrawer />
      </SideDrawerContext.Provider>,
    );

    it('should not show the side drawer', () => {
      const sideDrawer = wrapper.find('#side-drawer');

      expect(sideDrawer).toHaveLength(0);
    });

    it('should not show  the opaque background', () => {
      const opaqueBackground = wrapper.find('#opaque-background');

      expect(opaqueBackground).toHaveLength(0);
    });
  });

  describe('SideDrawer Open', () => {
    const sideDrawerContextValues = {
      isSideDrawerOpen: true,
      openSideDrawer: () => {},
      closeSideDrawer: () => {},
      route: '',
      setRoute: () => {},
    };

    const wrapper = mount(
      <SideDrawerContext.Provider value={sideDrawerContextValues}>
        <SideDrawer />
      </SideDrawerContext.Provider>,
    );

    it('Should show the side drawer', () => {
      const sideDrawer = wrapper
        .find('#side-drawer')
        .first()
        .render();

      expect(sideDrawer.attr('style')).toContain(
        'transform: translate3d(0, 0, 0)',
      );
    });

    it('should show the opaque background', () => {
      const opaqueBackground = wrapper
        .find('#opaque-background')
        .first()
        .render();

      expect(opaqueBackground.attr('style')).toContain('opacity: 0.3');
    });
  });
});
