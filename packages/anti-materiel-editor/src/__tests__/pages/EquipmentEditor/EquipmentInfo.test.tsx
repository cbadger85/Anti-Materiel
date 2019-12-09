import { mount, ReactWrapper } from 'enzyme';
import React from 'react';
import { EquipmentInfo } from '../../../pages/EquipmentEditor/EquipmentInfo';
import { ManagedContent } from '../../../components/ManagedContent/ManagedContent';
import { Button } from '../../../components/Button/Button';

describe('<EquipmentInfo />', () => {
  let wrapper: ReactWrapper<any, Readonly<{}>, React.Component<{}, {}, any>>;

  // add a div with #modal-root id to the global body
  //@ts-ignore
  const modalRoot = global.document.createElement('div');
  modalRoot.setAttribute('id', 'modal-root');
  //@ts-ignore
  const body = global.document.querySelector('body');
  body.appendChild(modalRoot);

  afterEach(() => {
    wrapper.unmount();
  });

  it('should start out with warn set to false', () => {
    const addEquipment = jest.fn();
    wrapper = mount(<EquipmentInfo addEquipment={addEquipment} />);

    const managedContent = wrapper.find(ManagedContent);

    expect(managedContent.props().warn).toBe(false);
  });

  it('should set warn to true if any content is edited', () => {
    const addEquipment = jest.fn();
    wrapper = mount(<EquipmentInfo addEquipment={addEquipment} />);

    wrapper
      .find(ManagedContent)
      .find(Button)
      .simulate('click');

    wrapper
      .find('#equipment-form-name')
      .hostNodes()
      .simulate('change', { target: { name: 'name', value: 'foo' } });

    const managedContent = wrapper.find(ManagedContent);

    expect(managedContent.props().warn).toBe(true);
  });

  it('should call addEquipment if the form is submitted', () => {
    const addEquipment = jest.fn();

    const equipment = { id: '1234', name: 'foo', wikiLink: 'bar' };

    wrapper = mount(
      <EquipmentInfo addEquipment={addEquipment} equipment={equipment} />,
    );

    wrapper
      .find(ManagedContent)
      .find(Button)
      .simulate('click');

    wrapper
      .find('#side-drawer-form-submit')
      .hostNodes()
      .simulate('click');

    expect(addEquipment).toBeCalledWith(equipment);
  });
});
