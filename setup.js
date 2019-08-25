import { Alert, AppState } from 'react-native';
import App from './App';
import LeanCloud from './IMClient/LeanCloud';

function setup() {
  // init leancloud
  LeanCloud.init();
  // report error
  // require('ErrorUtils').setGlobalHandler(err => {
  //   Alert.alert('error', err);
  // });
  return App;
}


export default setup;
