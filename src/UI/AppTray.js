import path from "path";
import {app, Menu, Tray} from 'electron'
import config from '../app.config.main'
import OpenInShellHandler from "../EventHandler/Main/OpenInShellHandler";
import os from "os";

class AppTray
{
    /**
     * @param {WindowManager} windowManager
     */
    constructor(windowManager) {
        this.windowManager = windowManager
        this.tray = new Tray(this._resolveIcon())
    }

    setHandlers()
    {
        this.tray.on('double-click', this._toggleWindow.bind(this))
        this.tray.on('click', event => {
            this.tray.setContextMenu(null)

            const mainWindow = this.windowManager.getMainWindow()

            this._toggleWindow()

            if (mainWindow.isVisible() && process.defaultApp && event.metaKey) {
                mainWindow.openDevTools({mode: 'detach'})
            }
        })
        this.tray.on('right-click', () => {
            const contextMenu = Menu.buildFromTemplate([
                {
                    label: 'Help', click: () => {
                        new OpenInShellHandler().handle({payload: 'https://github.com/Doka-NT/worklog-reminder'})
                    }
                },
                {label: 'Quit', click: () => app.quit()},
            ])

            this.tray.setContextMenu(contextMenu)
        })
    }

    _resolveIcon()
    {
        let iconPath = 'appIcon.png'

        if (os.platform() === 'darwin') {
            iconPath = 'appIconTemplate.png'
        }

        return path.join(config.assetsDir, iconPath)
    }

    _toggleWindow() {
        let mainWindow = this.windowManager.getMainWindow();

        if (!mainWindow) {
            this.windowManager.createMainWindow()
            mainWindow = this.windowManager.getMainWindow()
        }

        if (mainWindow.isVisible() && !mainWindow.isFocused()) {
            mainWindow.show()
            mainWindow.focus()
        } else if (mainWindow.isVisible()) {
            mainWindow.hide();
        } else {
            mainWindow.show();
        }
    }
}

export default AppTray
