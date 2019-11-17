import React from 'react';
import { UnitInfoForm } from '../../../../pages/UnitEditor/UnitInfo/UnitInfoForm';
import { mount } from 'enzyme';

describe('<UnitInfoForm />', () => {
  describe('onSubmit', () => {
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
    const closeSideDrawer = jest.fn();

    const wrapper = mount(
      <UnitInfoForm
        onSubmit={onSubmit}
        onCancel={jest.fn}
        closeSideDrawer={closeSideDrawer}
        initialData={initialData}
      />,
    );

    wrapper
      .find('#side-drawer-form-submit')
      .last()
      .simulate('click');

    it('should allow submit if the data is correct', () => {
      expect(onSubmit).toBeCalledWith(initialData);
    });

    it('should close the side drawer after submisstion', () => {
      expect(closeSideDrawer).toBeCalled();
    });
  });

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
        onCancel={jest.fn}
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

  it('should call onCancel() when cancel is pressed', () => {
    const onCancel = jest.fn();

    const wrapper = mount(
      <UnitInfoForm
        onSubmit={jest.fn}
        closeSideDrawer={jest.fn}
        onCancel={onCancel}
      />,
    );

    wrapper
      .find('#side-drawer-form-cancel')
      .last()
      .simulate('click');

    expect(onCancel).toBeCalled();
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
        onCancel={jest.fn}
      />,
    );

    wrapper
      .find('#side-drawer-form-submit')
      .last()
      .simulate('click');

    expect(onSubmit).toBeCalledTimes(0);
  });
});
