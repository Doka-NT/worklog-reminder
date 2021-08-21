import {app} from "electron";
import EventHandler from "./Event/EventHandler";
import isDev from 'electron-is-dev'


const eventHandler = new EventHandler()

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) { // eslint-disable-line global-require
  app.quit();
}

eventHandler.initAppHandlers(app)
eventHandler.initRendererHandlers()

app.on('ready', () => {
  const installExtensions = async () => {
    const installer = require('electron-devtools-installer')
    const forceDownload = !!process.env.UPGRADE_EXTENSIONS
    const extensions = [
      'REACT_DEVELOPER_TOOLS',
      'REDUX_DEVTOOLS',
      'DEVTRON'
    ]
  
    return Promise
      .all(extensions.map(name => installer.default(installer[name], forceDownload)))
      .catch(console.log)
  }

  if (isDev && process.argv.indexOf('--noDevServer') === -1) {
    installExtensions()
  }
})
