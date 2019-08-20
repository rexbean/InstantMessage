// // add friend event listner
// import { DeviceEventEmitter, Alert } from 'react-native';
// import { appKey } from '../const';

// const friendEventListener = event => {
//   if (event.fromUserAppKey === appKey) {
//     switch (event.type) {
//       case 'invite_received':
//         DeviceEventEmitter.emit('receiveInvitation', {
//           username: event.fromUsername,
//           reason: event.reason,
//         });
//         break;
//         // Root Invitation_VM
//       case 'invite_accepted':
//         DeviceEventEmitter.emit('accepted', true);
//         // ConversationScreen create conversation
//         // ContactScreen getFriends
//         break;
//       case 'invite_declined':
//         Alert.alert(
//           'Invitation Declined',
//           `Your invitation to ${event.fromUsername} has been decliend for: ${event.reason}`,
//         );
//         break;
//       case 'contact_deleted':
//         Alert.alert('You have been deleted', `You have been deleted by ${event.fromUsername}`);
//         DeviceEventEmitter.emit('deleted', true);
//         break;
//       default:
//         break;
//     }
//   }
// };

// export default friendEventListener;
