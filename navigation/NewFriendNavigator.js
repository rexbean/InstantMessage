import { createStackNavigator } from 'react-navigation';
import NewFriendListScreen from '../screens/NewFriendListScreen';
import NewFriendReasonScreen from '../screens/NewFriendReasonScreen';

const NewFriendNavigator = createStackNavigator({
  NewFriendList: NewFriendListScreen,
  Reason: NewFriendReasonScreen,
});

export default NewFriendNavigator;
