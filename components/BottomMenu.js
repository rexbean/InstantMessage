import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import { Chat_VM } from '../stores/models/ChatScreenVM';
import AttachmentMenu from './AttachmentMenu';

class BottomMenu extends Component {
  render() {
    const { content, show, navigation } = this.props;
    if (show === false) {
      return <View />;
    }

    if (content === 'attachment') {
      return <AttachmentMenu navigation={navigation} />;
    }
    if (content === 'emoji') {
      return <EmojiMenu />;
    }
    return null;
  }
}

const mapStateToProps = state => ({
  show: state[Chat_VM].show,
  content: state[Chat_VM].content,
});

export default connect(
  mapStateToProps,
  null,
)(BottomMenu);
