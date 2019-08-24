import React  from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { CheckBox } from 'react-native-elements';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
});

const PickFriend = props => {
  const { friend, onPick, checked } = props;
  console.log(checked +" " + friend.username);
  return (
    <View style={styles.container}>
      <CheckBox checked={checked} onIconPress={() => onPick(friend.username)} />
      <Text>{friend.username}</Text>
    </View>
  );
};

export default PickFriend;
