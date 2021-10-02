import { app } from 'electron';
import isDev from 'electron-is-dev';
import createAgent from '../Infrastructure/Monitoring';
import EventHandler from './Event/EventHandler';
import { createSettings, KEY_IS_AGENT_ENABLED } from './Settings';

const eventHandler = new EventHandler();

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) { // eslint-disable-line global-require
  app.quit();
}

const settings = createSettings();

if (settings.get(KEY_IS_AGENT_ENABLED) && !isDev) {
  createAgent().startMainAgent();
}

eventHandler.initAppHandlers(app);
eventHandler.initRendererHandlers();
