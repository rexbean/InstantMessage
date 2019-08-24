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
    this.onDelete = this.onDelete.bind(this);
  }

  async onAdd() {
    const { navigation } = this.props;
    const { user } = this.state;
    // on Add
    // follow a friend
  }

  async onChat() {
    // create Conversation Here
    const { navigation } = this.props;
    const { user } = this.state;
    // on Chat
    const conversation = await LeanCloud.createConversation(user.username);
    navigation.navigate('Chat', {
      user,
      conversation,
    });
  }

  async onDelete() {
    const { user } = this.state;
    // on Delete
    // unfollow
  }

  render() {
    const { user } = this.state;
    let button;
    if (!user.isFriend) {
      button = <Button title="add" onPress={this.onAdd} />;
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


const mapDispatchToProps = dispatch => ({
  changeInvitation: v => dispatch[Contact_VM].changeInvitation({ invitation: v }),
});

export default connect(
  null,
  mapDispatchToProps,
)(UsreInfoScreen);
