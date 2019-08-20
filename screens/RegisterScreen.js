import {
  TouchableWithoutFeedback,
  Keyboard,
  View,
  Text,
  Alert,
  StyleSheet,
  Button,
  Image } from 'react-native';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Input } from 'react-native-elements';
import { Register_VM } from '../stores/models/RegisterScreenVM';


const styles = StyleSheet.create({
  container: {
    // flex: 1,
    marginTop: 200,
  },
  button: {
    width: 200,
    height: 200
  },
  signInLabelInput:{
    marginLeft: -10,
    height: 16,
    width: 161.1,
    color: '#24253D',
    fontFamily: "System",
    fontSize: 14,
    lineHeight: 16,
    opacity: 0.54
  },
  signinInputContainer: {
    marginTop: 15,
    height: 80,
    width: 336,
  },
  inputContainer:{
    marginTop: 10,
    height: 54,
    width: 336,
    marginLeft: -10,
    borderRadius: 7,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.1)',
  },
  signinText:{
    marginLeft: 20,
    color: '#24253D',
    fontSize: 16,
    height: 19,
    width: 120,
    lineHeight: 19,
  },
  loginLinearGradient: {
    height: 48,
    width: 335,
    borderRadius: 7,
  },
  signinButtonText: {
    fontSize: 15,
    fontFamily: 'System',
    textAlign: 'center',
    color: '#FFFFFF',
    margin: 15,
  },
  signInView:{
    marginTop: 16,
    marginLeft: 30,
  },
  signupText: {
    textAlign: 'center',
    height: 16,
    width: 60,
    fontFamily: "System",
    fontSize: 14,
    lineHeight: 16,
    marginTop: 4,
    color: "#3573EA",
  },
});

class RegisterScreen extends Component {
  constructor(props) {
    super(props);
    this.onRegisterPress = this.onRegisterPress.bind(this);
    this.passwordInputStyle = this.passwordInputStyle.bind(this);
  }

  onRegisterPress() {
    const { navigation, username, password } = this.props;

    // Create User here IMClient
    // using redux function

  }

  passwordInputStyle(color) {
    return {
      marginTop: 10,
      height: 54,
      width: 336,
      marginLeft: -10,
      borderWidth: 1,
      borderColor: color,
      borderRadius: 12,
    };
  }

  render() {
    const { username, password, changePassword, changeUsername } = this.props;
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.signInView}>
          <Input
            containerStyle={styles.signinInputContainer}
            inputContainerStyle={this.passwordInputStyle('rgba(0,0,0,0.1)')}
            label={<Text style={styles.signInLabelInput}>Username</Text>}
            inputStyle={styles.signinText}
            autoFocus={false}
            autoCapitalize="none"
            autoCorrect={false}
            onChangeText={text => changeUsername(text)}
          />

          <Input
            containerStyle={styles.signinInputContainer}
            inputContainerStyle={this.passwordInputStyle('rgba(0,0,0,0.1)')}
            label={<Text style={styles.signInLabelInput}>Password</Text>}
            errorStyle={null}
            errorMessage={null}
            inputStyle={styles.signinText}
            onChangeText={text => changePassword(text)}
            autoCapitalize="none"
            autoCorrect={false}
          />

          <View>
            <Button onPress={() => this.onRegisterPress()} />
            {/* <LinearGradientButton
              onPress={() => this.onRegisterPress()}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              locations={[0.0, 0.5]}
              colors={['#F2C416', '#F29829']}
              useAngle={true}
              angle={90}
              angleCenter={{ x: 0.5, y: 0.5 }}
              style={styles.loginLinearGradient}>
              <Text style={styles.signinButtonText}>Sign Up</Text>
            </LinearGradientButton> */}
          </View>
        </View>
      </TouchableWithoutFeedback>
    )
  }
}

const mapStateToProps = state => ({
  username: state[Register_VM].username,
  password: state[Register_VM].password,
});

const mapDispatchToProps = dispatch => ({
  changeUsername: v => dispatch[Register_VM].changeUsername({ username: v }),
  changePassword: v => dispatch[Register_VM].changePassword({ password: v }),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(RegisterScreen);
