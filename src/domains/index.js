// @flow

import { applyMiddleware, createStore, compose, combineReducers } from 'redux';
import { combineEpics, createEpicMiddleware } from 'redux-observable';
import { persistStore, persistCombineReducers } from 'redux-persist';
import autoMergeLevel1 from 'redux-persist/es/stateReconciler/autoMergeLevel1';
import immutableTransform from 'redux-persist-transform-immutable';
import storage from 'redux-persist/es/storage';

import {
  cached as productsCachedReducer,
  temp as productsTempReducer,
} from '@domains/entities/products/reducer';
import { KEY as productsKey } from '@domains/entities/products/selectors';
import productsEpic from '@domains/entities/products/epic';

const composeEnhancers =
__DEV__ && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : compose;

const rootEpic = combineEpics(productsEpic);
const rootReducer = persistCombineReducers({
  blacklist: ['tmp'],
  key: 'demo',
  stateReconciler: autoMergeLevel1,
  storage,
  throttle: 1000,
  transforms: [immutableTransform()],
  version: 1,
}, {
  [productsKey]: productsCachedReducer,
  temp: {
    [productsKey]: productsTempReducer,
  }
});

export const store = createStore(rootReducer, composeEnhancers(applyMiddleware(createEpicMiddleware(rootEpic))));
export const persistor = persistStore(store);

