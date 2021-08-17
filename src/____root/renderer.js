/**
 * This file will automatically be loaded by webpack and run in the "renderer" context.
 * To learn more about the differences between the "main" and the "renderer" context in
 * Electron, visit:
 *
 * https://electronjs.org/docs/tutorial/application-architecture#main-and-renderer-processes
 *
 * By default, Node.js integration in this file is disabled. When enabling Node.js integration
 * in a renderer process, please be aware of potential security implications. You can read
 * more about security risks here:
 *
 * https://electronjs.org/docs/tutorial/security
 *
 * To enable Node.js integration in this file, open up `main.js` and enable the `nodeIntegration`
 * flag:
 *
 * ```
 *  // Create the browser window.
 *  mainWindow = new BrowserWindow({
 *    width: 800,
 *    height: 600,
 *    webPreferences: {
 *      nodeIntegration: true
 *    }
 *  });
 * ```
 */
import path from 'path'
import 'onsenui'
import 'onsenui/css/onsenui.css'
import 'onsenui/css/onsen-css-components.css'
import './index.css'
import ScreenManager from "./Renderer/ScreenManager"
import Storage from "./Infrastructure/Storage/Storage";
import NotificationTask from "./Task/Renderer/NotificationTask";
import ReloadIssuesTask from "./Task/Renderer/ReloadIssuesTask";

const sm = new ScreenManager('root', path.join(__dirname, 'screen'), 'template.html')
const storage = new Storage()

sm.showScreen(sm.getInitialScreenName())

new NotificationTask(sm).start(storage.getNotificationInterval())
new ReloadIssuesTask().start(storage.getUpdateInterval())
