import {
  formReducer,
  updateFieldsInForm,
  loadFieldsInForm,
  useForm,
} from '../../hooks/useForm';
import { FormActionTypes } from '../../hooks/useForm.types';
import { mount } from 'enzyme';
import { Input } from '../../components/Input/Input';
import React, { useEffect } from 'react';

describe('useForm', () => {
  describe('useForm state', () => {
    describe('updateFieldsInForm', () => {
      it('should create the correct updateFieldsInForm action', () => {
        const fieldKey = 'field1';
        const fieldValue = 'field value';

        const action = updateFieldsInForm(fieldKey, fieldValue);

        const expectedAction = {
          type: FormActionTypes.UPDATE,
          payload: {
            key: fieldKey,
            value: fieldValue,
          },
        };

        expect(action).toEqual(expectedAction);
      });
    });

    describe('loadFieldsInForm', () => {
      it('should create the correct loadFieldsInForm action', () => {
        const newState = {
          field1: 'field1',
          field2: ['field2a', 'field2b'],
          field3: false,
        };

        const action = loadFieldsInForm(newState);

        const expectedAction = {
          type: FormActionTypes.LOAD_DATA,
          payload: {
            data: newState,
          },
        };

        expect(action).toEqual(expectedAction);
      });
    });

    describe('form reducer', () => {
      const initialState = {
        field1: 'field1',
        field2: ['field2a', 'field2b'],
        field3: false,
      };

      it('should update only one field when a updateFieldsInForm action is provided', () => {
        const newState = formReducer(
          initialState,
          updateFieldsInForm('field3', true),
        );

        const expectedState = {
          field1: 'field1',
          field2: ['field2a', 'field2b'],
          field3: true,
        };

        expect(newState).toEqual(expectedState);
      });

      it('should update all fields when loadFieldsInForm action is procided', () => {
        const newFieldsData = {
          field1: 'field1 data',
          field3: true,
        };

        const newState = formReducer(
          initialState,
          loadFieldsInForm(newFieldsData),
        );

        const expectedState = {
          field1: 'field1 data',
          field2: ['field2a', 'field2b'],
          field3: true,
        };

        expect(newState).toEqual(expectedState);
      });
    });
  });

  describe('useForm hook', () => {
    let formState: any = null;

    const Dummy = () => {
      const { state, onChangeInput, onLoadFormState } = useForm({
        field1: '',
      });

      useEffect(() => {
        onLoadFormState({ field1: 'foo' });
      }, []);

      formState = state;

      return (
        <Input
          onChange={onChangeInput}
          value={state.field1}
          name="field1"
          label="Field 1"
        />
      );
    };

    it('should load the new form data into state', () => {
      mount(<Dummy />);

      const expectedFormState = { field1: 'foo' };

      expect(formState).toEqual(expectedFormState);
    });

    it('should update state when the input changes', () => {
      const wrapper = mount(<Dummy />);

      wrapper
        .find('input')
        .simulate('change', { target: { value: 'bar', name: 'field1' } });

      const expectedFormState = { field1: 'bar' };

      expect(formState).toEqual(expectedFormState);
    });
  });
});
