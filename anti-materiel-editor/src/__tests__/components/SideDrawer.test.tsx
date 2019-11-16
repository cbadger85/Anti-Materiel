import { mount } from 'enzyme';
import React from 'react';
import { SideDrawer } from '../../components/SideDrawer/SideDrawer';

beforeEach(() => {
  jest.clearAllMocks();
});

describe('<SideDrawer />', () => {
  describe('SideDrawer Closed', () => {
    const wrapper = mount(<SideDrawer isOpen={false} />);

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
    const wrapper = mount(<SideDrawer isOpen />);

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
