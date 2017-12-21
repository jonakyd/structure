// @flow

import { ReducerFactory } from '@domains/_common/sync';
import { handleAction } from 'redux-actions';
import { fromJS, Map } from 'immutable';
import { combineReducers } from 'redux-immutable';
import readProducts from './actions';

export const cached = handleAction(readProducts, {
  next(state, { payload }) {
    if (payload.event === 'END') {
      return fromJS(payload.body);
    }

    return state;
  },
  throw(state, action) {
    return state;
  }
}, Map());

export const temp = combineReducers({
  sync: ReducerFactory('products'),
}, Map());
