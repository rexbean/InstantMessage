import React, { Component } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import OptionButton from './OptionButton';
import JMessage from 'jmessage-react-plugin';
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
    const params = {
      username: receiver,
      appKey,
      reason: 'No reason, just want to delete you',
    };

    JMessage.removeFromFriendList(
      params,
      () => {
        Alert.alert('Delete Result', `${username} has been remove successfully`);
      },
      error => {
        Alert.alert('Delete Result', `Delete failed, for ${error}`);
      },
    );
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
