import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import { Chat_VM } from '../stores/models/ChatScreenVM';
import AttachmentMenu from './AttachmentMenu';

const BottomMenu = props => {
  const { content, show, navigation, conversation } = props;
  if (show === false) {
    return <View />;
  }

  if (content === 'attachment') {
    return <AttachmentMenu navigation={navigation} conversation={conversation}/>;
  }
  if (content === 'emoji') {
    return null;
    // return <EmojiMenu />;
  }
  return null;
};

const mapStateToProps = state => ({
  show: state[Chat_VM].show,
  content: state[Chat_VM].content,
});

export default connect(
  mapStateToProps,
  null,
)(BottomMenu);
