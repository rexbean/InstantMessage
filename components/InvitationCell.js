import React, { Component } from 'react';
import { TouchableOpacity, View, Text, Image, StyleSheet, Alert } from 'react-native';
import { connect } from 'react-redux';
import NewMsgIcon from './NewMsgIcon';
import JMessage from 'jmessage-react-plugin';
import { Chat_VM } from '../stores/models/ChatScreenVM';

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
  },
  icon: {
    width: 45,
    height: 45,
  },
  info: {
    flex: 1,
    flexDirection: 'column',
    marginLeft: 15,

  },
});

class InvitationCell extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userInfo: undefined,
    };
    this.onPress = this.onPress.bind(this);
  }

  componentDidMount() {
    const { user, appKey } = this.props;
    const params = {
      username: user.username,
      appKey,
    };

    JMessage.getUserInfo(
      params,
      userInfo => {
        this.setState({ userInfo });
      },
      error => {
        Alert.alert(`Get UserInfo Result with ${error.code}`, `Get failed for ${error.description}`);
      },
    );
  }

  onPress() {
    const { user, navigation } = this.props;
    navigation.navigate('UserInfo', {
      user,
      invitation: true,
    });
  }

  render() {
    const { user } = this.props;
    const { userInfo } = this.state;

    const icon =
      userInfo === undefined || userInfo.avatarThumbPath === '' ? (
        <Image source={(require('../assets/images/myinfo-icon.png'))} style={styles.icon} />
      ) : (
        <Image source={{ uri: userInfo.avatarThumbPath }} style={styles.icon} />
      );

    return (
      <TouchableOpacity onPress={this.onPress}>
        <View style={styles.container}>
          {icon}
          <View style={styles.info}>
            <Text style={styles.name}>{user.username}</Text>
            <Text>Reason: {user.reason}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}

const mapStateToProps = state => ({
  appKey: state[Chat_VM].appKey,
});

export default connect(
  mapStateToProps,
  null,
)(InvitationCell);
