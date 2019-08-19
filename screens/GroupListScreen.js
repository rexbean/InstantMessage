import React from 'react';
import { TouchableWithoutFeedback, Keyboard, FlatList } from 'react-native';
import ContactCell from '../components/ContactCell';

const GroupListScreen = props => {
  const { navigation } = props;
  const groups = [
    {
      key: 0,
      user: {
        username: 'scu',
      },
    },
    {
      key: 1,
      user: {
        username: 'usf',
      },
    },
  ];

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <FlatList
        style={{ flex: 1 }}
        data={groups}
        renderItem={({ item }) => (
          <ContactCell option="group" user={item.username} navigation={navigation} />
        )}
        keyExtractor={item => item.key}
        ItemSeparatorComponent={this.renderSeparator}
      />
    </TouchableWithoutFeedback>
  );
};

export default GroupListScreen;
