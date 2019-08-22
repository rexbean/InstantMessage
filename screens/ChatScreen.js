import React, { Component } from 'react';
import {
  TouchableWithoutFeedback,
  View,
  StyleSheet,
  FlatList,
  Alert,
  DeviceEventEmitter,
} from 'react-native';
import { connect } from 'react-redux';
import { Chat_VM } from '../stores/models/ChatScreenVM';
import MessageCell from '../components/MessageCell';
import { Login_VM } from '../stores/models/LoginScreenVM';
import ChatInput from '../components/ChatInput';
import BottomMenu from '../components/BottomMenu';
import ChatMenuButton from '../components/ChatMenuButton';
import LeanCloud from '../IMClient/LeanCloud';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
});

class ChatScreen extends Component {
  // static navigationOptions = ({ navigation }) => {

  // };

  constructor(props) {
    super(props);

    this.state = {
      curConversation: props.conversation,
    };
  }

  componentDidMount() {
    const { addMessage, receiver, conversation, appKey } = this.props;


    this.subscription = DeviceEventEmitter.addListener('removeFriend', this.onRemoveFriend);
    this.subscription = DeviceEventEmitter.addListener('deleted', this.getFriends);
    // Add new message Listener
    this.subscription = DeviceEventEmitter.addListener('message', this.onMessage);

    // Get History Message
    LeanCloud.getHistory(conversation);
  }

  onMessage({ message, conversation }) {
    const { curConversation } = this.state;
    const { addMessage } = this.props;
    // when receiving message
    if (curConversation.id === conversation.id) {
      // add message to the messageSet
      addMessage(message);
    }
  }

  render() {
    const { selfName, messageSet, navigation, show } = this.props;

    return (
      <TouchableWithoutFeedback >
        <View style={styles.container}>
          {/* Message List */}
          <View style={{ flex: show === true ? 3 : 5 }}>
            <FlatList
              data={messageSet}
              inverted={-1}
              renderItem={({ item }) => <MessageCell selfName={selfName} message={item} />}
              keyExtractor={item => item.id}
              ItemSeparatorComponent={this.renderSeparator}
            />
          </View>
          {/* Input Component */}
          <View style={{ height: 50, marginBottom: show === true ? 0 : 20 }}>
            <ChatInput style={styles.inputView} onSend={this.onSendPress} />
          </View>
          {/* Bottom Menu */}
          <View style={{ flex: show === true ? 1 : 0 }}>
            <BottomMenu navigation={navigation} />
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

const mapStateToProps = state => ({
  messageSet: state[Chat_VM].messageSet,
  selfName: state[Login_VM].username,
  show: state[Chat_VM].show,
  receiver: state[Chat_VM].receiver,
  appKey: state[Chat_VM].appKey,
});

const mapDispatchToProps = dispatch => ({
  addMessage: v => dispatch[Chat_VM].addMessage({ message: v }),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ChatScreen);
