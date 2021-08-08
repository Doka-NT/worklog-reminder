import path from "path";
import {app, Menu, Tray} from 'electron'
import config from '../app.config.main'
import OpenInShellHandler from "../EventHandler/Main/OpenInShellHandler";

class AppTray
{
    /**
     * @param {WindowManager} windowManager
     */
    constructor(windowManager) {
        this.windowManager = windowManager
        this.tray = new Tray(path.join(config.assetsDir, 'appIconTemplate.png'))
    }

    setHandlers()
    {
        this.tray.on('double-click', this.__toggleWindow.bind(this))
        this.tray.on('click', event => {
            this.tray.setContextMenu(null)

            const mainWindow = this.windowManager.getMainWindow()

            this.__toggleWindow()

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

    __toggleWindow() {
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
