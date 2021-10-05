import path from 'path';
import { app } from 'electron';
import EventDict from './Domain/Dictionary/EventDict';
import OpenInShellHandler from './Application/Event/RendererHandler/OpenInShellHandler';
import ShowMainWindowHandler from './Application/Event/RendererHandler/ShowMainWindowHandler';
import SyncIsWindowVisible from './Application/Event/RendererHandler/SyncIsWindowVisible';
import AppReadyHandler from './Application/Event/MainHandler/AppReadyHandler';
import UserAgentHandler from './Application/Event/MainHandler/UserAgentHandler';
import WindowAllClosedHandler from './Application/Event/MainHandler/WindowAllClosedHandler';
import ActivateHandler from './Application/Event/MainHandler/ActivateHandler';
import HideMacOsDockHandler from './Application/Event/MainHandler/HideMacOsDockHandler';
import InstallReactExt from './Application/Event/MainHandler/InstallReactExt';
import CheckForUpdatesHandler from './Application/Event/MainHandler/CheckForUpdatesHandler';
import ShowWindowShortcutHandler from './Application/Event/MainHandler/ShowWindowShortcutHandler';
import SyncIsAgentEnabled from './Application/Event/RendererHandler/SyncIsAgentEnabled';
import SyncIsDevHandler from './Application/Event/RendererHandler/SyncIsDevHandler';
import SetAgentEnabledHandler from './Application/Event/RendererHandler/SetAgentEnabledHandler';
import RestoreWindowPositionHandler from './Application/Event/RendererHandler/RestoreWindowPositionHandler';

const APP_ROOT = app.getAppPath();

export default {
  assetsDir: path.join(APP_ROOT, '.webpack', 'static'),
  eventHandlers: {
    // App events from main thread
    app: {
      // This method will be called when Electron has finished
      // initialization and is ready to setHandlers browser windows.
      // Some APIs can only be used after this event occurs.
      [EventDict.APP_READY]: [
        new UserAgentHandler(),
        new AppReadyHandler(),
        new HideMacOsDockHandler(),
        new InstallReactExt(),
        new CheckForUpdatesHandler(),
        new ShowWindowShortcutHandler(),
      ],
      [EventDict.APP_ACTIVATE]: [
        new ActivateHandler(),
      ],
      // Quit when all windows are closed, except on macOS. There, it's common
      // for applications and their menu bar to stay active until the user quits
      // explicitly with Cmd + Q.
      [EventDict.APP_WINDOW_ALL_CLOSED]: [
        new WindowAllClosedHandler(),
      ],
    },
    renderer: {
      // Events from renderer
      [EventDict.OPEN_IN_SHELL]: [
        new OpenInShellHandler(),
      ],
      [EventDict.SHOW_MAIN_WINDOW]: [
        new ShowMainWindowHandler(),
      ],
      [EventDict.SYNC_IS_WINDOW_VISIBLE]: [
        new SyncIsWindowVisible(),
      ],
      [EventDict.SYNC_IS_AGENT_ENABLED]: [
        new SyncIsAgentEnabled(),
      ],
      [EventDict.SET_AGENT_ENABLED]: [
        new SetAgentEnabledHandler(),
      ],
      [EventDict.SYNC_IS_DEV]: [
        new SyncIsDevHandler(),
      ],
      [EventDict.RESTORE_WINDOW_POSITION]: [
        new RestoreWindowPositionHandler(),
      ],
    },
  },
};
