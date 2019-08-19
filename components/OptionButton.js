import React, { Component } from 'react';
import {
  TouchableOpacity,
  Image,
  Text,
  Alert,
  View,
  Button,
  StyleSheet
} from 'react-native';
import { connect } from 'react-redux';
import DropdownMenu from './DrapdownMenu';
import { Navigator_VM } from '../stores/models/NavigatorVM';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

class OptionButton extends Component {
  constructor(props) {
    super(props);

    this.onPress = this.onPress.bind(this);
  }

  onPress() {
    const { isActive, changeActive } = this.props;
    changeActive(!isActive);
  }

  render() {
    const { navigation, title, content } = this.props;

    return (
      <View style={styles.container}>
        <Button title={title} onPress={this.onPress} />
        <DropdownMenu content={content} navigation={navigation} />
      </View>
    );
  }
}
const mapStateToProps = state => ({
  isActive: state[Navigator_VM].isActive,
});

const mapDispatchToProps = dispatch => ({
  changeActive: v => dispatch[Navigator_VM].changeActive({ isActive: v }),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(OptionButton);
