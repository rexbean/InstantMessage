import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

const styles = StyleSheet.create({
  name: {
    fontSize: 20,
  },
  icon: {
    width: 45,
    height: 45,
  },
  container: {
    flex: 1,
    flexDirection: 'row',
    height: 50,
    marginTop: 10,
    marginLeft: 20,
    marginRight: 20,
  },
  info: {
    marginLeft: 15
  }

})

const ContactCell = props => (
  <View style = {styles.container}>
    <View>
      <Image
        source={require('../assets/images/myinfo-icon.png')}
        style={[styles.icon]}/>
    </View>
    <View style = {styles.info}>
      <Text style = {styles.name}>name: {props.name}</Text>
    </View>
  </View>
);

export default ContactCell;
