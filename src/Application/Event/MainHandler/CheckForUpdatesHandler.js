import AbstractHandler from "../AbstractHandler";
import CheckForUpdatesTask from "../../Task/Main/CheckForUpdatesTask";

export default class CheckForUpdatesHandler extends AbstractHandler {
    handle() {
        const checkForUpdatesTask = new CheckForUpdatesTask();
        checkForUpdatesTask.start(15 * 60 * 1000)
        // check for updates at application startup
        checkForUpdatesTask._iteration();
    }
}