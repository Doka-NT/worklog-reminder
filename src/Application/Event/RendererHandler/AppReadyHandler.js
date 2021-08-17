import AbstractHandler from "../AbstractHandler";
import WindowManager from "../../UI/WindowManager";
import CheckForUpdatesTask from "../../Task/Main/CheckForUpdatesTask";

export default class AppReadyHandler extends AbstractHandler
{
    handle(event) {
        const wm = WindowManager.getInstance()

        wm.createTray()
        wm.createMainWindow()

        // todo: replace with events
        // wait tray to be created, so we can detect it bounds
        setTimeout(() => wm.getMainWindow().show(), 1000)

        const checkForUpdatesTask = new CheckForUpdatesTask();
        checkForUpdatesTask.start(15 * 60 * 1000)
        // check for updates at application startup
        checkForUpdatesTask._iteration();
    }
}
