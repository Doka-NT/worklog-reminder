import AbstractHandler from "../AbstractHandler";
import WindowManager from "../../UI/WindowManager";

export default class SyncIsWindowVisible extends AbstractHandler
{
    /**
     * @param event
     * @return {boolean}
     */
    handle(event) {
        return WindowManager.getInstance().getMainWindow().isVisible()
    }
}
