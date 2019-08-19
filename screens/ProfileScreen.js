import {
  TouchableWithoutFeedback,
  Keyboard,
  Text,
  View,
  Image,
  StyleSheet,
  DeviceEventEmitter,
} from 'react-native';
import React, { Component } from 'react';
import { Contact_VM } from '../stores/models/ContactScreenVM';
import { connect } from 'react-redux';

const styles = StyleSheet.create({
  icon: {
    width: 26,
    height: 26,
  },
  container: {
    flex: 1,
  },
});

const icon = require('../assets/images/myinfo-icon.png');

class ProfileScreen extends Component {
  static navigationOptions = () => {
    return {
      title: 'Profile',
      tabBarIcon: ({ tintColor }) => {
        return <Image source={icon} style={[styles.icon, { tintColor }]}/>
      },
    };
  };

  constructor(props) {
    super(props);

    this.onAccept = this.onAccept.bind(this);
    this.onDecline = this.onDecline.bind(this);
    this.onReceiveInvitation = this.onReceiveInvitation.bind(this);
  }

  componentDidMount() {
    this.subscription = DeviceEventEmitter.addListener('accept', this.onAccept);
    this.subscription = DeviceEventEmitter.addListener('decline', this.onDecline);
    this.subscription = DeviceEventEmitter.addListener(
      'receiveInvitation',
      this.onReceiveInvitation,
    );
  }

  onAccept(user) {
    this.changeInvitation(user);
  }

  onDecline(user) {
    this.changeInvitation(user);
  }

  onReceiveInvitation(user) {
    const { receiveInvitation } = this.props;
    receiveInvitation(user);
  }

  changeInvitation(user) {
    const { changeInvitation } = this.props;
    changeInvitation(user);
  }

  render() {
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <Text>This is Profile Page</Text>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  receiveInvitation: v => dispatch[Contact_VM].receiveInvitation({ invitation: v }),
  changeInvitation: v => dispatch[Contact_VM].changeInvitation({ invitation: v }),
});

export default connect(
  null,
  mapDispatchToProps,
)(ProfileScreen);
