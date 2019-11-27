import React from 'react';
import {
  RangeBandForm,
  isRangeBandSelectError,
  isMinInputError,
  isMaxInputError,
} from '../../../../pages/WeaponEditor/WeaponMode/RangeBandForm';
import { shallow } from 'enzyme';
import { Select } from '../../../../components/Select/Select';
import { Input } from '../../../../components/Input/Input';

describe('<RangeBandForm />', () => {
  describe('rangeBandModifier', () => {
    it('should show an error if there is data in the dropdown menu but not the input fields', () => {
      const data = { rangeBandModifier: '0', min: '', max: '' };

      const wrapper = shallow(
        <RangeBandForm
          onChange={jest.fn()}
          rangeBandFields={data}
          range="short"
          placeholder={['0', '8']}
        />,
      );

      const rangeBandSelect = wrapper.find(Select);

      expect(rangeBandSelect.props().error).toBe(true);
    });

    it('should be disabled if the isDisabled prop is true', () => {
      const data = { rangeBandModifier: '0', min: '', max: '' };

      const wrapper = shallow(
        <RangeBandForm
          onChange={jest.fn()}
          rangeBandFields={data}
          range="short"
          placeholder={['0', '8']}
          isDisabled
        />,
      );

      const rangeBandSelect = wrapper.find(Select);

      expect(rangeBandSelect.props().isDisabled).toBe(true);
    });
  });

  describe('minRange', () => {
    it('should show an error if there is data in the minRange field but not dropdown or maxRange fields', () => {
      const data = { rangeBandModifier: '', min: '0', max: '' };

      const wrapper = shallow(
        <RangeBandForm
          onChange={jest.fn()}
          rangeBandFields={data}
          range="short"
          placeholder={['0', '8']}
        />,
      );

      const minRangeInput = wrapper.find(Input).first();

      expect(minRangeInput.props().error).toBe(true);
    });

    it('should show an error if the input is not an integer', () => {
      const data = { rangeBandModifier: '', min: 'Z', max: '' };

      const wrapper = shallow(
        <RangeBandForm
          onChange={jest.fn()}
          rangeBandFields={data}
          range="short"
          placeholder={['0', '8']}
        />,
      );

      const minRangeInput = wrapper.find(Input).first();

      expect(minRangeInput.props().error).toBe(true);
    });

    it('should be disabled if the isDisabled prop is true', () => {
      const data = { rangeBandModifier: '', min: '0', max: '' };

      const wrapper = shallow(
        <RangeBandForm
          onChange={jest.fn()}
          rangeBandFields={data}
          range="short"
          placeholder={['0', '8']}
          isDisabled
        />,
      );

      const minRangeInput = wrapper.find(Input).first();

      expect(minRangeInput.props().disabled).toBe(true);
    });
  });

  describe('maxRange', () => {
    it('should show an error if there is data in the maxRange field but not dropdown or minRange fields', () => {
      const data = { rangeBandModifier: '', min: '', max: '8' };

      const wrapper = shallow(
        <RangeBandForm
          onChange={jest.fn()}
          rangeBandFields={data}
          range="short"
          placeholder={['0', '8']}
        />,
      );

      const maxRangeInput = wrapper.find(Input).last();

      expect(maxRangeInput.props().error).toBe(true);
    });

    it('should show an error if the input is not an integer', () => {
      const data = { rangeBandModifier: '', min: '', max: 'q' };

      const wrapper = shallow(
        <RangeBandForm
          onChange={jest.fn()}
          rangeBandFields={data}
          range="short"
          placeholder={['0', '8']}
        />,
      );

      const maxRangeInput = wrapper.find(Input).last();

      expect(maxRangeInput.props().error).toBe(true);
    });

    it('should be disabled if the isDisabled prop is true', () => {
      const data = { rangeBandModifier: '', min: '', max: '8' };

      const wrapper = shallow(
        <RangeBandForm
          onChange={jest.fn()}
          rangeBandFields={data}
          range="short"
          placeholder={['0', '8']}
          isDisabled
        />,
      );

      const maxRangeInput = wrapper.find(Input).last();

      expect(maxRangeInput.props().disabled).toBe(true);
    });
  });

  describe('isRangeBandSelectError', () => {
    it('should be false if the rangeBand is not empty but the min or max isnt', () => {
      const rangBandFields = { rangeBandModifier: '1', min: '1', max: '' };

      const result = isRangeBandSelectError(rangBandFields);

      expect(result).toBe(true);
    });
  });

  describe('isMinInputError', () => {
    it('should be false if the min is not empty but the rangeBandModifier or max isnt', () => {
      const rangBandFields = { rangeBandModifier: '', min: '1', max: '1' };

      const result = isMinInputError(rangBandFields);

      expect(result).toBe(true);
    });

    it('should be false if the min input is not a number', () => {
      const rangBandFields = { rangeBandModifier: '1', min: 'W', max: '1' };

      const result = isMinInputError(rangBandFields);

      expect(result).toBe(true);
    });
  });

  describe('isMaxInputError', () => {
    it('should be false if the max is not empty but the rangeBandModifier or min isnt', () => {
      const rangBandFields = { rangeBandModifier: '1', min: '', max: '1' };

      const result = isMaxInputError(rangBandFields);

      expect(result).toBe(true);
    });

    it('should be false if the max input is not a number', () => {
      const rangBandFields = { rangeBandModifier: '1', min: '1', max: 'E' };

      const result = isMaxInputError(rangBandFields);

      expect(result).toBe(true);
    });
  });
});
