import { ipcMain } from 'electron';
import config from '../../app.config.main';
import EventDict from '../../Domain/Dictionary/EventDict';
import SetAgentEnabledHandler from './RendererHandler/SetAgentEnabledHandler';
import SyncIsAgentEnabled from './RendererHandler/SyncIsAgentEnabled';

class EventHandler {
  initAppHandlers(app) {
    for (const [eventName, handlers] of Object.entries(config.eventHandlers.app)) {
      app.on(eventName, (event) => {
        console.info(`Handle event {${eventName}}`);
        handlers.forEach((handler) => {
          event.returnValue = handler.handle({ originEvent: event });
        });
      });
    }
  }

  initRendererHandlers() {
    for (const [eventName, handlers] of Object.entries(config.eventHandlers.renderer)) {
      ipcMain.on(eventName, (event, payload) => {
        console.info(`Handle event {${eventName}}`);
        handlers.forEach((handler) => {
          event.returnValue = handler.handle({ payload, originEvent: event });
        });
      });
    }

    ipcMain.on(EventDict.SYNC_IS_AGENT_ENABLED, (event, payload) => {
      const handler = new SyncIsAgentEnabled();

      event.returnValue = handler.handle({ payload, originEvent: event });
    });

    ipcMain.on(EventDict.SET_AGENT_ENABLED, (event, payload) => {
      const handler = new SetAgentEnabledHandler();

      event.returnValue = handler.handle({ payload, originEvent: event });
    });
  }
}

export default EventHandler;
