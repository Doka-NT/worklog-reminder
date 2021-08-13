import AbstractHandler from "../AbstractHandler";
import WindowManager from "../../UI/WindowManager";

export default class AppReadyHandler extends AbstractHandler
{
    handle(event) {
        const wm = WindowManager.getInstance()

        wm.createTray()
        wm.createMainWindow()

        // todo: replace with events
        // wait tray to be created, so we can detect it bounds
        setTimeout(() => wm.getMainWindow().show(), 1000)

        // new UpdaterTask().start(1000)
        // https://update.electronjs.org/Doka-NT/worklog-reminder/darwin-x64/0.0.1
        // 204 - up to date
        // 404 - no updates at all
        // 400 - invalid sem version
        // 200 - updates available
    }
}
