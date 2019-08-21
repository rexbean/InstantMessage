import { DeviceEventEmitter } from 'react-native';
import { Realtime } from 'leancloud-realtime';
import { TypedMessagesPlugin } from 'leancloud-realtime-plugin-typed-messages';
import { appID } from '../const';

class LeanCloud {
  constructor() {
    this.realtime = null;
    this.imClient = null;
    this.username = null;
  }

  init() {
    this.realtime = new Realtime({
      appID,
      plugins: [TypedMessagesPlugin],
    });

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

  async login() {
    this.imClient = await this.realtime.createIMClient(this.username);

    this.imClient.on('message', message => {
      DeviceEventEmitter.emit('message', message);
    });

    this.imClient.on('invited', )
  }
}
export default new LeanCloud();
