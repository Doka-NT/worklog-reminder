import AbstractIpcRenderer from "./AbstractIpcRenderer";

const createMessage = (event, payload) => {
  return {
    event,
    payload
  }
}

export default class ChromeIpcRenderer extends AbstractIpcRenderer {
  send(eventName, payload) {
    console.log('IPC Send:', eventName);
    chrome.runtime.sendMessage(createMessage(eventName, payload));
  }

  sendSync(eventName) {
    console.log('IPC SendSync:', eventName)
    chrome.runtime.sendMessage(createMessage(eventName));
  } 
}