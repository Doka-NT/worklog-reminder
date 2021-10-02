import isDev from 'electron-is-dev';
import AbstractHandler from '../AbstractHandler';

export default class SyncIsDevHandler extends AbstractHandler {
  handle() {
    return isDev;
  }
}
