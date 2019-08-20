import React, { Component } from 'react';
import {
  Image,
  Text,
  TouchableOpacity,
  TextInput,
  View,
  Alert,
  Button,
  StyleSheet,
} from 'react-native';
import { connect } from 'react-redux';
import { NewContact_VM } from '../stores/models/NewContactScreenVM';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: '5%',
    backgroundColor: '#dadee6',
  },
  inputStyle: {
    width: '75%',
    lineHeight: 20,
    marginLeft: 15,
    marginRight: 10,
    marginTop: 3,
    marginBottom: 3,
    backgroundColor: 'white',
  },
  avatar: {
    width: 45,
    height: 45,
  },
  contact: {
    height: '10%',
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 30,
  },
});

class NewContactScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: undefined,
    };

    this.onSearch = this.onSearch.bind(this);
    this.onPress = this.onPress.bind(this);
  }

  onPress() {
    // navigation to the userInfo screen
    const { navigation } = this.props;
    const { user } = this.state;
    navigation.navigate('UserInfo', {
      user,
      invitation: false,
    });
  }

  onSearch() {
    const { username, appKey } = this.props;
    // Get User Info
  }

  render() {
    const { username, changeUsername } = this.props;
    const { user } = this.state;
    return (
      <View style={styles.container}>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.inputStyle}
            multiline={false}
            numberOfLines={1}
            autoFocus={true}
            autoCapitalize="none"
            autoCorrect={false}
            value={username}
            onChangeText={text => changeUsername(text)}
          />
          <Button title="search" onPress={this.onSearch} />
        </View>
        {user === undefined ? null : (
          <TouchableOpacity onPress={this.onPress}>
            <View style={styles.contact}>
              {/* {user.avatarThumbPath !== '' ? (
                <Image source={{ uri: user.avatarThumbPath }} style={styles.avatar} />
              ) : ( */}
                <Image source={require('../assets/images/myinfo-icon.png')} />
              {/* )} */}
              <Text>{user.username}</Text>
            </View>
          </TouchableOpacity>
        )}
      </View>
    );
  }
}

const mapStateToProps = state => ({
  username: state[NewContact_VM].username,
});

const mapDispatchToProps = dispatch => ({
  changeUsername: v => dispatch[NewContact_VM].changeUsername({ username : v }),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(NewContactScreen);
