import { createStackNavigator } from 'react-navigation';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';

const AuthStackNavigator = createStackNavigator({
  Login: LoginScreen,
  Register: RegisterScreen,
});

export default AuthStackNavigator;
