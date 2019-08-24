import {
  TouchableWithoutFeedback,
  Keyboard,
  FlatList,
  View,
  Image,
  StyleSheet,
  Alert,
  DeviceEventEmitter,
} from 'react-native';
import React, { Component } from 'react';
import ChatCell from '../components/ChatCell';
import { connect } from 'react-redux';
import { Conversation_VM } from '../stores/models/ConversationScreenVM';
import { Contact_VM } from '../stores/models/ContactScreenVM';
import LeanCloud from '../IMClient/LeanCloud';
import Avatar from '../components/Avatar';

const styles = StyleSheet.create({
  icon: {
    width: 26,
    height: 26,
  },
  container: {
    flex: 1,
  },
});

class ConversationsScreen extends Component {
  static navigationOptions = () => {
    return {
      title: 'Conversations',
      tabBarIcon: ({ tintColor }) => (
        <Avatar type="conversation" style={[styles.icon, { tintColor }]} />
      ),
    };
  };

  constructor(props) {
    super(props);

    this.state = {
      conversations: [],
    };

    this.onNewConversation = this.onNewConversation.bind(this);
    this.refreshConversations = this.refreshConversations.bind(this);
    this.onMessage = this.onMessage.bind(this);
  }

  async componentDidMount() {
    // get conversation here
    let totalUnread = 0;
    const conversations = await LeanCloud.getConversations();
    conversations.forEach(conversation => {
      totalUnread += conversation.unreadMessagesCount;
    });

    this.setState({ conversations });
    // get total unread here
    DeviceEventEmitter.emit('increaseCount', totalUnread);
    this.subscription = DeviceEventEmitter.addListener('chat', this.onNewConversation);
    this.subscription = DeviceEventEmitter.addListener('message', this.onMessage);
  }

  shouldComponentUpdate(nextProps, nextState) {
    if(nextState.conversations.length !== this.state.conversations.length){
      return true;
    }

    for (let i = 0; i < nextState.conversations.length; i += 1) {
      if (nextState.conversations[i].lastMessage === undefined
        && this.state.conversations[i].lastMessage === undefined) {
        continue;
      } else if (
        nextState.conversations[i].lastMessage !== undefined &&
        this.state.conversations[i].lastMessage !== undefined
      ) {
        if (
          nextState.conversations[i].lastMessage._lctext !=
          this.state.conversations[i].lastMessage._lctext
        ) {
          return true;
        }
      } else {
        return false;
      }
    }
    return false;
  }

  onNewConversation(conversation) {
    const { addConversations } = this.props;
    addConversations(conversation);
  }

  onMessage({ message, conversation }) {
    this.refreshConversations(conversation);
  }

  // output(thisState){
  //   console.log(thisState.lastMessage === undefined? 'undefined' :thisState.lastMessage._lctext);
  // }

  refreshConversations(convers) {
    const { increaseNumOfUnread } = this.props
    const { conversations } = this.state;
    const newConversations = [];
    conversations.forEach(conversation => {
      if (convers.id !== conversation.id) {
        newConversations.push(conversation);
      }
    });

    newConversations.unshift(convers);
    increaseNumOfUnread(1);
    this.setState({ conversations: newConversations });
  }

  renderSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: '86%',
          backgroundColor: '#CED0CE',
          marginLeft: 20,
          marginTop: 5,
          marginBottom: 5,
        }}
      />
    );
  };

  render() {
    const { conversations } = this.state;
    const { navigation } = this.props;

    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <FlatList
          style={{ flex: 1 }}
          data={conversations}
          renderItem={({ item }) => {
            return <ChatCell navigation={navigation} conversation={item} />
          }}
          keyExtractor={item => item.id}
          extraData={this.state.conversations}
          ItemSeparatorComponent={this.renderSeparator}
        />
      </TouchableWithoutFeedback>
    );
  }
}

const mapStateToProps = state => ({
  conversations: state[Conversation_VM].conversations,
  numOfUnReads: state[Conversation_VM].numOfUnReads,
});

const mapDispatchToProps = dispatch => ({
  increaseNumOfUnread: v => dispatch[Conversation_VM].increaseNumOfUnread({ unreadCount: v }),
  receiveInvitation: v => dispatch[Contact_VM].receiveInvitation({ invitation: v }),
  changeInvitation: v => dispatch[Contact_VM].changeInvitation({ invitation: v }),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ConversationsScreen);
