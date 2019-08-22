import React, { Component } from 'react';
import { TouchableOpacity, View, Text, StyleSheet, Image, Alert } from 'react-native';
import { connect } from 'react-redux';
import { Chat_VM } from '../stores/models/ChatScreenVM';
import LeanCloud from '../IMClient/LeanCloud';

const styles = StyleSheet.create({
  name: {
    fontSize: 20,
  },
  icon: {
    width: 45,
    height: 45,
  },
  container: {
    flex: 1,
    flexDirection: 'row',
    height: 50,
    marginTop: 10,
    marginLeft: 20,
    marginRight: 20,
  },
  info: {
    marginLeft: 15
  }

})

class ChatCell extends Component {
  constructor(props){
    super(props);

    this.onPress = this.onPress.bind(this);
  }

  onPress() {
    const { setReceiver, navigation, name, conversation } = this.props;
    setReceiver(conversation.name);
    navigation.navigate('Chat', {
      conversation,
    });
  }

  render() {
    const { conversation } = this.props;
    const latestMsg =
      conversation.lastMessage === undefined ? '' : conversation.lastMessage.toFullJSON();

    return (
      <TouchableOpacity onPress={() => this.onPress()}>
        <View style={styles.container}>
          <View>
            <Image source={require('../assets/images/myinfo-icon.png')} style={[styles.icon]} />
          </View>
          <View style={styles.info}>
            <Text style={styles.name}>name: {conversation.name}</Text>
            <Text>last Message: {latestMsg}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}

const mapStateToProps = state => ({
  message: state[Chat_VM].message,
});

const mapDispatchToProps = dispatch => {
  return {
    setReceiver: v => dispatch[Chat_VM].setReceiver({ receiver: v }),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ChatCell);
