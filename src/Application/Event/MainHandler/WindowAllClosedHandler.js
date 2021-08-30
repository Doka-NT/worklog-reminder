import { app } from 'electron';
import AbstractHandler from '../AbstractHandler';

export default class WindowAllClosedHandler extends AbstractHandler {
  handle(event) {
    if (process.platform !== 'darwin') {
      app.quit();
    }
  }
}
