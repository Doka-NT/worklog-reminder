import AbstractHandler from "./AbstractHandler";
import WindowManager from "../UI/WindowManager";

class ShowMainWindowHandler extends AbstractHandler
{
    handle(event) {
        const windowManager = new WindowManager()
        windowManager.getMainWindow()?.show()
    }
}

export default ShowMainWindowHandler
