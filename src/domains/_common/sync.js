// @flow

import { combineReducers } from 'redux-immutable';
import { Map } from 'immutable';
import { snakeCase } from 'lodash';
import { type ActionType, createAction, handleAction } from 'redux-actions';

export const SyncEventEnum = {
  CANCEL: 0,
  START: 1,
  END: 2,
  PROGRESS: 3,
};

export type SyncEvent = $Keys<typeof SyncEventEnum>;

export function ActionsFactory(domain: string) {
  const DOMAIN = snakeCase(domain).toUpperCase();
  const createCreator = (event: SyncEvent, body: mixed = {}) => ({ event, body });
  const readCreator = (event: SyncEvent, body: mixed = {}) => ({ event, body });
  const readByIdCreator = (event: SyncEvent, id: string, body: mixed = {}) => ({ event, id, body });
  const updateByIdCreator = (event: SyncEvent, id: string, body: mixed = {}) => ({ event, id, body });
  const deleteByIdCreator = (event: SyncEvent, id: string) => ({ event, id });

  return {
    create: createAction(`CREATE_${DOMAIN}`, createCreator),
    read: createAction(`READ_${DOMAIN}`, readCreator),
    readById: createAction(`READ_BY_ID_${DOMAIN}`, readByIdCreator),
    updateById: createAction(`UPDATE_BY_ID_${DOMAIN}`, updateByIdCreator),
    deleteById: createAction(`DELETE_BY_ID_${DOMAIN}`, deleteByIdCreator),
  };
}

export function ReducerFactory(domain: string) {
  const { create, read, readById, updateById, deleteById } = ActionsFactory(domain);
  const indexLoadingReducer = (state, { payload }: ActionType<typeof create>) =>
    SyncEventEnum[payload.event] === SyncEventEnum.START || SyncEventEnum[payload.event] === SyncEventEnum.PROGRESS;
  const resourceLoadingReducer = (state, { payload }: ActionType<typeof readById>) =>
    (SyncEventEnum[payload.event] === SyncEventEnum.END || SyncEventEnum[payload.event] === SyncEventEnum.CANCEL
      ? state.delete(payload.id)
      : state.set(payload.id, true));

  return combineReducers({
    isCreating: handleAction(create, indexLoadingReducer, false),
    isReading: handleAction(read, indexLoadingReducer, false),
    isReadingByIds: handleAction(readById, resourceLoadingReducer, Map()),
    isUpdatingByIds: handleAction(updateById, resourceLoadingReducer, Map()),
    isDeletingByIds: handleAction(deleteById, resourceLoadingReducer, Map()),
  });
}
