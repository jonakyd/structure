// @flow

import React, { Component } from 'react';
import { AppRegistry } from 'react-native';
import { Provider } from 'react-redux';
import { store, persistor } from '@domains';
import { PersistGate } from 'redux-persist/es/integration/react'
import App from '@containers/App/';
import { View } from 'react-native';

class Root extends Component {
  render() {
    return (
      <PersistGate persistor={persistor}>
        <Provider store={store}>
          <App />
        </Provider>
      </PersistGate>
    );
  }
}

AppRegistry.registerComponent('StructureDemo', () => Root);
