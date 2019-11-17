import { mount } from 'enzyme';
import React from 'react';
import { StatsAndAttributesForm } from '../../../../pages/UnitEditor/StatsAndAttributes/StatsAndAttributesForm';

describe('<StatsAndAttributesForm />', () => {
  describe('onSubmit', () => {
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
    const closeSideDrawer = jest.fn();

    const wrapper = mount(
      <StatsAndAttributesForm
        onSubmit={onSubmit}
        onCancel={jest.fn}
        initialData={initialData}
        closeSideDrawer={closeSideDrawer}
      />,
    );

    wrapper
      .find('#side-drawer-form-submit')
      .last()
      .simulate('click');

    it('should allow submit if the data is correct', () => {
      expect(onSubmit).toBeCalledWith(initialData);
    });

    it('should close the side drawer after submission', () => {
      expect(closeSideDrawer).toBeCalled();
    });
  });

  it('should call closeSideDrawer() when cancel is pressed', () => {
    const onCancel = jest.fn();

    const wrapper = mount(
      <StatsAndAttributesForm
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
