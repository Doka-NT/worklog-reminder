import AbstractHandler from "../AbstractHandler";

const shell = require('electron').shell

export default class OpenInShellHandler extends AbstractHandler {
  handle(event) {
    shell.openExternal(event.payload)
  }
}
