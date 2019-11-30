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
  describe('modifier', () => {
    it('should show an error if there is no data in the dropdown menu but data in the input fields', () => {
      const data = { modifier: '', min: '0', max: '8' };

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
      const data = { modifier: '0', min: '', max: '' };

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
    it('should show an error if there is no data in the minRange field but data in the dropdown or maxRange fields', () => {
      const data = { modifier: '0', min: '', max: '8' };

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
      const data = { modifier: '0', min: 'Z', max: '8' };

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

    it('should show an error if the input is not a valid range', () => {
      const data = { modifier: '0', min: '3', max: '8' };

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
      const data = { modifier: '', min: '0', max: '' };

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
    it('should show an error if there is no data in the maxRange field but data in the dropdown or minRange fields', () => {
      const data = { modifier: '0', min: '0', max: '' };

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
      const data = { modifier: '0', min: '0', max: 'q' };

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

    it('should show an error if the input is not a valid range', () => {
      const data = { modifier: '0', min: '0', max: '5' };

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
      const data = { modifier: '', min: '', max: '8' };

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
    it('should be true if the rangeBand is empty but the min or max is not', () => {
      const rangBandFields = { modifier: '', min: '0', max: '8' };

      const result = isRangeBandSelectError(rangBandFields);

      expect(result).toBe(true);
    });
  });

  describe('isMinInputError', () => {
    it('should be true if the min is empty but the modifier or max is not', () => {
      const rangBandFields = { modifier: '', min: '', max: '8' };

      const result = isMinInputError(rangBandFields);

      expect(result).toBe(true);
    });

    it('should be true if the min range is greater than the max range', () => {
      const rangBandFields = { modifier: '0', min: '8', max: '0' };

      const result = isMinInputError(rangBandFields);

      expect(result).toBe(true);
    });

    it('should be false if the min input is not a number', () => {
      const rangBandFields = { modifier: '0', min: 'W', max: '8' };

      const result = isMinInputError(rangBandFields);

      expect(result).toBe(true);
    });

    it('should be false if the min input is not a valid range', () => {
      const rangBandFields = { modifier: '0', min: '3', max: '8' };

      const result = isMinInputError(rangBandFields);

      expect(result).toBe(true);
    });
  });

  describe('isMaxInputError', () => {
    it('should be true if the max is empty but the rangeBandModifier or min is not', () => {
      const rangBandFields = { modifier: '0', min: '', max: '' };

      const result = isMaxInputError(rangBandFields);

      expect(result).toBe(true);
    });

    it('should be true if the min range is greater than the max range', () => {
      const rangBandFields = { modifier: '0', min: '8', max: '0' };

      const result = isMaxInputError(rangBandFields);

      expect(result).toBe(true);
    });

    it('should be false if the max input is not a number', () => {
      const rangBandFields = { modifier: '0', min: '0', max: 'E' };

      const result = isMaxInputError(rangBandFields);

      expect(result).toBe(true);
    });

    it('should be false if the max input is not a valid range', () => {
      const rangBandFields = { modifier: '0', min: '0', max: '4' };

      const result = isMaxInputError(rangBandFields);

      expect(result).toBe(true);
    });
  });
});
