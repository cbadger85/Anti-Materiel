import React from 'react';
import { UnitInfoForm } from '../../../../pages/UnitEditor/UnitInfo/UnitInfoForm';
import { mount, ReactWrapper } from 'enzyme';

describe('<UnitInfoForm />', () => {
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

      wrapper = mount(
        <UnitInfoForm
          onSubmit={onSubmit}
          onCancel={jest.fn}
          initialData={initialData}
        />,
        { attachTo: root },
      );

      wrapper
        .find('#side-drawer-form-submit')
        .last()
        .simulate('click');

      expect(onSubmit).toBeCalledWith(initialData);
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

    wrapper = mount(
      <UnitInfoForm
        onSubmit={onSubmit}
        onCancel={jest.fn}
        initialData={initialData}
      />,
      { attachTo: root },
    );

    wrapper
      .find('#side-drawer-form-submit')
      .last()
      .simulate('click');

    expect(onSubmit).toBeCalledWith(initialData);
  });

  it('should call onCancel() when cancel is pressed', () => {
    const onCancel = jest.fn();

    wrapper = mount(<UnitInfoForm onSubmit={jest.fn} onCancel={onCancel} />, {
      attachTo: root,
    });

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

    wrapper = mount(
      <UnitInfoForm
        onSubmit={onSubmit}
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
});
