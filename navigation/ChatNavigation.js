import { createStackNavigator } from 'react-navigation';
import ChatScreen from '../screens/ChatScreen';
import PhotoPicker from '../screens/PhotoPicker';

const ChatStackNavigator = createStackNavigator({
  Chat: ChatScreen,
  PhotoPicker,
});

export default ChatStackNavigator;
