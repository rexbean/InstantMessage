import JMessage from 'jmessage-react-plugin';

export default function sendImageMessage(appKey, receiver, path, onSuccess, onFailed){
  console.log('rexbean msg', path);
  JMessage.createSendMessage({
      type: 'single',
      username: receiver,
      messageType: 'image',
      path,
    },
    msg => {
      JMessage.sendMessage({
          id: msg.id,
          type: 'single',
          username: receiver,
          appKey,
        }, () => {
          onSuccess(msg);
        }, (error) => {
          onFailed(error);
      })
    })
}
