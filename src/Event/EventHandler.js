import {ipcMain} from 'electron'
import config from "../app.config.main";

class EventHandler
{

    initHandlers() {
        for (const [eventName, handlers] of Object.entries(config.eventHandlers)) {
            ipcMain.on(eventName, (event, payload) => {
                console.info(`Handle event {${eventName}}`)
                handlers.forEach(handler => {
                    event.returnValue = handler.handle({payload, originEvent: event})
                })
            })
        }
    }
}

export default EventHandler
