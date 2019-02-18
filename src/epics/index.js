import { setDisplayMetrics, setLastUpdate, setNotAssigned, UPDATE_METRIC } from '../actions';
import { combineEpics, ofType } from 'redux-observable';
import { map, filter, withLatestFrom, distinctUntilChanged, delay } from 'rxjs/operators';

export const updateDisplayMetricsEpic = (action$, state$) => {
  return action$.pipe(
    ofType(UPDATE_METRIC),
    distinctUntilChanged(),
    withLatestFrom(state$),
    filter(filterAllKeysExist),
    map(() => setDisplayMetrics())
  );
};

export const setNotAssignedEpic = (action$, state$) => {
  return action$.pipe(
    ofType(UPDATE_METRIC),
    map(parseFirstKey),
    delay(1000),
    filter((key) => key && Date.now() - state$.value.updatedAt[key] >= 1000),
    map((p) => setNotAssigned(p))
  );
};

export const setUpdateAtEpic = action$ => {
  return action$.pipe(
    ofType(UPDATE_METRIC),
    map(parseFirstKey),
    filter((key) => !!key),
    map((key) => setLastUpdate(key))
  );
};

function parseFirstKey({ payload }) {
  return Object.keys(payload || {})[0];
}

function filterAllKeysExist([val, { currentMetrics, ...rest }]) {
  return Object.keys(rest).every((k) => rest[k]);
}


export const rootEpic = combineEpics(
  updateDisplayMetricsEpic,
  setNotAssignedEpic,
  setUpdateAtEpic
);
