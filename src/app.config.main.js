/**
 * Config file for main process
 */

import path from "path";
import {app} from 'electron'
import EventDict from './Domain/Dictionary/EventDict'
import OpenInShellHandler from "./EventHandler/Main/OpenInShellHandler";
import ShowMainWindowHandler from "./EventHandler/Main/ShowMainWindowHandler";
import SyncIsWindowVisible from "./EventHandler/Main/SyncIsWindowVisible";
import AppReadyHandler from "./EventHandler/App/AppReadyHandler";
import UserAgentHandler from "./EventHandler/App/UserAgentHandler";
import WindowAllClosedHandler from "./EventHandler/App/WindowAllClosedHandler";
import ActivateHandler from "./EventHandler/App/ActivateHandler";
import HideMacOsDockHandler from "./EventHandler/App/HideMacOsDockHandler";

const APP_ROOT = app.getAppPath()

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
                new OpenInShellHandler()
            ],
            [EventDict.SHOW_MAIN_WINDOW]: [
                new ShowMainWindowHandler()
            ],
            [EventDict.SYNC_IS_WINDOW_VISIBLE]: [
                new SyncIsWindowVisible()
            ],
        },
    },
}
