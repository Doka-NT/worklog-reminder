/**
 * Config file for main process
 */

import Event from './Domain/Dictionary/Event'
import OpenInShellHandler from "./EventHandler/OpenInShellHandler";
import path from "path";
import ShowMainWindowHandler from "./EventHandler/ShowMainWindowHandler";

const APP_ROOT = path.join(__dirname, '../../')

export default {
    assetsDir: path.join(APP_ROOT, 'static'),
    eventHandlers: {
        [Event.OPEN_IN_SHELL]: [
            new OpenInShellHandler()
        ],
        [Event.SHOW_MAIN_WINDOW]: [
            new ShowMainWindowHandler()
        ]
    }
}
