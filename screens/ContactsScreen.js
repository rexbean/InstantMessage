import {
  TouchableWithoutFeedback,
  Keyboard,
  SectionList,
  FlatList,
  Text,
  View,
  Image,
  Alert,
  Button,
  StyleSheet,
  DeviceEventEmitter,
} from 'react-native';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Contact_VM } from '../stores/models/ContactScreenVM';
import ContactCell from '../components/ContactCell';
import { Chat_VM } from '../stores/models/ChatScreenVM';
import LeanCloud from '../IMClient/LeanCloud';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  icon: {
    width: 26,
    height: 26,
  },
});

class ContactsScreen extends Component {
  static navigationOptions = () => {
    return {
      header: null,
      tabBarIcon: ({ tintColor }) => (
        <Image
          source={require('../assets/images/friend-icon.png')}
          style={[styles.icon, { tintColor }]}
        />
      ),
    };
  };

  constructor(props) {
    super(props);

    this.state = {
      contacts: [],
      numberOfInvitations: props.numberOfInvitations,
    };

    this.onAccept = this.onAccept.bind(this);
    this.onDecline = this.onDecline.bind(this);
    this.onDeclined = this.onDeclined.bind(this);
    this.onRemoveFriend = this.onRemoveFriend.bind(this);
    this.getFriends = this.getFriends.bind(this);
    this.onReceiveInvitation = this.onReceiveInvitation.bind(this);
    this.changeInvitation = this.changeInvitation.bind(this);
  }

  componentDidMount() {
    // get friends
    this.getFriends();

    // add event listener
    this.subscription = DeviceEventEmitter.addListener('accept', this.onAccept);
    this.subscription = DeviceEventEmitter.addListener('accepted', this.getFriends);
    this.subscription = DeviceEventEmitter.addListener('decline', this.onDecline);
    this.subscription = DeviceEventEmitter.addListener('onDeclined', this.onDeclined);
    this.subscription = DeviceEventEmitter.addListener('removeFriend', this.onRemoveFriend);
    this.subscription = DeviceEventEmitter.addListener('deleted', this.getFriends);
    this.subscription = DeviceEventEmitter.addListener(
      'receiveInvitation',
      this.onReceiveInvitation,
    );
  }

  onAccept(user) {
    this.changeInvitation(user);
    this.getFriends();
  }

  onDecline(user) {
    this.changeInvitation(user);
    this.getFriends();
  }

  onDeclined(user) {
    // Local Notificication;
  }

  onReceiveInvitation({ payload, conversation }) {
    const { receiveInvitation } = this.props;
    receiveInvitation(payload.invitedBy);
    Alert.alert(`receive new invitation from ${payload.invitedBy}`);
    this.setState(prevState => ({
      numberOfInvitations: prevState.numberOfInvitations + 1,
    }));
  }

  onRemoveFriend(user) {
    const newContacts = [];
    const { contacts } = this.state;
    contacts.forEach(value => {
      if (value !== user) {
        newContacts.push(value);
      }
    });
    this.setState({ contacts: newContacts });
  }

  async getFriends() {
    // Get Friends Here
    const contacts = await LeanCloud.getFriends();
    this.setState({ contacts });
  }

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

  _sectionComp = info => {
    const txt = info.section.key;
    return (
      <Text
        style={{
          height: 18,
          textAlign: 'center',
          lineHeight: 18,
          backgroundColor: '#dadee6',
          color: 'black',
          fontSize: 13,
        }}
      >
        {txt}
      </Text>
    );
  };

  changeInvitation(user) {
    const { changeInvitation } = this.props;
    changeInvitation(user);
    this.setState(prevState => ({
      numberOfInvitations: prevState.numberOfInvitations - 1,
    }));
  }

  render() {
    const { navigation } = this.props;
    const { contacts, numberOfInvitations } = this.state;
    const dataset = [];
    dataset.push({
      option: 'newFriend',
      user: 'New Friends',
    });
    dataset.push({
      option: 'groupChats',
      user: 'Group Chats',
    });

    contacts.forEach(value => {
      dataset.push({
        option: 'contact',
        user: value,
      });
    });
    // for (let i = 0; i < 5; i += 1) {
    //   const data = [];
    //   for (let j = 0; j < 5; j += 1) {
    //     data.push({ option: 'contact', name: `${i}${j}` });
    //   }
    //   dataset.push({ key: `${i}`, data });
    // }
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <FlatList
          data={dataset}
          renderItem={({ item }) => (
            <ContactCell
              numberOfInvitations={numberOfInvitations}
              navigation={navigation}
              option={item.option}
              user={item.user}
            />
          )}
          ItemSeparatorComponent={this.renderSeparator}
        />
        {/* <SectionList
          style={{ flex: 1}}
          renderItem={item => (
            <ContactCell
              numberOfInvitations={numberOfInvitations}
              navigation={navigation}
              option={item.item.option}
              user={item.item.user}
            />
          )}
          renderSectionHeader={this._sectionComp}
          sections={dataset}
          ItemSeparatorComponent={() => <View style={{height: 1, width: '86%', backgroundColor: '#CED0CE', marginLeft: 20, marginTop: 5, marginBottom: 5}}/>}  //分割线
          stickySectionHeadersEnabled={false}  //设置区头是否悬浮在屏幕顶部,默认是true
          ListEmptyComponent={() => <Text>No Data</Text>} // 数据为空时调用
          initialNumToRender={2} //指定一开始渲染的元素数量，最好刚刚够填满一个屏幕，这样保证了用最短的时间给用户呈现可见的内容
          onEndReachedThreshold={0.001}  //0.5表示距离内容最底部的距离为当前列表可
        /> */}
      </TouchableWithoutFeedback>
    );
  }
}

const mapStateToProps = state => ({
  appKey: state[Chat_VM].appKey,
  numberOfInvitations: state[Contact_VM].numberOfInvitations,
  invitations: state[Contact_VM].invitations,
});

const mapDispatchToProps = dispatch => ({
  receiveInvitation: v => dispatch[Contact_VM].receiveInvitation({ invitation: v }),
  changeInvitation: v => dispatch[Contact_VM].changeInvitation({ invitation: v }),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ContactsScreen);
