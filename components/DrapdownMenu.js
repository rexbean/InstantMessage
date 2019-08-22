import React, { Component } from 'react';
import { Image, TouchableOpacity, Animated, View, StyleSheet, Text } from 'react-native';
import { connect } from 'react-redux';
import { Navigator_VM } from '../stores/models/NavigatorVM';

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    right: 0,
    top: 200,
    left: 0,
    bottom: 0,
  },
  icon: {
    width: 20,
    height: 20,
  },
  menuElement: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 10,
  },
  text: {
    marginLeft: 10,
  },
});

class DrapdownMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rotationAnim: new Animated.Value(0),
    };
  }

  shouldComponentUpdate(nextProps) {
    const { isActive } = nextProps;
    if (!isActive) {
      if (this.isShowCouver) {
        this.closePanel();
      }
    } else if (!this.isShowCouver) {
      this.openPanel();
    }
    return true;
  }

  openPanel = () => {
    const { rotationAnim } = this.state;
    this.isShowCouver = true;
    rotationAnim.setValue(0);
    Animated.parallel([
      Animated.spring(rotationAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();
  };

  closePanel = () => {
    const { rotationAnim } = this.state;
    this.isShowCouver = false;
    rotationAnim.setValue(1);
    Animated.spring(rotationAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  render() {
    const maxHeight = 80;
    const width = 150;
    const { rotationAnim } = this.state;
    const { content } = this.props;

    const menu = [];

    Object.keys(content).forEach(key => {
      let imageSource = '';
      if (content[key].text === 'Add Contacts') {
        imageSource = require('../assets/images/friend-icon.png');
      } else if (content[key].text === 'New Chat') {
        imageSource = require('../assets/images/group-icon.png');
      }
      menu.push(
        <TouchableOpacity onPress={content[key].onPress} style={styles.menuElement}>
          <Image source={imageSource} style={styles.icon} />
          <Text style={styles.text}>{content[key].text}</Text>
        </TouchableOpacity>,
      );
    });

    return (
      <View
        style={{
          position: 'absolute',
          left: -130,
          right: 0,
          top: 180,
          bottom: 0,
        }}
      >
        <Animated.View
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            top: -(maxHeight + 50),
            width,
            transform: [
              {
                scaleX: rotationAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, 1],
                }),
              },
              {
                scaleY: rotationAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, 1],
                }),
              },
            ],
          }}
        >
          <View
            style={{
              height: maxHeight,
              backgroundColor: 'rgba(158, 158, 158, 0.8)',
              borderRadius: 5,
            }}
          >
            {menu}
          </View>
        </Animated.View>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  isActive: state[Navigator_VM].isActive,
});

const mapDispatchToProps = dispatch => ({
  changeActive: v => dispatch[Navigator_VM].changeActive({ isActive : v }),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(DrapdownMenu);
