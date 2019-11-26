import React from 'react';
import { mount, ReactWrapper } from 'enzyme';
import { UnitEditor } from '../../../pages/UnitEditor/UnitEditor';

// TODO write tests for this

describe('<UnitEditor />', () => {
  let wrapper: ReactWrapper<any, Readonly<{}>, React.Component<{}, {}, any>>;

  // add a div with #modal-root id to the global body
  //@ts-ignore
  const modalRoot = global.document.createElement('div');
  modalRoot.setAttribute('id', 'modal-root');
  //@ts-ignore
  const body = global.document.querySelector('body');
  body.appendChild(modalRoot);

  afterEach(() => {
    wrapper.unmount();
  });

  it('should mount successfully', () => {
    wrapper = mount(<UnitEditor />);

    const unitEditor = wrapper.find(UnitEditor);

    expect(unitEditor).toHaveLength(1);
  });
});
