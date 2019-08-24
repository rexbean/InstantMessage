import React, { Component } from 'react';
import { Button, DeviceEventEmitter, View, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import NewMsgIcon from './NewMsgIcon';
import { Conversation_VM } from '../stores/models/ConversationScreenVM';


const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  },
});

class BackButton extends Component {
  constructor(props) {
    super(props);

    this.state = {
      numOfUnReads: 0,
    };

    this.onPress = this.onPress.bind(this);
    this.addCount = this.addCount.bind(this);
  }

  componentDidMount() {
    this.subscription = DeviceEventEmitter.addListener('increaseCount', this.addCount);
  }

  onPress() {
    const { navigation } = this.props;
    navigation.goBack();
  }

  addCount(count) {
    this.setState(prevState => ({ numOfUnReads: prevState.numOfUnReads + count }));
  }

  render() {
    const { numOfUnReads } = this.state;
    const newMsg = [];
    if (numOfUnReads !== 0) {
      newMsg.push(<NewMsgIcon count={numOfUnReads} />);
    }
    return (
      <View style={styles.container}>
        <Button title="< Back" onPress={this.onPress} />
        {newMsg}
      </View>
    );
  }
}

const mapStateToProps = state => ({
  numOfUnReads: state[Conversation_VM].numOfUnReads,
});

export default connect(
  mapStateToProps,
  null,
)(BackButton);
