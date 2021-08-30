import AbstractHandler from '../AbstractHandler';

const { shell } = require('electron');

export default class OpenInShellHandler extends AbstractHandler {
  handle(event) {
    shell.openExternal(event.payload);
  }
}
