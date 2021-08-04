/**
 * Config file for main process
 */

import Event from './Domain/Dictionary/Event'
import OpenInShellHandler from "./EventHandler/OpenInShellHandler";
import path from "path";
import ShowMainWindowHandler from "./EventHandler/ShowMainWindowHandler";
import {app} from 'electron'

const APP_ROOT = app.getAppPath()

export default {
    assetsDir: path.join(APP_ROOT, '.webpack', 'static'),
    eventHandlers: {
        [Event.OPEN_IN_SHELL]: [
            new OpenInShellHandler()
        ],
        [Event.SHOW_MAIN_WINDOW]: [
            new ShowMainWindowHandler()
        ]
    }
}
