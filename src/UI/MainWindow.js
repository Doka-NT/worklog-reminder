import {BrowserWindow} from 'electron'

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
        const position = this._getWindowPosition()

        this.setPosition(position.x, position.y, false)
        super.show()
        this.focus()
    }

    setHandlers() {
        this.on('blur', () => { 
            if (!this.webContents.isDevToolsOpened()) {
                this.hide()
            }
         })
    }

    _getWindowPosition() {
        const windowBounds = this.getBounds()
        const trayBounds = this.windowManager.getTray().tray.getBounds()

        // Center window horizontally below the tray icon
        const x = Math.round(trayBounds.x + (trayBounds.width / 2) - (windowBounds.width / 2))

        // Position window 4 pixels vertically below the tray icon
        const y = Math.round(trayBounds.y + trayBounds.height + 4)

        return {x: x, y: y}
    }
}

export default MainWindow
