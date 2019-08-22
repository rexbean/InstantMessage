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
import { Chat_VM } from '../stores/models/ChatScreenVM';
import { Contact_VM } from '../stores/models/ContactScreenVM';
import LeanCloud from '../IMClient/LeanCloud';

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
    // onAccept
    DeviceEventEmitter.emit('accept', user);
    navigation.navigate('Conversations');
  }

  onDecline() {
    const { navigation, conversation } = this.props;
    // const { user } = this.props.navigation.state.params;
    const { user } = this.state;
    // on Decline
    LeanCloud.decline(conversation);
  }

  async onAdd() {
    const { appKey, navigation } = this.props;
    const { user } = this.state;
    // on Add
    try {
      await LeanCloud.createConversation(user);
      Alert.alert('Send Invitation Successfully');
    } catch (e) {
      Alert.alert('send request failed');
    }

  }

  onChat() {
    // create Conversation Here
    const { navigation, appKey } = this.props;
    const { user } = this.state;
    // on Chat
    const conversation = LeanCloud.createConversation(user);
    navigation.navigate('Chat', {
      conversation,
    });
  }

  async onDelete() {
    const { user } = this.state;
    // on Delete
    const result = await LeanCloud.delete(user);
    if (result === true) {
      Alert.alert('Deleted Successfully!');
      DeviceEventEmitter.emit('removeFriend', user);
    }
  }

  render() {
    const { invitation, isFriend } = this.props.navigation.state.params;
    const { user } = this.state;
    let button;
    if (!isFriend) {
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
          <Text>{`This is the UserInfo Screen for User ${user}`}</Text>
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
