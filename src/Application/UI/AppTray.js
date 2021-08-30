import path from 'path';
import { app, Menu, Tray } from 'electron';
import os from 'os';
import config from '../../app.config.main';
import OpenInShellHandler from '../Event/RendererHandler/OpenInShellHandler';
import About from 'electron-about'
import pkg from '../../../package.json'

class AppTray {
  /**
   * @param {WindowManager} windowManager
   */
  constructor(windowManager) {
    this.windowManager = windowManager;
    this.tray = new Tray(this._resolveIcon());
    this.tray.setContextMenu(this._createContextMenu());
    this.tray.closeContextMenu();
  }

  setHandlers() {
    this.tray.on('double-click', this._toggleWindow.bind(this));
    this.tray.on('click', (event) => {
      if (process.platform === 'darwin') {
        this.tray.setContextMenu(null);
      }

      this._showMainWindow(event);
    });

    this.tray.on('right-click', () => {
      if (process.platform === 'darwin') {
        this.tray.setContextMenu(this._createContextMenu());
      }
      this.tray.popUpContextMenu();
    });
  }

  _showMainWindow(event) {
    const mainWindow = this.windowManager.getMainWindow();

    this._toggleWindow();

    if (mainWindow.isVisible() && process.defaultApp && event.metaKey) {
      mainWindow.openDevTools({ mode: 'detach' });
    }
  }

  _createContextMenu() {
    console.log(`${path.join(config.assetsDir, 'appIconColored.png' )}`);

    const menuItems = [
      About.makeMenuItem ('', {
        icon: `https://github.com/Doka-NT/worklog-reminder/raw/main/static/appIconColored.png`,
        appName: pkg.productName,
        version: `Version ${pkg.version}`,
        copyright: `© ${pkg.author.name}`,
      }),
      {
        label: 'Help',
        click: () => {
          new OpenInShellHandler().handle({ payload: 'https://github.com/Doka-NT/worklog-reminder' });
        },
      },
      { label: 'Quit', click: () => app.quit() },
    ];

    if (process.platform === 'linux') {
      menuItems.unshift({
        label: 'Toggle Window',
        click: (event) => {
          this._showMainWindow(event);
        },
      });
    }

    return Menu.buildFromTemplate(menuItems);
  }

  _resolveIcon() {
    let iconPath = 'appIcon.png';

    if (os.platform() === 'darwin') {
      iconPath = 'appIconTemplate.png';
    }

    return path.join(config.assetsDir, iconPath);
  }

  _toggleWindow() {
    let mainWindow = this.windowManager.getMainWindow();

    if (!mainWindow) {
      this.windowManager.createMainWindow();
      mainWindow = this.windowManager.getMainWindow();
    }

    if (mainWindow.isVisible() && !mainWindow.isFocused()) {
      mainWindow.show();
      mainWindow.focus();
    } else if (mainWindow.isVisible()) {
      mainWindow.hide();
    } else {
      mainWindow.show();
    }
  }
}

export default AppTray;
