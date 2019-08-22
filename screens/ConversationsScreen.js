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
        <Image
          source={require('../assets/images/chat-icon.png')}
          style={[styles.icon, { tintColor }]}/>
      ),
    };
  };

  constructor(props) {
    super(props);

    this.state = {
      conversations: [],
    }
    this.onAccept = this.onAccept.bind(this);
    this.onDecline = this.onDecline.bind(this);
    this.onReceiveInvitation = this.onReceiveInvitation.bind(this);
    this.onNewConversation = this.onNewConversation.bind(this);
  }

  async componentDidMount() {
    const { addConversations } = this.props;
    // get conversation here
    const conversations = await LeanCloud.getConversations();
    this.setState({ conversations });

    this.subscription = DeviceEventEmitter.addListener('accept', this.onAccept);
    this.subscription = DeviceEventEmitter.addListener('decline', this.onDecline);
    this.subscription = DeviceEventEmitter.addListener(
      'receiveInvitation',
      this.onReceiveInvitation,
    );
    this.subscription = DeviceEventEmitter.addListener('chat', this.onNewConversation);

    // TODO this.subscription = DeviceEventEmitter.addListener('onAccepted', this.onAccepted);
  }

  async onAccept(user) {
    const { addConversations } = this.props;
    const conversation = await LeanCloud.createConversation(user);
    addConversations(conversation);
    this.changeInvitation(user);
  }

  onDecline(user) {
    this.changeInvitation(user);
  }

  onReceiveInvitation(user) {
    const { receiveInvitation } = this.props;
    receiveInvitation(user);
  }

  onNewConversation(conversation) {
    const { addConversations } = this.props;
    addConversations(conversation);
  }

  changeInvitation(user) {
    const { changeInvitation } = this.props;
    changeInvitation(user);
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
          marginBottom: 5
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
          renderItem={({ item }) => <ChatCell navigation={navigation} conversation={item} />}
          keyExtractor={item => item.key}
          ItemSeparatorComponent={this.renderSeparator}
        />
      </TouchableWithoutFeedback>
    );
  }
}

const mapStateToProps = state => ({
  conversations: state[Conversation_VM].conversations,
});

const mapDispatchToProps = dispatch => ({
  addConversations: v => dispatch[Conversation_VM].addConversations({ conversations: v }),
  receiveInvitation: v => dispatch[Contact_VM].receiveInvitation({ invitation: v }),
  changeInvitation: v => dispatch[Contact_VM].changeInvitation({ invitation: v }),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ConversationsScreen);
