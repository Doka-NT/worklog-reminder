import { createIpcRenderer } from "../Infrastructure/Ipc";

const ipcRenderer = createIpcRenderer()

class EventEmitter {
  static __instance

  /**
   * @return {EventEmitter}
   */
  static getInstance() {
    if (!EventEmitter.__instance) {
      EventEmitter.__instance = new EventEmitter();
    }

    return EventEmitter.__instance;
  }

  send(eventName, payload) {
    console.debug(`Event: ${eventName}, with payload:`, payload);

    ipcRenderer.send(eventName, payload);
    document.dispatchEvent(new CustomEvent(eventName, { detail: payload }));
  }
}

export default EventEmitter;
