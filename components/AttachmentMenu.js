import React, { Component } from 'react';
import { TouchableOpacity, Image, Text, View, StyleSheet, Alert } from 'react-native';
import { connect } from 'react-redux';
import { Chat_VM } from '../stores/models/ChatScreenVM';

const styles = StyleSheet.create({
  panel: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: '#dadee6',
    padding: 20,
    flex: 1,
  },
  panelElement: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
  },
  icon: {
    height: 50,
    width: 50,
  },
  text: {
    fontSize: 12,
  },
});

class AttachmentMenu extends Component {
  constructor(props) {
    super(props);

    this.sendImage = this.sendImage.bind(this);
    this.sendVideo = this.sendVideo.bind(this);
    this.sendVoice = this.sendVoice.bind(this);
  }

  sendImage() {
    const { setShow, navigation, conversation } = this.props;
    setShow(false);
    navigation.navigate('PhotoPicker', {
      conversation,
    });
  }

  sendVoice() {
    const { navigation } = this.props;
    //navigation.navigate('SendVoice');
  }

  sendVideo() {
    const { navigation } = this.props;
    //navigation.navigate('SendVideo');
  }

  sendVideo() {
    const { navigation } = this.props;
    //navigation.navigate('SendLocation');
  }

  render() {
    return (
      <View style={styles.panel}>
        <TouchableOpacity style={styles.panelElement} onPress={this.sendImage}>
          <Image source={require('../assets/images/Image.png')} style={styles.icon} />
          <Text style={styles.text}>Image</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.panelElement} onPress={this.sendVoice}>
          <Image source={require('../assets/images/Voice.png')} style={styles.icon} />
          <Text style={styles.text}>Voice</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.panelElement} onPress={this.sendVideo}>
          <Image source={require('../assets/images/Camera.png')} style={styles.icon} />
          <Text style={styles.text}>Camera</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.panelElement} onPress={this.sendLocation}>
          <Image source={require('../assets/images/File.png')} style={styles.icon} />
          <Text style={styles.text}>File</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.panelElement} onPress={this.sendLocation}>
          <Image source={require('../assets/images/Location.png')} style={styles.icon} />
          <Text style={styles.text}>Location</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const mapStateToProps = dispatch => ({
  setShow: v => dispatch[Chat_VM].setShow({ show: v }),
});

export default connect(
  null,
  mapStateToProps,
)(AttachmentMenu);
