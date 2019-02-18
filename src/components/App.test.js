import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { metricsReducer } from '../reducers';

const store = createStore(metricsReducer);

it('render App without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <Provider store={store}>
      <App/>
    </Provider>, div);
  ReactDOM.unmountComponentAtNode(div);
});
