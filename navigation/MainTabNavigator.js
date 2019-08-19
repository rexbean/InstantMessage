import { createBottomTabNavigator, createStackNavigator } from 'react-navigation';
import React from 'react';
import { Alert } from 'react-native';
import AddButton from '../components/AddButton';
import ChatMenuButton from '../components/ChatMenuButton';
import ConversationsScreen from '../screens/ConversationsScreen';
import ProfileScreen from '../screens/ProfileScreen';
import ChatScreen from '../screens/ChatScreen';
import PhotoPicker from '../screens/PhotoPicker';
import GroupListScreen from '../screens/GroupListScreen';
import NewFriendStackNavigator from './NewFriendNavigator';
import ContactsScreen from '../screens/ContactsScreen';
import NewContactScreen from '../screens/NewContactScreen';
import NewChatScreen from '../screens/NewChatScreen';
import UserInfoScreen from '../screens/UserInfoScreen';

export const bottomNavigator = createBottomTabNavigator({
    Conversations: {
      screen: ConversationsScreen,
    },
    Contacts: {
      screen: ContactsScreen,
    },
    Profile: {
      screen: ProfileScreen,
    },
  },
  {
    tabBarOptions: {
      activeTintColor: '#e91e63',
    },
  },
);

const MainTabNavigator = createStackNavigator({
  BottomNavigator: bottomNavigator,
  // chat navigator
  Chat: ChatScreen,
  PhotoPicker,
  // contact navigator
  NewFriend: NewFriendStackNavigator,
  GroupList: GroupListScreen,
  // add new navigator
  AddNewContact: NewContactScreen,
  AddNewChat: NewChatScreen,
  // new Contact navigator,
  UserInfo: UserInfoScreen,
});

bottomNavigator.navigationOptions = ({ navigation }) => {
  return { headerRight: <AddButton navigation={navigation} /> };
};
export default MainTabNavigator;
