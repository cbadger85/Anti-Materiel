import React from 'react';
import { mount, ReactWrapper } from 'enzyme';
import { App } from '../components/App/App';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';
import rootReducer from '../store/rootReducer';

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

  const store = configureStore({
    reducer: rootReducer,
    preloadedState: {
      weapons: [],
    },
  });

  it('should render without crashing', () => {
    wrapper = mount(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/']}>
          <App />
        </MemoryRouter>
      </Provider>,
    );

    const app = wrapper.find('.App');

    expect(app).toHaveLength(1);
  });
});
