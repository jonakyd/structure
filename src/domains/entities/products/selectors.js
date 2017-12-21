// @flow

export const KEY = 'entities/products';
export const getProducts = (state) => state[KEY];
export const getProductsSync = (state) => state.temp[KEY].get('sync');
