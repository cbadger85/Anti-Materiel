import React from 'react';
import uuid from 'uuid/v4';
import { mount, ReactWrapper } from 'enzyme';
import { SpecialRuleInfoForm } from '../../../pages/SpecialRulesEditor/SpecialRuleInfoForm';
import { SpecialRule } from '@anti-materiel/types';

jest.mock('uuid/v4', () => jest.fn().mockReturnValue('1234'));

describe('<SpecialRuleForm />', () => {
  let wrapper: ReactWrapper<any, Readonly<{}>, React.Component<{}, {}, any>>;
  let root: any;

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

  const initialData: SpecialRule = {
    name: 'test',
    wikiLink: 'www.test.com',
    id: '1234',
    skillType: ['ARO'],
  };

  it('should submit the data when the form is filled out and the submit button is pressed', () => {
    const onSubmit = jest.fn();
    wrapper = mount(
      <SpecialRuleInfoForm
        onCancel={jest.fn()}
        onDataChange={jest.fn()}
        onSubmit={onSubmit}
        initialData={initialData}
      />,
      { attachTo: root },
    );

    wrapper
      .find('#side-drawer-form-submit')
      .last()
      .simulate('click');

    expect(onSubmit).toHaveBeenCalledWith(initialData);
  });

  it('should call onDataChange if the there is no initialData and the fields have data', () => {
    const onDataChange = jest.fn();
    wrapper = mount(
      <SpecialRuleInfoForm
        onCancel={jest.fn()}
        onDataChange={onDataChange}
        onSubmit={jest.fn()}
      />,
      { attachTo: root },
    );

    wrapper
      .find('input')
      .first()
      .simulate('change', { target: { name: 'name', value: 'test' } });

    wrapper
      .find('#side-drawer-form-cancel')
      .last()
      .simulate('click');

    expect(onDataChange).lastCalledWith(true);
  });

  it('should not allow submission if the data is invalid', () => {
    const closeSideDrawer = jest.fn();
    wrapper = mount(
      <SpecialRuleInfoForm
        onCancel={jest.fn()}
        onDataChange={jest.fn()}
        onSubmit={jest.fn()}
      />,
      { attachTo: root },
    );

    wrapper
      .find('#side-drawer-form-submit')
      .last()
      .simulate('click');

    expect(closeSideDrawer).not.toHaveBeenCalled();
  });

  it('should generate a new uuid if there is no initial id', () => {
    const onSubmit = jest.fn();

    wrapper = mount(
      <SpecialRuleInfoForm
        onCancel={jest.fn()}
        onDataChange={jest.fn()}
        onSubmit={onSubmit}
        initialData={{
          name: 'test',
          wikiLink: 'test.com',
          id: '',
          skillType: ['ARO'],
        }}
      />,
      { attachTo: root },
    );

    wrapper
      .find('#side-drawer-form-submit')
      .last()
      .simulate('click');

    expect(uuid).toHaveBeenCalled();
  });
});
