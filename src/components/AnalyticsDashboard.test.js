import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { metricsReducer } from '../reducers';
import AnalyticsDashboard from './AnalyticsDashboard';

const store = createStore(metricsReducer);
it('render AnalyticsDashboard without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <Provider store={store}>
      <AnalyticsDashboard/>
    </Provider>, div);
  ReactDOM.unmountComponentAtNode(div);
});
