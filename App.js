import React, { Component } from 'react';
import { View, Alert } from 'react-native';
import { Provider } from 'react-redux';
import AppNavigator from './navigation/AppNavigator';
import NavigationService from './services/NavigationService';
import { appID } from './const';
import store from './stores';
import { CometChat } from '@cometchat-pro/chat';

class App extends Component {
  async componentDidMount() {
    // init IMClient here
    // const isNet = await fetch("https://www.baidu.com");
    // if(isNet.status=200){
    //     Alert.alert('有网络');
    //     console.log('rexbean baidu', isNet);
    // }else{
    //     Alert.alert('没有网络');
    // }
    CometChat.init(appID).then(
      () => {
        Alert.alert('result', 'Initialization completed successfully');
        // You can now call login function.
      },
      error => {
        Alert.alert('result', error);
        // Check the reason for error and take appropriate action.
      },
    );
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
