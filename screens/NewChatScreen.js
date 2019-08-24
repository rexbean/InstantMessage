import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  TouchableWithoutFeedback,
  Button,
  Keyboard,
  FlatList,
  View,
  Alert,
  StyleSheet,
} from 'react-native';
import LeanCloud from '../IMClient/LeanCloud';
import { Conversation_VM } from '../stores/models/ConversationScreenVM';
import PickFriend from '../components/PickFriend';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

class NewChatScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      contacts: [],
      picked: {},
    };

    this.onPick = this.onPick.bind(this);
    this.onPress = this.onPress.bind(this);
    this.getFriends = this.getFriends.bind(this);
    this.renderSeparator = this.renderSeparator.bind(this);

  }

  componentDidMount() {
    this.getFriends();
  }

  onPick(id) {
    console.log(id, this.state.picked[id]);
    const newPicked = Object.assign({}, this.state.picked, {[id]: !this.state.picked[id]})
    console.log(newPicked);
    this.setState({ picked: newPicked });
  }

  async onPress() {
    const { picked } = this.state;
    const { navigation } = this.props;
    const pickedArr = [];
    Object.keys(picked).forEach(key => {
      if (picked[key] && key !== LeanCloud.username) {
        pickedArr.push(key);
      }
    });
    try {
      const conversation = await LeanCloud.createConversation(pickedArr);
      navigation.navigate('Chat', {
        conversation,
      });
    } catch (e) {
      Alert.alert('create group error', e);
    }
  }

  getFriends() {
    // Get Friends Here
    const contacts = [
      {
        username: '123123',
        isFriend: true,
      },
      {
        username: '456456',
        isFriend: true,
      },
      {
        username: '456465',
        isFriend: true,
      },
      {
        username: '789789',
        isFriend: true,
      },
    ];

    const picked = {};
    contacts.forEach(contact => {
      picked[contact.username] = false;
    });
    this.setState({ contacts, picked });
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
    const { contacts, picked } = this.state;
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <Button title="Create" onPress={this.onPress} />
          <FlatList
            data={contacts}
            renderItem={({ item }) => (
              <PickFriend
                friend={item}
                onPick={this.onPick}
                checked={picked[item.username]}
              />
            )}
            extraData={this.state}
            keyExtractor={item => item.id}
            ItemSeparatorComponent={this.renderSeparator}
          />
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

export default NewChatScreen;
