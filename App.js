import React, { Component } from 'react';
import { View } from 'react-native';
import { Provider } from 'react-redux';
import AppNavigator from './navigation/AppNavigator';
import NavigationService from './services/NavigationService';
import { appKey } from './const';
import store from './stores';

import friendEventListener from './listeners/friendEventListener';

class App extends Component {
  componentDidMount() {
    // init IMClient here
  }

  render() {
    return (
      <Provider store={store}>
        <View style={{ flex: 1 }}>
          <AppNavigator ref={navigatorRef => NavigationService.init(navigatorRef)}/>
        </View>
      </Provider>
    );
  }
}

export default App;
