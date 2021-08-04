import AppTray from "./AppTray";
import MainWindow from "./MainWindow";

class WindowManager {
    /**
     * @private {AppTray}
     */
    static __tray
    /**
     * @private {MainWindow}
     */
    static __mainWindow

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
