import React, { Component } from 'react';
import { Image, View, StyleSheet, DeviceEventEmitter } from 'react-native';
import NewMsgIcon from './NewMsgIcon';
import { Conversation_VM } from '../stores/models/ConversationScreenVM';
import { connect } from 'react-redux';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  avatar: {
    position: 'absolute',
    left: 0,
    top: 0,
  },
});

function getStyle(width) {
  return {
    position: 'absolute',
    left: 15,
    top: 0,
  };
}

class Avatar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      numOfUnReads: props.numOfUnReads,
    };

    this.countChange = this.countChange.bind(this);
  }

  componentDidMount() {
    this.subscription = DeviceEventEmitter.addListener('increaseCount', this.countChange);
    this.subscription = DeviceEventEmitter.addListener('decreaseCount', this.countChange);
  }

  componentWillUnmount(){
    console.log('remove listener');
    DeviceEventEmitter.removeListener('increaseCount');
    DeviceEventEmitter.removeListener('decreaseCount');
  }

  countChange(count) {
    console.log('new', count);
    this.setState(prevState => ({ numOfUnReads: prevState.numOfUnReads + count }));
  }

  render() {
    const { type, style, count } = this.props;
    const { numOfUnReads } = this.state;

    const image = [];
    if (type === 'conversation') {
      image.push(
        <Image
          source={require('../assets/images/chat-icon.png')}
          style={[...style, styles.avatar]}
        />,
      );
    } else if (type === 'contacts') {
      image.push(
        <Image
          source={require('../assets/images/friend-icon.png')}
          style={[...style, styles.avatar]}
        />,
      );
    } else if (type === 'profile') {
      image.push(
        <Image
          source={require('../assets/images/myinfo-icon.png')}
          style={[...style, styles.avatar]}
        />,
      );
    } else if(type === 'group'){
      image.push(
        <Image
          source={require('../assets/images/group-icon.png')}
          style={[style, styles.avatar]}
        />,
      );
    } else if(type === 'single'){
      image.push(
        <Image
          source={require('../assets/images/myinfo-icon.png')}
          style={[style, styles.avatar]}
        />,
      );
    }

    let c = 0;
    if (type === 'conversation') {
      c = numOfUnReads;
    } else {
      c = count === undefined ? 0 : count;
    }

    const newMsg = [];
    if (c !== 0) {
      newMsg.push(
        <View style={getStyle(style.width)}>
          <NewMsgIcon count={c} />
        </View>,
      );
    }
    return (
      <View style={styles.container}>
        {image}
        {newMsg}
      </View>
    );
  }
}

const mapStateToProps = state => ({
  numOfUnReads: state[Conversation_VM].numOfUnReads,
});

export default connect(
  mapStateToProps,
  null,
)(Avatar);
