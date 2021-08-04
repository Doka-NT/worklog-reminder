import path from "path";
import {Tray} from 'electron'
import config from '../app.config.main'

class AppTray
{
    /**
     * @param {WindowManager} windowManager
     */
    constructor(windowManager) {
        this.windowManager = windowManager
        this.tray = new Tray(path.join(config.assetsDir, 'icon.png'))
    }

    setHandlers() {

        this.tray.on('right-click', this.__toggleWindow)
        this.tray.on('double-click', this.__toggleWindow)
        this.tray.on('click', event => {
            const mainWindow = this.windowManager.getMainWindow()

            this.__toggleWindow()

            if (mainWindow.isVisible() && process.defaultApp && event.metaKey) {
                mainWindow.openDevTools({mode: 'detach'})
            }
        })
    }

    __toggleWindow() {
        if (!this.windowManager) {
            console.warn('No window manager')
            return
        }
        let mainWindow = this.windowManager.getMainWindow();

        if (!mainWindow) {
            this.windowManager.createMainWindow()
            mainWindow = this.windowManager.getMainWindow()
        }

        if (mainWindow.isVisible()) {
            mainWindow.hide();
        } else {
            mainWindow.show();
        }
    }
}

export default AppTray
