import React, { Component } from 'react';
import { SafeAreaView } from 'react-navigation';

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
import LeanCloud from '../IMClient/LeanCloud';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
});

class ChatScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      curConversation: props.navigation.state.params.conversation,
    };

    this.onMessage = this.onMessage.bind(this);
  }

  async componentDidMount() {
    const { addMessage, clearMessage } = this.props;
    const { curConversation } = this.state;

    this.subscription = DeviceEventEmitter.addListener('removeFriend', this.onRemoveFriend);
    this.subscription = DeviceEventEmitter.addListener('deleted', this.getFriends);
    // Add new message Listener
    this.subscription = DeviceEventEmitter.addListener('message', this.onMessage);

    // Get History Message
    try {
      clearMessage();
      let messages = await LeanCloud.getHistory(curConversation);
      messages.forEach(message => {
        addMessage(message);
      });
    } catch (e) {
      Alert.alert(`Get History error ${e}`);
    }
  }

  onMessage({ message, conversation }) {
    const { curConversation } = this.state;
    const { addMessage } = this.props;
    // when receiving message
    if (curConversation.id === conversation.id) {
      // add message to the messageSet
      addMessage(message);
      if (this._flatList != null) {
        this._flatList.scrollToEnd();
      }
    }
  }

  render() {
    const { selfName, messageSet, navigation, show } = this.props;
    const { curConversation } = this.state;
    return (
      <TouchableWithoutFeedback>
        <View style={styles.container}>
          {/* Message List */}
          <View>
            <FlatList
              style={{ height: show ? '73%' : '93%' }}
              ref={flatList => this._flatList=flatList}
              data={messageSet}
              renderItem={({ item }) => <MessageCell selfName={selfName} message={item} />}
              keyExtractor={item => item.id}
              contentContainerStyle={{ paddingBottom: 55 }}
            />
          </View>
          {/* Input Component */}
          <View style={{ height: 50, marginBottom: show ? 0 : 20 }}>
            <ChatInput
              style={styles.inputView}
              conversation={curConversation}
              _flatList={this._flatList}
            />
          </View>
          {/* Bottom Menu */}
          <View style={{ height: show ? '20%' : '0%' }}>
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
});

const mapDispatchToProps = dispatch => ({
  clearMessage: () => dispatch[Chat_VM].clearMessage(),
  addMessage: v => dispatch[Chat_VM].addMessage({ message: v }),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ChatScreen);
