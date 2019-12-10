import React from 'react';
import { shallow } from 'enzyme';
import { SpecialRuleInfoContent } from '../../../pages/SpecialRulesEditor/SpecialRuleInfoContent';
import { SpecialRule } from '@anti-materiel/types';

describe('<SpecialRuleInfoContent />', () => {
  it('should show the empty content placeholder if there is no content', () => {
    const wrapper = shallow(<SpecialRuleInfoContent />);

    const p = wrapper.find('p').hostNodes();

    expect(p).toHaveLength(1);
  });

  it('should not show the table if there is no content', () => {
    const wrapper = shallow(<SpecialRuleInfoContent />);

    const table = wrapper.find('.special-rule-info-content-table').hostNodes();

    expect(table).toHaveLength(0);
  });

  it('should show the table if there is content', () => {
    const specialRule: SpecialRule = {
      id: '1234',
      name: 'test',
      wikiLink: 'test.com',
      skillType: ['ARO'],
    };
    const wrapper = shallow(
      <SpecialRuleInfoContent specialRule={specialRule} />,
    );

    const table = wrapper.find('.special-rule-info-content-table').hostNodes();

    expect(table).toHaveLength(1);
  });

  it('should show an anchor tag in the table row if the wikiLink is truthy', () => {
    const specialRule: SpecialRule = {
      id: '1234',
      name: 'test',
      wikiLink: 'test.com',
      skillType: ['ARO'],
    };
    const wrapper = shallow(
      <SpecialRuleInfoContent specialRule={specialRule} />,
    );

    const anchor = wrapper
      .find('.special-rule-info-content-table__row')
      .hostNodes()
      .find('a');

    expect(anchor).toHaveLength(1);
  });

  it('should show a span in the table row if the wikiLink is falsy', () => {
    const specialRule: SpecialRule = {
      id: '1234',
      name: 'test',
      wikiLink: 'test.com',
      skillType: ['ARO'],
    };
    const wrapper = shallow(
      <SpecialRuleInfoContent specialRule={specialRule} />,
    );

    const span = wrapper
      .find('.special-rule-info-content-table__row')
      .hostNodes()
      .find('span');

    expect(span).toHaveLength(1);
  });

  it('should not show the empty content placeholder if there is content', () => {
    const specialRule: SpecialRule = {
      id: '1234',
      name: 'test',
      wikiLink: 'test.com',
      skillType: ['ARO'],
    };
    const wrapper = shallow(
      <SpecialRuleInfoContent specialRule={specialRule} />,
    );

    const p = wrapper.find('p').hostNodes();

    expect(p).toHaveLength(0);
  });
});
