import AppTray from "./AppTray";
import MainWindow from "./MainWindow";

class WindowManager {
    /**
     * @private {WindowManager}
     */
    static __instance
    /**
     * @private {AppTray}
     */
    static __tray
    /**
     * @private {MainWindow}
     */
    static __mainWindow

    /**
     * @return {WindowManager}
     */
    static getInstance()
    {
        if (!WindowManager.__instance) {
            WindowManager.__instance = new WindowManager()
        }

        return WindowManager.__instance
    }

    createTray() {
        const appTray = new AppTray(this)

        appTray.setHandlers(appTray)

        WindowManager.__tray = appTray
    }

    getTray() {
        return WindowManager.__tray
    }

    createMainWindow() {
        const mainWindow = new MainWindow(this, {
            width: 300,
            height: 450,
            show: false,
            frame: false,
            fullscreenable: false,
            resizable: false,
            transparent: false,
            skipTaskbar: true,
            webPreferences: {
                // Prevents renderer process code from not running when window is
                // hidden
                backgroundThrottling: false,
                nodeIntegration: true,
                contextIsolation: false,
                enableRemoteModule: true,
                webSecurity: false,
            }
        })

        // and load the index.html of the app.
        mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);
        mainWindow.setHandlers()

        WindowManager.__mainWindow = mainWindow
    }

    /**
     * @return {MainWindow}
     */
    getMainWindow() {
        return WindowManager.__mainWindow
    }
}

export default WindowManager
