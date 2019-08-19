import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Alert, View, TouchableWithoutFeedback, Keyboard, Text, FlatList } from 'react-native';
import InvitationCell from '../components/InvitationCell';
import { Contact_VM } from '../stores/models/ContactScreenVM';

class NewFriendListScreen extends Component {
  static navigationOptions = () => {
    return {
      header: null,
    };
  };

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
    const { invitations, navigation } = this.props;
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <FlatList
          style={{ flex: 1 }}
          data={Object.values(invitations)}
          renderItem={({ item }) => <InvitationCell user={item} navigation={navigation} />}
          ItemSeparatorComponent={this.renderSeparator()}
        />
      </TouchableWithoutFeedback>
    );
  }
}

const mapStateToProps = state => {
  return { invitations: state[Contact_VM].invitations };
};

const mapDispatchToProps = dispatch => ({
  acceptInviation: v => dispatch[Contact_VM].acceptInviation({ invitation: v }),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(NewFriendListScreen);
