import React, { Component } from 'react';
import { View } from 'react-native';
import { Provider } from 'react-redux';
import AppNavigator from './navigation/AppNavigator';
import NavigationService from './services/NavigationService';
import store from './stores';

class App extends Component {
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
