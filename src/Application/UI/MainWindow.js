import { BrowserWindow } from 'electron';
import positioner from 'electron-traywindow-positioner';
import { execSync } from 'child_process';

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
    positioner.position(this, this.windowManager.getTray().tray.getBounds());

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
    ];

    // nodejs 14 lts
    // https://nodejs.org/docs/latest-v14.x/api/child_process.html#child_process_child_process_execsync_command_options
    const currentDesktop = execSync('echo $XDG_CURRENT_DESKTOP').toString().toLowerCase().trim();

    return availableDesktops.indexOf(currentDesktop) !== -1;
  }
}

export default MainWindow;
