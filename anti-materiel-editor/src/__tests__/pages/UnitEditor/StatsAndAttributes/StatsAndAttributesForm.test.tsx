import { mount } from 'enzyme';
import React from 'react';
import { StatsAndAttributesForm } from '../../../../pages/UnitEditor/StatsAndAttributes/StatsAndAttributesForm';

describe('<StatsAndAttributesForm />', () => {
  it('should allow submit if the data is correct', () => {
    const initialData = {
      impetuous: true,
      impetuousType: 'FRENZY',
      cube: true,
      cubeType: 'CUBE',
      mov: '4-4',
      cc: '13',
      bs: '12',
      ph: '10',
      wip: '12',
      arm: '1',
      bts: '3',
      w: '1',
      s: '2',
      structure: false,
      ava: [{ sectorial: 'Panoceania', ava: 'T' }],
    };

    const onSubmit = jest.fn();

    const wrapper = mount(
      <StatsAndAttributesForm
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
      <StatsAndAttributesForm
        onSubmit={jest.fn}
        closeSideDrawer={closeSideDrawer}
      />,
    );

    wrapper
      .find('#side-drawer-form-cancel')
      .last()
      .simulate('click');

    expect(closeSideDrawer).toBeCalled();
  });

  it('should have a disabled submit button if the form is invalid', () => {
    const initialData = {
      impetuous: true,
      impetuousType: '',
      cube: true,
      cubeType: 'CUBE',
      mov: '1',
      cc: '13',
      bs: '12',
      ph: '10',
      wip: '12',
      arm: '1',
      bts: '4',
      w: '1',
      s: '2',
      structure: false,
      ava: [],
    };

    const onSubmit = jest.fn();

    const wrapper = mount(
      <StatsAndAttributesForm
        onSubmit={() => onSubmit()}
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
