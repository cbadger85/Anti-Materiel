import { mount, ReactWrapper } from 'enzyme';
import React from 'react';
import { ManagedContent } from '../../../components/ManagedContent/ManagedContent';
import { Button } from '../../../components/Button/Button';
import { SpecialRuleInfo } from '../../../pages/SpecialRulesEditor/SpecialRuleInfo';
import { SpecialRule } from '@anti-materiel/types';

describe('<SpecialRuleInfo />', () => {
  let wrapper: ReactWrapper<any, Readonly<{}>, React.Component<{}, {}, any>>;
  let root: any;

  // add a div with #modal-root id to the global body
  //@ts-ignore
  const modalRoot = global.document.createElement('div');
  modalRoot.setAttribute('id', 'modal-root');
  //@ts-ignore
  const body = global.document.querySelector('body');
  body.appendChild(modalRoot);

  beforeEach(() => {
    root = document.createElement('div');
    root.id = 'root';
    document.body.appendChild(root);
  });

  afterEach(() => {
    document.body.removeChild(root);
    if (wrapper && wrapper.length > 0) {
      wrapper.unmount();
    }
  });

  it('should start out with warn set to false', () => {
    const addSpecialRule = jest.fn();
    wrapper = mount(<SpecialRuleInfo addSpecialRule={addSpecialRule} />, {
      attachTo: root,
    });

    const managedContent = wrapper.find(ManagedContent);

    expect(managedContent.props().warn).toBe(false);
  });

  it('should set warn to true if any content is edited', () => {
    const addSpecialRule = jest.fn();
    wrapper = mount(<SpecialRuleInfo addSpecialRule={addSpecialRule} />, {
      attachTo: root,
    });

    wrapper
      .find(ManagedContent)
      .find(Button)
      .simulate('click');

    wrapper
      .find('#special-rules-form-name')
      .hostNodes()
      .simulate('change', { target: { name: 'name', value: 'foo' } });

    const managedContent = wrapper.find(ManagedContent);

    expect(managedContent.props().warn).toBe(true);
  });

  it('should call addSpecialRule if the form is submitted', () => {
    const addSpecialRule = jest.fn();

    const specialRule: SpecialRule = {
      id: '1234',
      name: 'foo',
      wikiLink: 'bar',
      skillType: ['ARO'],
    };

    wrapper = mount(
      <SpecialRuleInfo
        addSpecialRule={addSpecialRule}
        specialRule={specialRule}
      />,
      { attachTo: root },
    );

    wrapper
      .find(ManagedContent)
      .find(Button)
      .simulate('click');

    wrapper
      .find('#side-drawer-form-submit')
      .hostNodes()
      .simulate('click');

    expect(addSpecialRule).toBeCalledWith(specialRule);
  });
});
