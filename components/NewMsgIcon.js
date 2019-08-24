import React, { Component } from 'react';
import { Alert, Platform, ImageBackground, Text, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  icon: {
    width: 20,
    height: 20,
  },
});

class NewMsgIcon extends Component {
  constructor(props) {
    super(props);

    this.getFontSize = this.getFontSize.bind(this);
  }

  getFontSize() {
    const { count } = this.props;
    let fontSize = 15
    if (count.length === 2) {
      fontSize = 13;
    }
    const style = {
      textAlign: 'center',
      textAlignVertical: 'center',
      fontSize,
      color: 'white',
      height: 22,
      ...Platform.select({
        ios: { lineHeight: 20 },
        android: {},
      }),
    };
    return style;
  }

  render() {
    const { count } = this.props;
    return (
      <ImageBackground source={require('../assets/images/newMsgIcon-3.png')} style={styles.icon}>
        <Text style={this.getFontSize()}>{count}</Text>
      </ImageBackground>
    );
  }
}

export default NewMsgIcon;
