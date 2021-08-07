/**
 * Config file for main process
 */

import path from "path";
import {app} from 'electron'
import Event from './Domain/Dictionary/Event'
import OpenInShellHandler from "./EventHandler/OpenInShellHandler";
import ShowMainWindowHandler from "./EventHandler/ShowMainWindowHandler";
import SyncIsWindowVisible from "./EventHandler/SyncIsWindowVisible";

const APP_ROOT = app.getAppPath()

export default {
    assetsDir: path.join(APP_ROOT, '.webpack', 'static'),
    eventHandlers: {
        [Event.OPEN_IN_SHELL]: [
            new OpenInShellHandler()
        ],
        [Event.SHOW_MAIN_WINDOW]: [
            new ShowMainWindowHandler()
        ],
        [Event.SYNC_IS_WINDOW_VISIBLE]: [
            new SyncIsWindowVisible()
        ],
    }
}
