// @flow

import { combineEpics } from 'redux-observable';
import { SyncEventEnum } from '@domains/_common/sync';
import readProducts from './actions';
import readProducts$ from './api';

export default combineEpics((action$, { getState }) =>
  action$
    .ofType(readProducts)
    .filter(({ payload }) => SyncEventEnum[payload.event] === SyncEventEnum.START)
    .mergeMap(() =>
      readProducts$()
        .map((ajaxResponse) => readProducts('END', ajaxResponse))
        .catch((ajaxError) => Observable.of(readProducts(ajaxError))),
    ),
);
