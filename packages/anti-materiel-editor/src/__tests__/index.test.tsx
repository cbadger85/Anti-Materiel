import React from 'react';
import { mount, ReactWrapper } from 'enzyme';
import { App } from '../components/App/App';

describe('<App />', () => {
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

  it('should render without crashing', () => {
    wrapper = mount(<App />);

    const app = wrapper.find('.App');

    expect(app).toHaveLength(1);
  });
});
