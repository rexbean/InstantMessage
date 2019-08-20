import React, { Component } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import OptionButton from './OptionButton';
import { Chat_VM } from '../stores/models/ChatScreenVM';
import { Navigator_VM } from '../stores/models/NavigatorVM';
import { connect } from 'react-redux';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

class ChatMenuButton extends Component {
  constructor(props) {
    super(props);

    this.onDelete = this.onDelete.bind(this);
  }

  onDelete() {
    const { changeActive, receiver, appKey } = this.props;
    // Remove Friend
    changeActive(false);
  }

  render() {
    const { navigation } = this.props;
    const content = [
      {
        onPress: this.onDelete,
        image: '../assets/images/friend-icon.png',
        text: 'Delete Friend',
      },
    ];

    return (
      <View style={styles.container}>
        <OptionButton title="..." content={content} navigation={navigation} />
      </View>
    );
  }
}

const mapStateToProps = state => ({
  receiver: state[Chat_VM].receiver,
  appKey: state[Chat_VM].appKey,
});

const mapDispatchToProps = dispatch => ({
  changeActive: v => dispatch[Navigator_VM].changeActive({ isActive : v}),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ChatMenuButton);
