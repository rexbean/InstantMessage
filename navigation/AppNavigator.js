import { createAppContainer, createSwitchNavigator } from 'react-navigation';

import MainTabNavigator from './MainTabNavigator';
import AuthenticationStack from './AuthNavigator';
import ChatStackNavigator from './ChatNavigation';
import LoginScreen from '../screens/LoginScreen';
// import PhotoPicker from '../screens/PhotoPicker';
import ChatScreen from '../screens/ChatScreen';

const appNavigator = createSwitchNavigator({
    Auth: AuthenticationStack,
    Main: MainTabNavigator,
  },{
    initialRouteName: 'Auth',
  }
);


export default createAppContainer(appNavigator);
