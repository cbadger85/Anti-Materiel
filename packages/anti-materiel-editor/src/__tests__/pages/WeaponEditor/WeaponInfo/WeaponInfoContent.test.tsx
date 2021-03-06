import React from 'react';
import { shallow } from 'enzyme';
import { WeaponInfoContent } from '../../../../pages/WeaponEditor/WeaponInfo/WeaponInfoContent';

describe('<WeaponInfoContent />', () => {
  it('should show the empty content placeholder if there is no content', () => {
    const wrapper = shallow(<WeaponInfoContent />);

    const p = wrapper.find('p').hostNodes();

    expect(p).toHaveLength(1);
  });

  it('should not show the table if there is no content', () => {
    const wrapper = shallow(<WeaponInfoContent />);

    const table = wrapper.find('.weapon-info-content-table').hostNodes();

    expect(table).toHaveLength(0);
  });

  it('should show the table if there is content', () => {
    const weaponInfo = { name: 'test', wikiLink: 'test.com' };
    const wrapper = shallow(<WeaponInfoContent weaponInfo={weaponInfo} />);

    const table = wrapper.find('.weapon-info-content-table').hostNodes();

    expect(table).toHaveLength(1);
  });

  it('should show an anchor tag in the table row if the wikiLink is truthy', () => {
    const weaponInfo = { name: 'test', wikiLink: 'test.com' };
    const wrapper = shallow(<WeaponInfoContent weaponInfo={weaponInfo} />);

    const anchor = wrapper
      .find('.weapon-info-content-table__row')
      .hostNodes()
      .find('a');

    expect(anchor).toHaveLength(1);
  });

  it('should show a span in the table row if the wikiLink is falsy', () => {
    const weaponInfo = { name: 'test' };
    const wrapper = shallow(<WeaponInfoContent weaponInfo={weaponInfo} />);

    const span = wrapper
      .find('.weapon-info-content-table__row')
      .hostNodes()
      .find('span');

    expect(span).toHaveLength(1);
  });

  it('should not show the empty content placeholder if there is content', () => {
    const weaponInfo = { name: 'test', wikiLink: 'test.com' };
    const wrapper = shallow(<WeaponInfoContent weaponInfo={weaponInfo} />);

    const p = wrapper.find('p').hostNodes();

    expect(p).toHaveLength(0);
  });
});
