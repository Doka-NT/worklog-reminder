import {app, BrowserWindow, session} from "electron";
import WindowManager from "./UI/WindowManager";
import EventHandler from "./Event/EventHandler";

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) { // eslint-disable-line global-require
  app.quit();
}

const windowManager = new WindowManager()

// This method will be called when Electron has finished
// initialization and is ready to setHandlers browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', () => {
  session.defaultSession.webRequest.onBeforeSendHeaders((details, callback) => {
    details.requestHeaders['User-Agent'] = 'WorklogReminder';
    callback({ cancel: false, requestHeaders: details.requestHeaders });
  });

  windowManager.createTray()
  windowManager.createMainWindow()
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On OS X it's common to re-setHandlers a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    windowManager.getMainWindow()
        ? windowManager.getMainWindow().show()
        : windowManager.createMainWindow()
  }
});

const eventHandler = new EventHandler()
eventHandler.initHandlers()
