import EventDict from '../Domain/Dictionary/EventDict';
import OpenInShellHandler from "./Event/RendererHandler/OpenInShellHandler";

export default {
  eventHandlers: {
    // App events from main thread
    app: {
      [EventDict.APP_READY]: [],
      [EventDict.APP_ACTIVATE]: [],
      [EventDict.APP_WINDOW_ALL_CLOSED]: [],
    },
    renderer: {
      [EventDict.OPEN_IN_SHELL]: [
        new OpenInShellHandler(),
      ],
      [EventDict.SHOW_MAIN_WINDOW]: [],
      [EventDict.SYNC_IS_WINDOW_VISIBLE]: [],
    },
  },
};