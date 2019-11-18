import {
  formReducer,
  updateFieldsInForm,
  loadFieldsInForm,
  useForm,
} from '../../hooks/useForm';
import { FormActionTypes } from '../../hooks/useForm.types';
import { mount, ReactWrapper } from 'enzyme';
import { Input } from '../../components/Input/Input';
import React, { useEffect } from 'react';

// TODO write tests for validation

describe('useForm', () => {
  let wrapper: ReactWrapper<any, Readonly<{}>, React.Component<{}, {}, any>>;

  afterEach(() => {
    if (wrapper && wrapper.length) {
      wrapper.unmount();
    }
  });

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
          field1: { value: 'field1' },
          field2: { value: ['field2a', 'field2b'] },
          field3: { value: false },
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
        field1: { value: 'field1' },
        field2: { value: ['field2a', 'field2b'] },
        field3: { value: false },
      };

      it('should update only one field when a updateFieldsInForm action is provided', () => {
        const newState = formReducer(
          initialState,
          updateFieldsInForm('field3', true),
        );

        const expectedState = {
          field1: { value: 'field1' },
          field2: { value: ['field2a', 'field2b'] },
          field3: { value: true },
        };

        expect(newState).toEqual(expectedState);
      });

      it('should update all fields when loadFieldsInForm action is procided', () => {
        const newFieldsData = {
          field1: { value: 'field1 data' },
          field3: { value: true },
        };

        const newState = formReducer(
          initialState,
          loadFieldsInForm(newFieldsData),
        );

        const expectedState = {
          field1: { value: 'field1 data' },
          field2: { value: ['field2a', 'field2b'] },
          field3: { value: true },
        };

        expect(newState).toEqual(expectedState);
      });
    });
  });

  describe('useForm hook', () => {
    let inputField: any = null;

    const Dummy = (): JSX.Element => {
      const { fields, onChangeInput, loadFormState } = useForm({
        field1: '',
      });

      useEffect(() => {
        loadFormState({ field1: 'foo' });
      }, [loadFormState]);

      inputField = fields;

      return (
        <Input
          onChange={onChangeInput}
          value={fields.field1}
          name="field1"
          label="Field 1"
        />
      );
    };

    it('should load the new form data into state', () => {
      mount(<Dummy />);

      const expectedInput = { field1: 'foo' };

      expect(inputField).toEqual(expectedInput);
    });

    it('should update state when the input changes', () => {
      wrapper = mount(<Dummy />);

      wrapper
        .find('input')
        .simulate('change', { target: { value: 'bar', name: 'field1' } });

      const expectedInput = { field1: 'bar' };

      expect(inputField).toEqual(expectedInput);
    });
  });
});
