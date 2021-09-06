import ChromeIpcRenderer from "./ChromeIpcRenderer";
import { isElectron } from "../Env";

export function createIpcRenderer() {
  if (isElectron()) {
    return window.require('electron').ipcRenderer;
  } else if (window.chrome && chrome.runtime && chrome.runtime.id) {
    return new ChromeIpcRenderer();
  }

  throw new Error('App not configured yet to run outside Electron');
};
