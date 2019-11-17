import React from 'react';
import { UnitInfoForm } from '../../../../pages/UnitEditor/UnitInfo/UnitInfoForm';
import { mount } from 'enzyme';

describe('<UnitInfoForm />', () => {
  it('should allow submit if the data is correct', () => {
    const initialData = {
      name: 'Fusiliers',
      isc: 'Fusiliers',
      description: '',
      type: 'LI',
      classification: 'Line Troops',
      sectorial: [
        'Panoceania',
        'Neoterra Capitaline Army',
        'Varuna Immediate Reaction Division',
      ],
      id: '1234',
      unitSvgName: 'fusiliers',
    };

    const onSubmit = jest.fn();

    const wrapper = mount(
      <UnitInfoForm
        onSubmit={onSubmit}
        closeSideDrawer={jest.fn}
        initialData={initialData}
      />,
    );

    wrapper
      .find('#side-drawer-form-submit')
      .last()
      .simulate('click');

    expect(onSubmit).toBeCalledWith(initialData);
  });

  it('should call closeSideDrawer() when cancel is pressed', () => {
    const closeSideDrawer = jest.fn();

    const wrapper = mount(
      <UnitInfoForm onSubmit={jest.fn} closeSideDrawer={closeSideDrawer} />,
    );

    wrapper
      .find('#side-drawer-form-cancel')
      .last()
      .simulate('click');

    expect(closeSideDrawer).toBeCalled();
  });

  it('hould have a disabled submit button if the form is invalid', () => {
    const initialData = {
      name: 'Fusiliers',
      isc: '',
      description: '',
      type: 'LI',
      classification: '',
      sectorial: [],
      id: '1234',
      unitSvgName: 'fusiliers',
    };

    const onSubmit = jest.fn();

    const wrapper = mount(
      <UnitInfoForm
        onSubmit={onSubmit}
        closeSideDrawer={jest.fn}
        initialData={initialData}
      />,
    );

    wrapper
      .find('#side-drawer-form-submit')
      .last()
      .simulate('click');

    expect(onSubmit).toBeCalledTimes(0);
  });
});
