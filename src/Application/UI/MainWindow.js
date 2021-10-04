import { BrowserWindow } from 'electron';
import positioner from 'electron-traywindow-positioner';
import { execSync } from 'child_process';
import { createSettings, KEY_WINDOW_BOUNDS } from '../Settings';

class MainWindow extends BrowserWindow {
  /**
   * @param {WindowManager} windowManager
   * @param {object} options
   */
  constructor(windowManager, options) {
    super(options);
    this.windowManager = windowManager;
  }

  show() {
    const storedBounds = createSettings().get(KEY_WINDOW_BOUNDS);

    if (storedBounds) {
      this.setBounds(storedBounds);
    } else {
      positioner.position(this, this.windowManager.getTray().tray.getBounds());
    }

    super.show();
    this.focus();
  }

  setHandlers() {
    this.on('blur', () => {
      if (!this.webContents.isDevToolsOpened()) {
        if (!this.isHideAvailable()) {
          this.minimize();
        } else {
          this.hide();
        }
      }
    });

    this.on('moved', (event) => {
      createSettings().set(KEY_WINDOW_BOUNDS, event.sender.getBounds());
    });
  }

  toggle() {
    if (this.isVisible() && !this.isFocused()) {
      this.show();
      this.focus();
    } else if (this.isVisible()) {
      if (this.isHideAvailable()) {
        this.hide();
      } else {
        this.minimize();
      }
    } else {
      this.show();
    }
  }

  isHideAvailable() {
    if (process.platform !== 'linux') {
      return true;
    }

    const availableDesktops = [
      'x-cinnamon',
      'unity',
      'kde',
      'xfce',
    ];

    let currentDesktop;

    try {
      // nodejs 14 lts
      // https://nodejs.org/docs/latest-v14.x/api/child_process.html
      currentDesktop = execSync('echo $XDG_CURRENT_DESKTOP').toString().toLowerCase().trim();
    } catch (e) {
      // todo: send error to monitoring agent
    }

    return availableDesktops.indexOf(currentDesktop) !== -1;
  }
}

export default MainWindow;
