import AbstractHandler from "../AbstractHandler";
import WindowManager from "../../UI/WindowManager";

export default class AppReadyHandler extends AbstractHandler
{
    handle(event) {
        const wm = WindowManager.getInstance()

        wm.createTray()
        wm.createMainWindow()
    }
}
