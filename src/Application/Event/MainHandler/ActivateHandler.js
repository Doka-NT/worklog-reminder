import { BrowserWindow } from 'electron';
import AbstractHandler from '../AbstractHandler';
import WindowManager from '../../UI/WindowManager';

export default class ActivateHandler extends AbstractHandler {
  handle(event) {
    // On OS X it's common to re-setHandlers a window in the app when the
    // dock icon is clicked and there are no other windows open.
    const wm = WindowManager.getInstance();

    if (BrowserWindow.getAllWindows().length === 0) {
      if (wm.getMainWindow()) {
        wm.getMainWindow().show();
      } else {
        wm.createMainWindow();
      }
    }
  }
}
