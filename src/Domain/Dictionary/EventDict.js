class EventDict {
  // Electron App events
  // https://www.electronjs.org/docs/latest/api/app/#events
  static APP_READY = 'ready'

  static APP_ACTIVATE = 'activate'

  static APP_WINDOW_ALL_CLOSED = 'window-all-closed'

  // Domain Events
  static OPEN_IN_SHELL = 'open-in-shell'

  static SHOW_MAIN_WINDOW = 'show-main-window'

  static RELOAD_ISSUES = 'reload-issues'

  static SYNC_IS_WINDOW_VISIBLE = 'sync-is-window-visible'

  static SYNC_IS_AGENT_ENABLED = 'sync-is-agent-enabled'

  static SET_AGENT_ENABLED = 'set-agent-enabled'
}

export default EventDict;
