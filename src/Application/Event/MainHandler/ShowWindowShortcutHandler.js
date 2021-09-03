import { globalShortcut } from 'electron';
import AbstractHandler from '../AbstractHandler';
import WindowManager from '../../UI/WindowManager';

export default class ShowWindowShortcutHandler extends AbstractHandler {
  handle() {
    globalShortcut.register('CommandOrControl+Shift+Space', () => {
      const mainWindow = WindowManager.getInstance().getMainWindow();

      mainWindow.toggle();
    });
  }
}
