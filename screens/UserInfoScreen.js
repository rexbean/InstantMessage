import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  TouchableWithoutFeedback,
  Keyboard,
  View,
  Text,
  Button,
  Alert,
  StyleSheet,
  DeviceEventEmitter,
} from 'react-native';
import JMessage from 'jmessage-react-plugin';
import { Chat_VM } from '../stores/models/ChatScreenVM';
import { Contact_VM } from '../stores/models/ContactScreenVM';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

class UsreInfoScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: props.navigation.state.params.user,
    };

    this.onAdd = this.onAdd.bind(this);
    this.onChat = this.onChat.bind(this);
    this.onAccept = this.onAccept.bind(this);
    this.onDecline = this.onDecline.bind(this);
    this.onDelete = this.onDelete.bind(this);
  }

  onAccept() {
    const { navigation, appKey } = this.props;
    // const { user } = this.props.navigation.state.params;
    const { user } = this.state;
    const params = {
      username: user.username,
      appKey,
    };

    JMessage.acceptInvitation(
      params,
      () => {
        Alert.alert('Result of Accept Invitation', 'invitation has accepted');
        DeviceEventEmitter.emit('accept', user);
        navigation.navigate('Contacts');
      },
      error => {
        Alert.alert(
          `Result of Accept Invitation with ${error.code}`,
          `invitation accept failed with ${error.description}`
        );
      },
    );
  }

  onDecline() {
    const { navigation, appKey } = this.props;
    // const { user } = this.props.navigation.state.params;
    const { user } = this.state;
    const params = {
      username: user.username,
      appKey,
      reason: 'no reason, just do not want to accept!',
    };

    JMessage.declineInvitation(
      params,
      () => {
        Alert.alert('Result of Decline Invitation', 'invitation has declined');
        DeviceEventEmitter.emit('decline', user);
        navigation.navigate('Contacts');
      },
      error => {
        Alert.alert(
          `Result of Decline Invitation with ${error.code}`,
          `invitation accept failed with ${error.description}`,
        );
      },
    );
  }

  onAdd() {
    const { appKey, navigation } = this.props;
    const { user } = this.state;
    const params = {
      username: user.username,
      appKey,
      reason: '',
    };

    JMessage.sendInvitationRequest(
      params,
      () => {
        Alert.alert('Add Contact Result', 'Sent Request Successfully');
        navigation.navigate('Contacts');
      },
      error => {
        Alert.alert(
          `Add Contact Result with ${error.code}`,
          `Sent Request failed for${error.description}`,
        );
      },
    );
  }

  onChat() {
    //create Conversation Here
    const { navigation, appKey } = this.props;
    const { user } = this.state;
    JMessage.createConversation(
      {
        type: 'single',
        username: user.username,
        appKey,
      },
      conversation => {
        DeviceEventEmitter.emit('newConversation', conversation);
        navigation.navigate('Conversations');
      },
      error => {
        Alert.alert(`Create Coversation with ${error.code}`, `The reason is ${error.description}`);
      },
    );
  }

  onDelete() {
    const { appKey } = this.props;
    // const { user } = this.props.navigation.state.params;
    const { user } = this.state;
    const params = {
      username: user.username,
      appKey,
      reason: 'No reason, just want to delete you',
    };

    JMessage.removeFromFriendList(
      params,
      () => {
        Alert.alert('Delete Result', `${user.username} has been remove successfully`);
        this.setState(
          prevState => ({
            user: {
              username: prevState.user.username,
              isFriend: false,
            },
          }),
          () => {
            DeviceEventEmitter.emit('removeFriend', user);
          },
        );
      },
      error => {
        Alert.alert(`Delete Result with ${error.code}`, `Delete failed, for ${error.description}`);
      },
    );
  }

  render() {
    const { invitation } = this.props.navigation.state.params;
    const { user } = this.state;
    let button;
    if (!user.isFriend) {
      if (invitation) {
        button = (
          <View style={styles.container}>
            <Button title="accept" onPress={this.onAccept} />
            <Button title="decline" onPress={this.onDecline} />
          </View>
        );
      } else {
        button = <Button title="add" onPress={this.onAdd} />;
      }
    } else {
      button = (
        <View style={styles.container}>
          <Button title="chat" onPress={this.onChat} />
          <Button title="delete" onPress={this.onDelete} />
        </View>
      );
    }
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <Text>{`This is the UserInfo Screen for User ${user.username}`}</Text>
          {button}
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

const mapStateToProps = state => ({
  appKey: state[Chat_VM].appKey,
});

const mapDispatchToProps = dispatch => ({
  changeInvitation: v => dispatch[Contact_VM].changeInvitation({ invitation: v }),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(UsreInfoScreen);
