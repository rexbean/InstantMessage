import React, { Component } from 'react';
import { View } from 'react-native';
import { Provider } from 'react-redux';
import JMessage from 'jmessage-react-plugin';
import AppNavigator from './navigation/AppNavigator';
import NavigationService from './services/NavigationService';
import { appKey } from './const';
import store from './stores';

import friendEventListener from './listeners/friendEventListener';

class App extends Component {
  componentDidMount() {
    const params = {
      appkey: appKey,
      isOpenMessageRoaming: true,
      isProduction: false,
      channel: '',
    };
    JMessage.init(params);
    JMessage.addContactNotifyListener(friendEventListener);
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
