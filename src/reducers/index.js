import { SET_DISPLAY_METRICS, SET_LAST_UPDATE, SET_NOT_ASSIGNED, UPDATE_METRIC } from '../actions';

export const defaultState = {
  temperature: null,
  humidity: null,
  pressure: null,
  updatedAt: {
    temperature: Date.now(),
    humidity: Date.now(),
    pressure: Date.now(),
  },
  displayMetrics: {}
};

export const metricsReducer = (state = defaultState, action) => {
  switch (action.type) {
    case UPDATE_METRIC:
      return { ...state, ...action.payload };
    case SET_DISPLAY_METRICS:
      const { displayMetrics, ...rest } = state;
      return { ...state, displayMetrics: rest };
    case SET_NOT_ASSIGNED:
      return { ...state, [action.key]: 'N/A', displayMetrics: { ...state.displayMetrics, [action.key]: 'N/A'} };
    case SET_LAST_UPDATE:
      return { ...state, updatedAt: { ...state.updatedAt, [action.key]: Date.now() }};
    default:
      return state;
  }
};
