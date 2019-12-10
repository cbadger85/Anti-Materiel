import React from 'react';
import { EditorMenu } from '../components/EditorMenu/EditorMenu';
import { shallow } from 'enzyme';
import { MenuLink } from '../components/EditorMenu/MenuLink';

describe('<EditorMenu/>', () => {
  it('should not include the index in the menu', () => {
    const wrapper = shallow(<EditorMenu />);

    const hasIndex = wrapper.find(MenuLink).reduce((exists, link) => {
      if (link.props().to === '/' || exists) {
        return true;
      }

      return false;
    }, false);

    expect(hasIndex).toBe(false);
  });
});
