import { mount, ReactWrapper } from 'enzyme';
import React from 'react';
import {
  StatsAndAttributesForm,
  isBTS,
  movRegex,
  numberRegex,
} from '../../../../pages/UnitEditor/StatsAndAttributes/StatsAndAttributesForm';

describe('<StatsAndAttributesForm />', () => {
  let wrapper: ReactWrapper<any, Readonly<{}>, React.Component<{}, {}, any>>;
  let root: any;

  beforeEach(() => {
    root = document.createElement('div');
    root.id = 'root';
    document.body.appendChild(root);
  });

  afterEach(() => {
    if (wrapper && wrapper.length) {
      wrapper.unmount();
    }
    document.body.removeChild(root);
  });

  describe('onSubmit', () => {
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
      const closeSideDrawer = jest.fn();

      wrapper = mount(
        <StatsAndAttributesForm
          onSubmit={onSubmit}
          onCancel={jest.fn}
          initialData={initialData}
          closeSideDrawer={closeSideDrawer}
        />,
        { attachTo: root },
      );

      wrapper
        .find('#side-drawer-form-submit')
        .last()
        .simulate('click');

      expect(onSubmit).toBeCalledWith(initialData);
    });

    it('should close the side drawer after submission', () => {
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

      wrapper = mount(
        <StatsAndAttributesForm
          onSubmit={onSubmit}
          onCancel={jest.fn}
          initialData={initialData}
          closeSideDrawer={closeSideDrawer}
        />,
        { attachTo: root },
      );

      wrapper
        .find('#side-drawer-form-submit')
        .last()
        .simulate('click');

      expect(closeSideDrawer).toBeCalled();
    });
  });

  it('should call closeSideDrawer() when cancel is pressed', () => {
    const onCancel = jest.fn();

    wrapper = mount(
      <StatsAndAttributesForm
        onSubmit={jest.fn}
        closeSideDrawer={jest.fn}
        onCancel={onCancel}
      />,
      { attachTo: root },
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

    wrapper = mount(
      <StatsAndAttributesForm
        onSubmit={() => onSubmit()}
        closeSideDrawer={jest.fn}
        initialData={initialData}
        onCancel={jest.fn}
      />,
      { attachTo: root },
    );

    wrapper
      .find('#side-drawer-form-submit')
      .last()
      .simulate('click');

    expect(onSubmit).toBeCalledTimes(0);
  });

  it('should have a disabled submit button if a stat is empty', () => {
    const initialData = {
      impetuous: true,
      impetuousType: 'FRENZY',
      cube: true,
      cubeType: 'CUBE',
      mov: '4-4',
      cc: '',
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

    wrapper = mount(
      <StatsAndAttributesForm
        onSubmit={() => onSubmit()}
        closeSideDrawer={jest.fn}
        initialData={initialData}
        onCancel={jest.fn}
      />,
      { attachTo: root },
    );

    wrapper
      .find('#side-drawer-form-submit')
      .last()
      .simulate('click');

    expect(onSubmit).toBeCalledTimes(0);
  });

  it('should only allow valid BTS values', () => {
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
      bts: '2',
      w: '1',
      s: '2',
      structure: false,
      ava: [{ sectorial: 'Panoceania', ava: 'T' }],
    };

    const onSubmit = jest.fn();
    const closeSideDrawer = jest.fn();

    wrapper = mount(
      <StatsAndAttributesForm
        onSubmit={onSubmit}
        onCancel={jest.fn}
        initialData={initialData}
        closeSideDrawer={closeSideDrawer}
      />,
      { attachTo: root },
    );

    wrapper
      .find('#side-drawer-form-submit')
      .last()
      .simulate('click');

    expect(onSubmit).toBeCalledTimes(0);
  });

  it('should have a disabled button if the mov is empty', () => {
    const initialData = {
      impetuous: true,
      impetuousType: 'FRENZY',
      cube: true,
      cubeType: 'CUBE',
      mov: '',
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

    wrapper = mount(
      <StatsAndAttributesForm
        onSubmit={onSubmit}
        onCancel={jest.fn}
        initialData={initialData}
        closeSideDrawer={closeSideDrawer}
      />,
      { attachTo: root },
    );

    wrapper
      .find('#side-drawer-form-submit')
      .last()
      .simulate('click');

    expect(onSubmit).toBeCalledTimes(0);
  });

  describe('isBTS', () => {
    it('should return true if the number is divisible by 3', () => {
      const validBTS = '3';

      const valid = isBTS(validBTS);

      expect(valid).toBeTruthy();
    });

    it('should return true if the number is 0', () => {
      const validBTS = '0';

      const valid = isBTS(validBTS);

      expect(valid).toBeTruthy();
    });

    it('should return false if the number is not divisible by three', () => {
      const validBTS = '4';

      const valid = isBTS(validBTS);

      expect(valid).toBeFalsy();
    });

    it('should return false if the number is not a number', () => {
      const validBTS = 'a';

      const valid = isBTS(validBTS);

      expect(valid).toBeFalsy();
    });

    it('should return false if the input is blank', () => {
      const validBTS = '';

      const valid = isBTS(validBTS);

      expect(valid).toBeFalsy();
    });
  });

  describe('movRegex', () => {
    it('should match a valid mov value', () => {
      const mov = '4-4';

      expect(movRegex.test(mov)).toBeTruthy();
    });

    it('should not match if the mov is invalid', () => {
      const mov = '4-';

      expect(movRegex.test(mov)).toBeFalsy();
    });

    it('should not match if the mov is invalid', () => {
      const mov = '4-4a';

      expect(movRegex.test(mov)).toBeFalsy();
    });
  });

  describe('numRegex', () => {
    it('should match only numbers', () => {
      const num = '12';

      expect(numberRegex.test(num)).toBeTruthy();
    });

    it('should not match non-numbers', () => {
      const num = 'a';

      expect(numberRegex.test(num)).toBeFalsy();
    });

    it('should not match non-numbers', () => {
      const num = '1a';

      expect(numberRegex.test(num)).toBeFalsy();
    });
  });
});