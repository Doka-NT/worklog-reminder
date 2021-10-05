import { createSettings, KEY_WINDOW_BOUNDS } from '../../Settings';
import WindowManager from '../../UI/WindowManager';
import AbstractHandler from '../AbstractHandler';

export default class RestoreWindowPositionHandler extends AbstractHandler {
  handle() {
    createSettings().set(KEY_WINDOW_BOUNDS, null);

    const mainWindow = WindowManager.getInstance().getMainWindow();

    mainWindow.moveToDefaultPosition();
  }
}
