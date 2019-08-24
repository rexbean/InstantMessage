import React, { Component } from 'react';
import { View, Button, Image, StyleSheet, TextInput, TouchableOpacity, Text, Alert } from 'react-native';
import { connect } from 'react-redux';
import { Chat_VM } from '../stores/models/ChatScreenVM';
import LeanCloud from '../IMClient/LeanCloud';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  innerContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#dadee6',
    padding: 5,
  },
  icon: {
    width: 25,
    height: 25,
    margin: 3,
  },
  inputStyle: {
    width: '72%',
    lineHeight: 20,
    fontSize: 25,
    margin: 3,
    backgroundColor: 'white',
  },
})

class ChatInput extends Component {
  constructor(props) {
    super(props);

    this.onShowMenu = this.onShowMenu.bind(this);
    this.onSend = this.onSend.bind(this);
  }

  componentDidMount() {
    const { setShow } = this.props;
    setShow(false);
  }

  // send text message
  async onSend() {
    const { conversation, message, addMessage, changeMessage, _flatList } = this.props;
    try {
      const msg = await LeanCloud.sendTextMessage(conversation, message);
      addMessage(msg);
      changeMessage('');
      _flatList.scrollToEnd();
    } catch (e) {
      Alert.alert(e);
    }
  }

  onShowMenu(type) {
    const { setShow, setContent, show, _flatList } = this.props;
    const newShow = !show;
    setShow(newShow);
    setContent(type);
    setTimeout(() => {
      _flatList.scrollToEnd();
    }, 30);
  }

  render() {
    const { message, changeMessage } = this.props;
    return (
      <View style={styles.container}>
        <View style={styles.innerContainer}>
          {/* attachment */}
          <TouchableOpacity onPress={() => this.onShowMenu('attachment')}>
            <Image source={require('../assets/images/Attachment.png')} style={[styles.icon]} />
          </TouchableOpacity>
          {/* input component */}
          <TextInput
            style={styles.inputStyle}
            multiline={true}
            numberOfLines={1}
            autoFocus={true}
            autoCapitalize="none"
            autoCorrect={false}
            value={message}
            onChangeText={text => changeMessage(text)}
          />
          {/* Emoji  */}
          <TouchableOpacity onPress={() => this.onShowMenu('emoji')}>
            <Image source={require('../assets/images/Emoji.png')} style={[styles.icon]} />
          </TouchableOpacity>
          {/* Send Button */}
          <TouchableOpacity onPress={()=>this.onSend()}>
            <Image source={require('../assets/images/Send.png')} style={[styles.icon]} />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  message: state[Chat_VM].message,
  show: state[Chat_VM].show,
});

const mapDispatchToProps = dispatch => ({
  addMessage: v => dispatch[Chat_VM].addMessage({ message: v }),
  changeMessage: v => dispatch[Chat_VM].changeMessage({ message: v }),
  setShow: v => dispatch[Chat_VM].setShow({ show: v }),
  setContent: v => dispatch[Chat_VM].setContent({ content: v }),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ChatInput);
