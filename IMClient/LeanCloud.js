import { DeviceEventEmitter, Alert } from 'react-native';
import { Realtime, Event } from 'leancloud-realtime';
// import { TypedMessagesPlugin } from 'leancloud-realtime-plugin-typed-messages';
import { appId, appKey } from '../const';
import { TextMessage } from 'leancloud-realtime';
import AV from 'leancloud-storage';
import PushNotificationIOS from '@react-native-community/push-notification-ios';

// here is for the installation push notification
const Installation = require('leancloud-installation')(AV);

class LeanCloud {
  constructor() {
    this.realtime = null;
    this.imClient = null;
    this.username = null;
  }

  init() {
    // Initialize the LeanCloud realtime
    this.realtime = new Realtime({
      appId,
      appKey,
      // plugins: [TypedMessagesPlugin],
    });

    // Initialize leancloud-storage
    AV.init({
      appId,
      appKey,
    });

    this.initIOSPush();

    this.realtime.on('disconnect', () => {
      DeviceEventEmitter.emit('disconnect', true);
    });

    this.realtime.on('offline', () => {
      DeviceEventEmitter.emit('offline', true);
    });
    this.realtime.on('online', () => {
      DeviceEventEmitter.emit('online', true);
    });
    this.realtime.on('schedule', (attempt, delay) => {
      console.log(`Try to do the ${attempt + 1} time reconnection in ${delay} + 'ms`);
    });
    this.realtime.on('retry', attempt => {
      console.log(`It is trying to do the ${attempt + 1} times reconnection`);
    });
    this.realtime.on('reconnect', () => {
      DeviceEventEmitter.emit('reconnect', true);
    });
  }

  initIOSPush() {
    PushNotificationIOS.addEventListener('register', this.onIOSRegister);
    PushNotificationIOS.requestPermissions();
  }

  onIOSRegister = deviceToken => {
    if (deviceToken) {
      this.saveIOSInstallation(deviceToken);
    }
  };

  saveIOSInstallation = deviceToken => {
    const info = {
      appTopic: 'com.rexbean',
      deviceType: 'ios',
      deviceToken,
    };

    Installation.getCurrent()
      .then(installation => installation.save(info))
      .then(result => console.log('save ios installation', result))
      .catch(error => console.error(error));
  };

  async login(username) {
    this.imClient = await this.realtime.createIMClient(username);
    console.log('imClient', this.imClient);
    this.username = username;
    this.imClient.on(Event.MESSAGE, (message, conversation) => {
      // LocalNotification here with message and can be clicked to the specific conversation
      DeviceEventEmitter.emit('increaseCount', 1);
      DeviceEventEmitter.emit('message', { message, conversation });
      let name = conversation.name;
      if (conversation.members.length === 2) {
        if (conversation.members[0] === this.username) {
          name = conversation.members[1];
        } else {
          name = conversation.members[0];
        }
      }
    });

    this.imClient.on(Event.INVITED, (payload, conversation) => {
      // LocalNOtification here with invitation and can be clicked to the invitation list
      // createConversation will emit the add event or chat
      Alert.alert('been invited');
      DeviceEventEmitter.emit('receiveInvitation', { payload, conversation });
    });

    this.imClient.on(Event.MEMBERS_JOINED, (payload, conversation) => {
      if (conversation.members.length === 2) {
        // LocalNotification here with invitation accepted and can be clicked to the chat screen
        // Do nother will emit the accept event
        DeviceEventEmitter.emit('accepted', { payload, conversation });
      }
    });

    this.imClient.on(Event.MEMBERS_LEFT, (payload, conversation) => {
      if (conversation.members.length === 2) {
        // quit() will emit the decline event
        DeviceEventEmitter.emit('declined', { payload, conversation });
      }
    });

    this.imClient.on(Event.KICKED, (payload, conversation) => {
      if (conversation.members.length === 2) {
        // remove a member from 2 means delete removeFriend
        // be deleted
        DeviceEventEmitter.emit('delete', { payload, conversation });
      }
    });
  }

  async getFriends() {
    // find the conversation which has two members and contains himself
    try {
      const result = await this.imClient
        .getQuery()
        .containsMembers([this.username])
        .find();
      const friends = [];
      result.forEach(value => {
        value.members.forEach(member => {
          if (member !== this.username) {
            friends.push(member);
          }
        });
      });
      return friends;
    } catch (e) {
      Alert.alert('Get friends error', e);
    }
    return null;
  }

  async clearConversations() {
    const conversations = await this.imClient
      .getQuery()
      .containsMembers([this.username])
      .find();
    conversations.forEach(async conversation => {
      if (conversation.members.length === 1) {
        await conversation.quit();
      }
    });
  }

  async getConversations() {
    try {
      await this.clearConversations();
      const conversations = await this.imClient
        .getQuery()
        .descending('lastMessageAt')
        .withLastMessagesRefreshed(true)
        .containsMembers([this.username])
        .find();
      return conversations;
    } catch (e) {
      Alert.alert(e);
    }
    return null;
  }

  async findContact(user) {
    try {
      const conversation = await this.imClient
        .getQuery()
        .withMembers([this.username, user])
        .find();
      return conversation;
    } catch (e) {
      Alert.alert('Find friend error', e);
    }
    return null;
  }

  async decline(conversation) {
    try {
      const result = await conversation.remove(this.username);
    } catch (e) {
      Alert.alert('Decline conversation failed', e);
    }
  }

  async createConversation(users) {
    try {
      const conversation = await this.imClient.createConversation({
        members: [...users, this.username],
        name: users.join(','),
        unique: true,
      });
      return conversation;
    } catch (e) {
      Alert.alert('Send Request Error', e);
      return null;
    }
  }

  async read(conversation) {
    try {
      const result = await conversation.read();
      return result;
    } catch (e) {
      throw e;
    }
  }

  async delete(user) {
    const conversations = await this.imClient
      .getQuery()
      .withMembers([user], true)
      .find();

    try {
      const result = await conversations[0].remove(user);
      if (result.failures.length === 0) {
        if (conversations[0].members.length === 0) {
          conversations[0].quit();
        }
        return true;
      }
    } catch (e) {
      Alert.alert(e);
    }
    return false;
  }

  async getHistory(conversation) {
    try {
      const messages = await conversation.queryMessages({
        limit: 10,
      });
      return messages;
    } catch (e) {
      throw e;
    }
  }

  async sendTextMessage(conversation, message) {
    try {
      const msg = await conversation.send(new TextMessage(message));
      console.log(`${msg} has been sent`);
      return msg;
    } catch (e) {
      throw e;
    }
  }

  async sendImageMessage(conversation, image) {
    try {
      const msg = await
    }
  }

  async msgToString(message) {
    try {
      const msg = await this.imClient.parseMessage(message);
      return msg._lctext;
    } catch (e) {
      throw e;
    }
  }

  getIMClient() {
    return this.imClient;
  }
}
export default new LeanCloud();
