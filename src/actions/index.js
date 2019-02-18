export const UPDATE_METRIC = 'UPDATE_METRIC';
export const SET_DISPLAY_METRICS = 'SET_DISPLAY_METRICS';
export const SET_NOT_ASSIGNED = 'SET_NOT_ASSIGNED';
export const SET_LAST_UPDATE = 'SET_LAST_UPDATE';

export const updateMetric = (payload) => ({ type: UPDATE_METRIC, payload });
export const setDisplayMetrics = () => ({ type: SET_DISPLAY_METRICS });
export const setNotAssigned = (key) => ({ type: SET_NOT_ASSIGNED, key });
export const setLastUpdate = (key) => ({ type: SET_LAST_UPDATE, key });
