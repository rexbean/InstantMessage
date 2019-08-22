import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import OptionButton from './OptionButton';
import { Navigator_VM } from '../stores/models/NavigatorVM';
import { connect } from 'react-redux';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

class AddButton extends Component {
  constructor(props) {
    super(props);

    this.onNewChat = this.onNewChat.bind(this);
    this.onNewContact = this.onNewContact.bind(this);
  }

  onNewContact() {
    const { navigation, changeActive } = this.props;
    changeActive(false);
    navigation.navigate('AddNewContact');
  }

  onNewChat() {
    const { navigation, changeActive } = this.props;
    changeActive(false);
    navigation.navigate('AddNewChat');
  }

  render() {
    const { navigation } = this.props;
    const content = [
      {
        onPress: this.onNewContact,
        text: 'Add Contacts',
      },
      {
        onPress: this.onNewChat,
        text: 'New Chat',
      },
    ];

    return (
      <View style={styles.container}>
        <OptionButton title="+" content={content} navigation={navigation} />
      </View>
    );
  }
}
const mapDispatchToProps = dispatch => ({
  changeActive: v => dispatch[Navigator_VM].changeActive({ isActive: v }),
});

export default connect(
  null,
  mapDispatchToProps,
)(AddButton);
