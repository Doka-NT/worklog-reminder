import { BrowserWindow } from 'electron'
import positioner from 'electron-traywindow-positioner'

class MainWindow extends BrowserWindow {
  /**
   * @param {WindowManager} windowManager
   * @param {object} options
   */
  constructor(windowManager, options) {
    super(options)
    this.windowManager = windowManager
  }

  show() {
    positioner.position(this, this.windowManager.getTray().tray.getBounds())

    super.show()
    this.focus()
  }

  setHandlers() {
    this.on('blur', () => {
      if (!this.webContents.isDevToolsOpened()) {
        if (process.platform === 'linux') {
          this.minimize()
        } else {
          this.hide()
        }
      }
    })
  }
}

export default MainWindow
