// JMessage
// App.js
// componentDidMount
// const params = {
//   appKey,
//   isOpenMessageRoaming: true,
//   isProduction: false,
//   channel: '',
// };
// JMessage.init(params);
// JMessage.addContactNotifyListener(friendEventListener);

// LoginScreen
// onLoginPress()
// JMessage.login({ username, password }, () => {
//   navigation.navigate('Main');
// },
// error => {
//   Alert.alert('login fail', JSON.stringify(error));
// })

// RegisterScreen
// onRegisterPress() {
// JMessage.register({ username, password }, () => {
//   Alert.alert('register succeed');
//   navigation.navigate('Main');
// }, error => {
//   Alert.alert('register failed', JSON.stringify(error));
// })

// ConversationScreen
// componentDidMount()
// JMessage.getConversations(
//   conversations => {
//     addConversations(conversations);
//     this.setState({ conversations });
//   },
//   error => {
//     Alert.alert(error.code, error.description);
//   },
// );


// ContactsScreen
// getFriends() {
//   JMessage.getFriends(
//     contacts => {
//       this.setState({ contacts });
//     },
//     error => {
//       Alert.alert(`get friends error with ${error.code}`, `error${error.description}`);
//     },
//   );
// }

// ChatScreen
// componentDidMount() {
// const params = {
//   type: 'single',
//   username: receiver,
//   appKey,
//   from: 0,
//   limit: 10,
//   isDescend: true,
// };

// JMessage.getHistoryMessages(
//   params,
//   msgArr => {
//     // Alert.alert('histroy', msgArr[0]);
//     // console.log('rexbean history', msgArr);
//     msgArr.forEach(value => {
//       addMessage(value);
//     });
//   },
//   error => {
//     Alert.alert(`Get History with error ${error.code}`, `${error.description}`);
//   },
// );
// // callback for receiving message
// this.receiveMessageCallBack = message => {
//   const readParams = {
//     type: 'single',
//     username: message.from.username,
//     appKey: message.from.appKey,
//     id: message.id,
//   };

//   JMessage.setMsgHaveRead(readParams, result => {}, error => {})

//   if (message.target.type === 'user') {
//     if (message.from.username === receiver) {
//       addMessage(message);
//     } else {
//       // when receive isn't the current one;
//     }
//   }
// };

// JMessage.addReceiveMessageListener(this.receiveMessageCallBack)
// JMessage.addReceiptMessageListener((result)=>{})


// NewContactScreen
// onSearch()
// const params = {
//   username,
//   appKey,
// };

// JMessage.getUserInfo(
//   params,
//   userInfo => {
//     this.setState({ user: userInfo });
//   },
//   error => {
//     Alert.alert('error', error);
//   },
// );

// UserInfoScreen
// onAccept
// const params = {
//   username: user.username,
//   appKey,
// };

// JMessage.acceptInvitation(
//   params,
//   () => {
//     Alert.alert('Result of Accept Invitation', 'invitation has accepted');
//     DeviceEventEmitter.emit('accept', user);
//     navigation.navigate('Contacts');
//   },
//   error => {
//     Alert.alert(
//       `Result of Accept Invitation with ${error.code}`,
//       `invitation accept failed with ${error.description}`
//     );
//   },
// );

// onDecline()
// const params = {
//   username: user.username,
//   appKey,
//   reason: 'no reason, just do not want to accept!',
// };

// JMessage.declineInvitation(
//   params,
//   () => {
//     Alert.alert('Result of Decline Invitation', 'invitation has declined');
//     DeviceEventEmitter.emit('decline', user);
//     navigation.navigate('Contacts');
//   },
//   error => {
//     Alert.alert(
//       `Result of Decline Invitation with ${error.code}`,
//       `invitation accept failed with ${error.description}`,
//     );
//   },
// );

// onAdd()
// const params = {
//   username: user.username,
//   appKey,
//   reason: '',
// };

// JMessage.sendInvitationRequest(
//   params,
//   () => {
//     Alert.alert('Add Contact Result', 'Sent Request Successfully');
//     navigation.navigate('Contacts');
//   },
//   error => {
//     Alert.alert(
//       `Add Contact Result with ${error.code}`,
//       `Sent Request failed for${error.description}`,
//     );
//   },
// );

// onChat()
// JMessage.createConversation(
//   {
//     type: 'single',
//     username: user.username,
//     appKey,
//   },
//   conversation => {
//     DeviceEventEmitter.emit('newConversation', conversation);
//     navigation.navigate('Conversations');
//   },
//   error => {
//     Alert.alert(`Create Coversation with ${error.code}`, `The reason is ${error.description}`);
//   },
// );

// onDelete()
// const params = {
//   username: user.username,
//   appKey,
//   reason: 'No reason, just want to delete you',
// };

// JMessage.removeFromFriendList(
//   params,
//   () => {
//     Alert.alert('Delete Result', `${user.username} has been remove successfully`);
//     this.setState(
//       prevState => ({
//         user: {
//           username: prevState.user.username,
//           isFriend: false,
//         },
//       }),
//       () => {
//         DeviceEventEmitter.emit('removeFriend', user);
//       },
//     );
//   },
//   error => {
//     Alert.alert(`Delete Result with ${error.code}`, `Delete failed, for ${error.description}`);
//   },
// );

// InvitationCell
// componentDidMount()
// const params = {
//   username: user.username,
//   appKey,
// };

// JMessage.getUserInfo(
//   params,
//   userInfo => {
//     this.setState({ userInfo });
//   },
//   error => {
//     Alert.alert(`Get UserInfo Result with ${error.code}`, `Get failed for ${error.description}`);
//   },
// );

// ChatMenuButton
// onDelete()
// const params = {
//   username: receiver,
//   appKey,
//   reason: 'No reason, just want to delete you',
// };

// JMessage.removeFromFriendList(
//   params,
//   () => {
//     Alert.alert('Delete Result', `${username} has been remove successfully`);
//   },
//   error => {
//     Alert.alert('Delete Result', `Delete failed, for ${error}`);
//   },
// );

// SendImageMessage
// JMessage.createSendMessage({
  //     type: 'single',
  //     username: receiver,
  //     messageType: 'image',
  //     path,
  //   },
  //   msg => {
  //     JMessage.sendMessage({
  //         id: msg.id,
  //         type: 'single',
  //         username: receiver,
  //         appKey,
  //       }, () => {
  //         onSuccess(msg);
  //       }, (error) => {
  //         onFailed(error);
  //     })
  //   })

// sendTextMessage
// JMessage.createSendMessage({
  //     type: 'single',
  //     username: receiver,
  //     messageType: 'text',
  //     text: message,
  //   },
  //   async msg => {
  //     await JMessage.sendMessage({
  //         id: msg.id,
  //         type: 'single',
  //         username: receiver,
  //         appKey,
  //       }, () => {
  //         onSuccess(msg);
  //       }, () => {
  //         onFailed(msg);
  //     })
  //   })
