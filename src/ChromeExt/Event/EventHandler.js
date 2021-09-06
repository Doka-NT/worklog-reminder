import config from '../app.config';

class EventHandler {
  initRendererHandlers() {
    chrome.runtime.onMessage.addListener((request, sender, f_callback) => {
      const { event, payload } = request;


      for (const [eventName, handlers] of Object.entries(config.eventHandlers.renderer)) {
        if (eventName !== event) {
          continue;
        }

        handlers.forEach((handler) => {
          handler.handle(request);
        });
      }
      // get handler from config
      // const handler = new OpenInShellHandler();

      // handler.handle(request)
      console.log(event, payload);
    });
  }
}

export default EventHandler;