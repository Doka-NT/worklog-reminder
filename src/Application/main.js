import { app } from 'electron';
import { createAgent } from '../Infrastructure/Monitoring';
import EventHandler from './Event/EventHandler';

createAgent().startMainAgent();

const eventHandler = new EventHandler();

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) { // eslint-disable-line global-require
  app.quit();
}

eventHandler.initAppHandlers(app);
eventHandler.initRendererHandlers();
