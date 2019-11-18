import { mount } from 'enzyme';
import React from 'react';
import { SideDrawer } from '../../components/SideDrawer/SideDrawer';

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
      const sideDrawer = wrapper.find('#side-drawer');

      expect(sideDrawer.length).toBeTruthy();
    });

    it('should show the opaque background', () => {
      const opaqueBackground = wrapper.find('#opaque-background');

      expect(opaqueBackground.length).toBeTruthy();
    });
  });
});
