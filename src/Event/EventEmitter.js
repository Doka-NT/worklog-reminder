const { ipcRenderer } = window.require('electron')

class EventEmitter {
    static __instance

    /**
     * @return {EventEmitter}
     */
    static getInstance()
    {
        if (!EventEmitter.__instance) {
            EventEmitter.__instance = new EventEmitter()
        }

        return EventEmitter.__instance
    }

    send(eventName, payload) {
        ipcRenderer.send(eventName, payload)
    }
}

export default EventEmitter
