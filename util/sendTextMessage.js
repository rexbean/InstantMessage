import JMessage from 'jmessage-react-plugin';

export default async function sendTextMessage(appKey, receiver, message, onSuccess, onFailed){
  JMessage.createSendMessage({
      type: 'single',
      username: receiver,
      messageType: 'text',
      text: message,
    },
    async msg => {
      await JMessage.sendMessage({
          id: msg.id,
          type: 'single',
          username: receiver,
          appKey,
        }, () => {
          onSuccess(msg);
        }, () => {
          onFailed(msg);
      })
    })
}
