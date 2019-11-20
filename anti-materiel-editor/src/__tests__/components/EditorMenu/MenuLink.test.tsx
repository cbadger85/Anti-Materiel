import React from 'react';
import { MemoryRouter, Link, Route } from 'react-router-dom';
import { mount } from 'enzyme';
import { MenuLink } from '../../../components/EditorMenu/MenuLink';
import { act } from 'react-dom/test-utils';

describe('<MenuLink />', () => {
  const activeClass = 'active';
  it('should be active if the to matches the route', () => {
    const wrapper = mount(
      <MemoryRouter initialEntries={['/test']}>
        <MenuLink to="/test" activeClassName={activeClass}>
          Test
        </MenuLink>
      </MemoryRouter>,
    );

    const link = wrapper.find(Link);

    expect(link.props().className).toContain(activeClass);
  });

  it('should call preventDefault if the link is active', () => {
    const wrapper = mount(
      <MemoryRouter initialEntries={['/test']}>
        <MenuLink to="/test" activeClassName={activeClass}>
          Test
        </MenuLink>
        <Route
          path="*"
          render={({ history, location }) => {
            history = history;
            location = location;
            return null;
          }}
        />
      </MemoryRouter>,
    );

    const preventDefault = jest.fn();

    wrapper.find(Link).simulate('click', { preventDefault });

    console.log(location.pathname);

    expect(preventDefault).toHaveBeenCalled();
  });

  it('should  not call preventDefault if the link is not active', () => {
    const wrapper = mount(
      <MemoryRouter initialEntries={['/']}>
        <MenuLink to="/test" activeClassName={activeClass}>
          Test
        </MenuLink>
        <Route
          path="*"
          render={({ history, location }) => {
            history = history;
            location = location;
            return null;
          }}
        />
      </MemoryRouter>,
    );

    const preventDefault = jest.fn();

    wrapper.find(Link).simulate('click', { preventDefault });

    console.log(location.pathname);

    expect(preventDefault).toHaveBeenCalledTimes(0);
  });
});
