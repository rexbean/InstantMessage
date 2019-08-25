import React, { Component } from 'react';
import { View, AppState } from 'react-native';
import { Provider } from 'react-redux';
import AppNavigator from './navigation/AppNavigator';
import NavigationService from './services/NavigationService';
import store from './stores';
import { configure } from './services/PushNotificationService';
import LeanCloud from './IMClient/LeanCloud';

class App extends Component {
  componentDidMount() {
    // configure the notification
    configure();
  }

  componentWillUnmount() {
    AppState.removeEventListener('change', LeanCloud.handleAppStateChange);
  }

  render() {
    return (
      <Provider store={store}>
        <View style={{ flex: 1 }}>
          <AppNavigator ref={navigatorRef => NavigationService.init(navigatorRef)} />
        </View>
      </Provider>
    );
  }
}

export default App;
