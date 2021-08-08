import {ipcMain} from 'electron'
import config from "../app.config.main";

class EventHandler
{
    initAppHandlers(app) {
        for (const [eventName, handlers] of Object.entries(config.eventHandlers.app)) {
            app.on(eventName, event => {
                console.info(`Handle event {${eventName}}`)
                handlers.forEach(handler => {
                    event.returnValue = handler.handle({originEvent: event})
                })
            })
        }
    }

    initRendererHandlers() {
        for (const [eventName, handlers] of Object.entries(config.eventHandlers.renderer)) {
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
