import { updateDisplayMetricsEpic, setNotAssignedEpic } from './index';
import { TestScheduler } from 'rxjs/testing';
import { Subject } from 'rxjs';
import { SET_DISPLAY_METRICS, SET_NOT_ASSIGNED, UPDATE_METRIC } from '../actions';
import { StateObservable } from 'redux-observable';
import { defaultState } from '../reducers';
import { getRandomNumber } from '../emitters';

const scheduler = new TestScheduler((actual, expected) => {
  expect(actual).toEqual(expected);
});

let state$;

beforeEach(() => {
  state$ = new StateObservable(new Subject(), defaultState);
  scheduler.flush();
  scheduler.frame = 0;
});

describe('updateDisplayMetricsEpic', () => {
  it('reducer calling should be prevented', () => {
    scheduler.run(({ expectObservable, hot }) => {
      const action$ = hot('-a', {
        a: { type: UPDATE_METRIC }
      });
      const output$ = updateDisplayMetricsEpic(action$, state$);
      expectObservable(output$).toBe('-', []);
    });
  });
  it('reducer should be called', () => {
    scheduler.flush();
    scheduler.run(({ expectObservable, hot }) => {
      const action$ = hot('-a', {
        a: { type: UPDATE_METRIC, payload: { temperature: getRandomNumber(0, 100) } },
      });
      state$.value = {
        ...state$.value,
        temperature: getRandomNumber(0, 100),
        humidity: getRandomNumber(0, 100),
        pressure: getRandomNumber(0, 100)
      };
      const output$ = updateDisplayMetricsEpic(action$, state$);
      expectObservable(output$).toBe('-a', {
        a: {
          type: SET_DISPLAY_METRICS
        }
      });
    });
  });
});

describe('setNotAssignedEpic', () => {
  it('reducer calling should be prevented', () => {
    scheduler.run(({ expectObservable, hot }) => {
      const action$ = hot('-a', {
        a: { type: UPDATE_METRIC, payload: { temperature: getRandomNumber(0, 100) } },
      });
      const output$ = setNotAssignedEpic(action$, state$);
      expectObservable(output$).toBe('-', []);
    });
    scheduler.flush()
  });
  it('reducer should be called', () => {
    scheduler.run(({ expectObservable, hot }) => {
      state$.value = {
        ...state$.value,
        updatedAt: { temperature: Date.now() - 1000 }
      };
      const action$ = hot('-a', {
        a: { type: UPDATE_METRIC, payload: { temperature: getRandomNumber(0, 100) } },
      });
      const output$ = setNotAssignedEpic(action$, state$);
      expectObservable(output$).toBe('1s -a', {
        a: {
          type: SET_NOT_ASSIGNED,
          key: 'temperature'
        }
      });
    });
  });
});


