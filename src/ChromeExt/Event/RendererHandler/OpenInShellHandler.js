import AbstractChromeHandler from "../AbstractChromeHandler";

export default class OpenInShellHandler extends AbstractChromeHandler {
  handle(event, resultCallback) {
    chrome.tabs.create({url: event.payload});
  }
}