///<reference path="./types/react-beautiful-dnd/index.d.ts" />
import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import './styles/index.scss';
import { App } from './components/App/App';
import { Provider } from 'react-redux';
import store from './store';

//! won't work until concurrent mode is released

const render = (): void => {
  ReactDOM.unstable_createRoot(
    document.getElementById('root') as Element,
  ).render(
    <Provider store={store}>
      <App />
    </Provider>,
  );

  // ReactDOM.render(

  //   <Provider store={store}>
  //     <App />
  //   </Provider>,
  //   document.getElementById('root'),
  // );
};

render();

if (process.env.NODE_ENV === 'development' && module.hot) {
  module.hot.accept('./components/App/App', render);
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
