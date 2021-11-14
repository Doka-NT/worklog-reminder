import { BrowserWindow, screen } from 'electron';
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
    const allBounds = createSettings().get(KEY_WINDOW_BOUNDS);
    const display = this.getCurrentDisplay();

    const storedBounds = allBounds && allBounds[display.id] ? allBounds[display.id] : null;

    if (storedBounds) {
      this.setBounds(storedBounds);
    } else {
      this.moveToDefaultPosition();
    }

    super.show();
    this.focus();
  }

  moveToDefaultPosition() {
    positioner.position(this, this.windowManager.getTray().tray.getBounds());
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

    this.on('move', (event) => {
      const display = this.getCurrentDisplay();
      const stored = createSettings().get(KEY_WINDOW_BOUNDS);

      const combined = { ...(stored || {}), [display.id]: event.sender.getBounds() };

      createSettings().set(KEY_WINDOW_BOUNDS, combined);
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

  /**
   * @returns {Display}
   */
  getCurrentDisplay() {
    const trayBound = this.windowManager.getTray().tray.getBounds();

    return screen.getDisplayNearestPoint({ x: trayBound.x, y: trayBound.y });
  }
}

export default MainWindow;
