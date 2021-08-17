import AbstractHandler from "../AbstractHandler";
import {app} from "electron";

export default class WindowAllClosedHandler extends AbstractHandler
{
    handle(event) {
        if (process.platform !== 'darwin') {
            app.quit();
        }
    }
}
