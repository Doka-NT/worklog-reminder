import AbstractHandler from '../AbstractHandler';
import WindowManager from '../../UI/WindowManager';

export default class AppReadyHandler extends AbstractHandler {
  handle(event) {
    const wm = WindowManager.getInstance();

    wm.createTray();
    wm.createMainWindow();

    // todo: replace with events
    // wait tray to be created, so we can detect it bounds
    setTimeout(() => wm.getMainWindow().show(), 1000);
  }
}
