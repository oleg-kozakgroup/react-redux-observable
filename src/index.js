import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import './index.css';
import App from './components/App';
import { createEpicMiddleware } from 'redux-observable';
import { applyMiddleware, createStore } from 'redux';
import { metricsReducer } from './reducers';
import { rootEpic } from './epics';

const epicMiddleware = createEpicMiddleware();

const store = createStore(metricsReducer,
  applyMiddleware(epicMiddleware)
);

epicMiddleware.run(rootEpic);

ReactDOM.render(
  <Provider store={store}>
    <App/>
  </Provider>,
  document.getElementById('root'));
