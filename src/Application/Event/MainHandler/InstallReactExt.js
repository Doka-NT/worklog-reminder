import isDev from 'electron-is-dev';
import AbstractHandler from '../AbstractHandler';

export default class InstallReactExt extends AbstractHandler {
  handle() {
    if (!isDev) {
      return;
    }

    this.installExtensions();
  }

  async installExtensions() {
    const installer = require('electron-devtools-installer');
    const extensions = [
      'REACT_DEVELOPER_TOOLS',
      'REDUX_DEVTOOLS',
      'DEVTRON',
    ];

    return Promise
      .all(extensions.map((name) => installer.default(installer[name], false)))
      .catch(console.log);
  }
}
