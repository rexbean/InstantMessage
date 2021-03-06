import React, { Component } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';


const styles = StyleSheet.create({
  from: {
    fontSize:10,
  },
  container:{
    flex: 1,
    paddingLeft: 5,
    paddingRight: 5,
  },
  messageOut:{
    flexDirection: 'row-reverse',
    justifyContent: 'flex-start',
  },
  messageIn: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  info: {
    flexDirection: 'column',
  }
})


class MessageCell extends Component {
  constructor(props) {
    super(props);
    this.getMessageStyle = this.getMessageStyle.bind(this);
  }

  getMessageStyle(messageIn) {
    let backgroundColor = '#b3e6ff';
    let marginRight = 15;
    let marginLeft = 0;
    if (messageIn === true) {
      backgroundColor = '#ffe5ff';
      marginLeft = 15;
      marginRight = 0;
    }
    return {
      paddingLeft: 20,
      paddingRight: 20,
      paddingTop: 15,
      paddingBottom: 15,
      borderRadius: 10,
      marginTop: 5,
      marginBottom: 5,
      marginLeft,
      marginRight,
      backgroundColor,
    };
  }

  render() {
    const { message, selfName } = this.props;
    const messageIn = message.from.username !== selfName
    const msg = [];
    if (message.type === 'image') {
      msg.push(
        <Image
          style={{
            ...(messageIn ? this.getMessageStyle(true) : this.getMessageStyle(false)),
            width: 90,
            height: 90,
          }}
          source={{uri: message.thumbPath}} />
      );
    } else if (message.type === 'text') {
      msg.push(
        <Text style={messageIn ? this.getMessageStyle(true) : this.getMessageStyle(false)}>
          {message.text}
        </Text>,
      );
    }
    return (
      <View style={styles.container}>
        <View style={messageIn ? styles.messageIn : styles.messageOut}>
          {/* Information */}
          <View style={styles.info}>
            <Text style={styles.from}>{message.from.username}</Text>
            <Image source={require('../assets/images/myinfo-icon.png')} />
          </View>
          {/* message */}
          <View>{msg}</View>
        </View>
      </View>
    );
  }
}
export default MessageCell;
