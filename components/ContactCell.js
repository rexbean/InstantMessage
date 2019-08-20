import React, { Component } from 'react';
import { TouchableOpacity, View, Text, Image, StyleSheet } from 'react-native';
import NewMsgIcon from './NewMsgIcon';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    height: 50,
    marginTop: 10,
    marginLeft: 20,
    marginRight: 20,
  },
  name: {
    fontSize: 20,
    marginLeft: 15,
  },
  icon: {
    width: 45,
    height: 45,
  },
  msgIcon: {
    width: 20,
    height: 20,
    textAlign: 'center',
  },
  newMsgIcon: {
    marginLeft: 15,
  },
});

class ContactCell extends Component {
  constructor(props) {
    super(props);

    this.onPress = this.onPress.bind(this);
  }

  onPress() {
    const { option, user, navigation } = this.props;
    if (option === 'newFriend') {
      navigation.navigate('NewFriendList');
    } else if (option === 'groupChats') {
      navigation.navigate('GroupList');
    } else if (option === 'contact' || option === 'group') {
      navigation.navigate('UserInfo', {
        user,
        invitation: false,
      });
    }
  }

  render() {
    const { option, user, numberOfInvitations } = this.props;
    let icon;
    if (option === 'newFriend') {
      icon = <Image source={(require('../assets/images/friend-icon.png'))} style={styles.icon} />;
    } else if (option === 'groupChats') {
      icon = <Image source={(require('../assets/images/myinfo-icon.png'))} style={styles.icon} />;
    } else if (option === 'contact' || option === 'group' || 'invitation') {
      icon = <Image source={(require('../assets/images/myinfo-icon.png'))} style={styles.icon} />;
    }
    return (
      <TouchableOpacity onPress={this.onPress}>
        <View style={styles.container}>
          {icon}
          <Text style={styles.name}>{user.username}</Text>
          {numberOfInvitations !== 0 && option === 'newFriend' ? <NewMsgIcon style={styles.newMsgIcon} count={numberOfInvitations} />: null}
        </View>

      </TouchableOpacity>
    );
  }
}
export default ContactCell;
