import React, { Component } from 'react';
import { TouchableOpacity, View, Text, StyleSheet, Image, Alert, DeviceEventEmitter } from 'react-native';
import { connect } from 'react-redux';
import { Chat_VM } from '../stores/models/ChatScreenVM';
import { Conversation_VM } from '../stores/models/ConversationScreenVM';
import LeanCloud from '../IMClient/LeanCloud';
import Avatar from './Avatar';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    height: 50,
    marginTop: 10,
    marginLeft: 20,
    marginRight: 20,
  },
  info: {
    position: 'absolute',
    marginLeft: 60,
  },
  name: {
    fontSize: 20,
  },
})

class ChatCell extends Component {
  constructor(props) {
    super(props);

    this.state = {
      unreadMessagesCount: props.conversation.unreadMessagesCount,
      latestMsg:
        props.conversation.lastMessage === undefined ? '' : props.conversation.lastMessage._lctext,
    };

    this.onPress = this.onPress.bind(this);
    this.onMessage = this.onMessage.bind(this);
    this.getConversationName = this.getConversationName.bind(this);
    this.getConversationType = this.getConversationType.bind(this);
  }

  componentDidMount() {
    this.subscription = DeviceEventEmitter.addListener('message', this.onMessage);
  }

  onMessage({ message, conversation: newConvers }) {
    const { conversation } = this.props;
    console.log('new message');
    if (newConvers.id === conversation.id) {
      console.log('found');
      this.setState({
        unreadMessagesCount: newConvers.unreadMessagesCount,
        latestMsg: message._lctext,
      });
    }
  }

  async onPress() {
    const { setReceiver, navigation, conversation } = this.props;
    const { unreadMessagesCount } = this.state;

    DeviceEventEmitter.emit('decreaseCount', -unreadMessagesCount);
    try {
      const result = await LeanCloud.read(conversation);
      this.setState({ unreadMessagesCount: 0 });
      navigation.navigate('Chat', {
        conversation: result,
      });
    } catch (e) {
      Alert.alert('read error', e);
    }
  }

  getConversationName(conversation) {
    if (conversation.members.length === 2) {
      if (conversation.members[0] === LeanCloud.username) {
        return conversation.members[1];
      }
      return conversation.members[0];
    }
    return conversation.name;
  }

  getConversationType(conversation) {
    if (conversation.members.length === 2) {
      return 'single';
    }
    return 'group';
  }

  render() {
    const { conversation } = this.props;
    const { unreadMessagesCount, latestMsg } = this.state;

    const name = this.getConversationName(conversation);
    const type = this.getConversationType(conversation);

    return (
      <TouchableOpacity onPress={() => this.onPress()}>
        <View style={styles.container}>
          <View>
            <Avatar style={{ width: 46, height: 46 }} type={type} count={unreadMessagesCount} />
          </View>
          <View style={styles.info}>
            <Text style={styles.name}>{name}</Text>
            <Text
              style={{
                fontWeight: unreadMessagesCount !== 0 ? 'bold' : 'normal',
              }}
            >
              {latestMsg}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}

const mapStateToProps = state => ({
  message: state[Chat_VM].message,
});

export default connect(
  mapStateToProps,
  null,
)(ChatCell);
